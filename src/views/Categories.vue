<template>
  <div
    :class="{ dark: isDarkMode }"
    class="min-h-screen bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
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
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <CategoryCard
          v-for="category in categories"
          :key="category._id"
          :category="category"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
import api from "@/api";
import CategoryCard from "@/components/CategoryCard.vue";

const toast = useToast();

const categories = ref([]);
const showCreateModal = ref(false);
const token = localStorage.getItem("token");

onMounted(() => {
  api
    .get("category", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      categories.value = res.data;
    })
    .catch((err) => {
      toast.error("Failed to load categories.");
      console.error("err response", err);
    });
});
</script>
