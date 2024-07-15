<template>
  <div class="flex flex-col">
    <div class="flex justify-between items-center my-8 h-[12px]">
      <h1 class="text-2xl text-black font-semibold">Mahsulotlar</h1>
      <button class="bg-slate-700 px-3 py-2 rounded-md text-white text-xl">
        <i class="fi fi-sr-square-plus"></i>
      </button>
    </div>
    <div class="py-3 w-full flex justify-between gap-4 sm:pr-5">
      <input
        class="border rounded-md outline-none focus:border-slate-500 w-full py-3 px-2"
        type="text"
        placeholder="Mahsulotlarni qidirish..."
      />
      <select class="sm:w-36 w-20 md:px-5 px-2 py-2 rounded-md">
        <option value="">Tanlash</option>
        <option value="">Nasoslar</option>
        <option value="">Qo'shimchalar</option>
        <option value="">Matorlar</option>
        <option value="">Nimadirlar</option>
      </select>
    </div>

    <div class="grid lg:grid-cols-3 sm:grid-cols-2 gap-4">
      <ProductItem v-for="item in 5" :key="item" />
    </div>
  </div>
</template>

<script setup>
import ProductItem from "../components/ProductItem.vue";
</script>
