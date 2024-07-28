<template>
  <div
    :class="{ dark: isDarkMode }"
    class="min-h-screen bg-gray-50 dark:bg-gray-800 text-black z-50 dark:text-white"
  >
    <div class="my-6 p-4">
      <div class="flex justify-between mb-6">
        <h1 class="md:text-4xl text-3xl font-semibold">
          Kategoriyalar Ro'yxati
        </h1>
        <button
          @click="showCreateModal = true"
          class="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white flex items-center justify-center px-3 pt-1.5 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition"
        >
          <i class="fi fi-rr-multiple"></i>
        </button>
      </div>

      <!-- Categories Grid -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <CategoryCard
          v-for="category in categories"
          :key="category._id"
          :category="category"
          :token="token"
          :refreshCategories="fetchCategories"
        />
      </div>
    </div>

    <!-- Create Category Modal -->
    <transition name="fade">
      <div
        v-if="showCreateModal"
        class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
      >
        <div
          class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 class="text-2xl font-semibold mb-4">Yangi Kategoriya Qo'shish</h2>
          <form @submit.prevent="createCategory">
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-300 mb-2">
                Kategoriya Nomi:
              </label>
              <input
                v-model="newCategory.name"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                required
              />
            </div>
            <div class="flex justify-end">
              <button
                type="button"
                @click="showCreateModal = false"
                class="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white px-4 py-2 rounded-md mr-2"
              >
                Yopish
              </button>
              <button
                type="submit"
                class="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Qo'shish
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import api from "@/api";
import CategoryCard from "@/components/CategoryCard.vue";

const toast = useToast();

const categories = ref([]);
const showCreateModal = ref(false);
const newCategory = ref({ name: "" });
const token = localStorage.getItem("token");

const fetchCategories = () => {
  const hdrs = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  api
    .get("category", hdrs)
    .then((res) => {
      categories.value = res.data;
    })
    .catch((err) => {
      toast.error("Failed to load categories.");
      console.error("err response", err);
    });
};

onMounted(fetchCategories);

const createCategory = () => {
  const hdrs = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  api
    .post("/category", newCategory.value, hdrs)
    .then((res) => {
      toast.success("Kategoriya qo'shildi!");
      categories.value.push(res.data);
      newCategory.value = { name: "" }; // Reset input field
      showCreateModal.value = false;
    })
    .catch((err) => {
      toast.error("Xatolik!");
      console.log("err create", err);
    });
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
