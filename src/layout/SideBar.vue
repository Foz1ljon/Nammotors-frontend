<template>
  <div
    class="fixed sm:w-[20%] w-full z-30 bottom-0 h-[10vh] bg-gray-50 sm:border-r-2 sm:h-screen flex sm:flex-col md:py-0 py-8 gap-6 justify-between md:px-1 px-4 sm:justify-around"
  >
    <!-- Header Section -->
    <h1
      class="text-center xl:text-[45px] lg:text-[35px] md:text-[25px] md:block hidden font-semibold"
    >
      Nammotors
    </h1>
    <!-- Navigation Links -->
    <div
      class="flex w-full justify-between sm:flex-col sm:justify-evenly md:items-start items-center md:px-3 sm:gap-6 xl:text-xl lg:text-lg sm:text-base text-2xl"
    >
      <router-link
        v-for="(item, i) in menu"
        :key="i"
        class="flex lg:flex-row sm:flex-col flex-row items-center gap-2 md:w-full rounded-md md:px-2 py-2.5 px-2 transition-colors shadow-md"
        active-class="bg-gray-400"
        :to="item.to"
        :class="
          route.path == item.to ? '' : 'hover:bg-gray-500/50 hover:shadow-lg'
        "
      >
        <i :class="item.icon"></i>
        <p class="sm:block hidden">{{ item.name }}</p>
      </router-link>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const menu = [
  { to: "/dashboard", name: "Dashboard", icon: "fi fi-ss-home" },
  { to: "/products", name: "Mahsulotlar", icon: "fi fi-ss-engine" },
  { to: "/categories", name: "Kategoriyalar", icon: "fi fi-sr-category" },
  { to: "/clients", name: "Mijozlar", icon: "fi fi-sr-users" },
  { to: "/admins", name: "Adminlar", icon: "fi fi-ss-admin-alt" },
  { to: "/contracts", name: "Shartnomalar", icon: "fi fi-ss-diploma" },
];
</script>
