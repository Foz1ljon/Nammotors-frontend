<template>
  <div
    :class="{ dark: isDarkMode }"
    class="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
  >
    <div class="flex justify-between items-center my-8 h-[12px]">
      <h1 class="text-4xl text-black dark:text-white font-semibold">
        Mahsulotlar
      </h1>
      <button class="bg-slate-700 px-3 py-2 rounded-md text-white text-xl">
        <i class="fi fi-sr-square-plus"></i>
      </button>
    </div>
    <div class="py-3 w-full flex justify-between gap-4 ">
      <input
        class="border dark:border-gray-600 rounded-md outline-none focus:border-slate-500 dark:focus:border-slate-400 w-full py-3 px-2 bg-white dark:bg-gray-700 text-black dark:text-white"
        type="text"
        placeholder="Mahsulotlarni qidirish..."
      />
      <select
        class="sm:w-36 w-20 md:px-5 px-2 py-2 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white border dark:border-gray-600"
      >
        <option value="">Tanlash</option>
        <option value="">Nasoslar</option>
        <option value="">Qo'shimchalar</option>
        <option value="">Matorlar</option>
        <option value="">Nimadirlar</option>
      </select>
    </div>

    <div class="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4">
      <ProductItem v-for="item in 5" :key="item" />
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import ProductItem from "../components/ProductItem.vue";

const isDarkMode = ref(false);

watch(isDarkMode, (newVal) => {
  isDarkMode.value = !isDarkMode.value;

  if (newVal) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("darkMode", "true");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", "false");
  }
});

// Initialize dark mode based on local storage
if (localStorage.getItem("darkMode") === "true") {
  isDarkMode.value = true;
}
</script>
