<template>
  <div
    :class="{ dark: isDarkMode }"
    class="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
  >
    <!-- Header Section -->
    <div class="flex justify-between items-center my-8 px-4">
      <h1 class="text-4xl text-black dark:text-white font-semibold">
        Mahsulotlar
      </h1>
      <button
        @click="showCreateModal = true"
        class="bg-slate-700 px-4 py-2 rounded-md text-white text-xl flex gap-2 items-center"
      >
        <i class="fi fi-sr-square-plus"></i>
        <p class="sm:block hidden">Mahsulot qo'shish</p>
      </button>
    </div>

    <!-- Search Section -->
    <div class="py-3 w-full px-4">
      <input
        v-model="searchItem"
        @input="debouncedSearch"
        class="border dark:border-gray-600 rounded-md outline-none focus:border-slate-500 dark:focus:border-slate-400 w-full py-3 px-2 bg-white dark:bg-gray-700 text-black dark:text-white transition duration-300 ease-in-out"
        type="text"
        placeholder="Mahsulotlarni qidirish..."
      />
    </div>

    <!-- Products Grid -->
    <div v-if="loading" class="flex justify-center items-center h-48">
      <div
        class="border-t-4 border-blue-500 border-solid w-12 h-12 rounded-full animate-spin"
      ></div>
    </div>
    <div
      v-else
      class="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 px-4"
    >
      <ProductItem
        v-for="item in products"
        :key="item._id"
        :data="item"
        @edit="openUpdatePage(item._id)"
        @delete="fetchProducts"
      />
    </div>

    <!-- Create Modal -->
    <CreateModal
      :show="showCreateModal"
      :close="() => (showCreateModal = false)"
      @create="fetchProducts"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import ProductItem from "@/components/ProductItem.vue";
import CreateModal from "@/components/CreateProductModal.vue";
import api from "@/api";

const isDarkMode = ref(false);
const searchItem = ref("");
const products = ref([]);
const loading = ref(true);
const showCreateModal = ref(false);
const showUpdateModal = ref(false);
const selectedProductId = ref(null);
const token = localStorage.getItem("token");

const fetchProducts = async () => {
  try {
    loading.value = true;
    const response = await api.get(
      `product/search?query=${searchItem.value.trim()}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    products.value = response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  } finally {
    loading.value = false;
  }
};

const debouncedSearch = debounce(fetchProducts, 400);

watch(searchItem, debouncedSearch);

const openUpdatePage = (productId) => {
  selectedProductId.value = productId;
  showUpdateModal.value = true;
};

onMounted(fetchProducts);

function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
</script>
