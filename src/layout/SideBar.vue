<template>
  <div
    class="fixed sm:w-[20%] w-full bottom-0 h-[10vh] bg-slate-500 sm:h-screen flex sm:flex-col md:py-0 py-8 gap-6 justify-between px-4 sm:justify-around"
  >
    <!-- Header Section -->
    <h1
      class="text-center xl:text-[45px] lg:text-[35px] md:text-[25px] md:block hidden font-semibold text-white"
    >
      Nammotors
    </h1>

    <!-- Navigation Links -->
    <div
      class="flex w-full justify-between gap-2 sm:flex-col sm:justify-center md:items-start items-center md:px-3 md:gap-6 xl:text-2xl lg:text-xl md:text-base text-3xl"
    >
      <!-- Products Link -->
      <router-link
        class="text-white flex items-center gap-2 md:w-0 rounded-md md:px-2 py-2.5 duration-500 md:[&.router-link-active]:bg-slate-700 md:[&.router-link-active]:w-full"
        to="/products"
      >
        <i class="fi fi-ss-engine"></i>
        <p class="md:block hidden">Mahsulotlar</p>
      </router-link>

      <!-- Categories Link -->
      <router-link
        class="text-white flex items-center gap-2 md:w-0 rounded-md md:px-2 py-2.5 duration-500 md:[&.router-link-active]:bg-slate-700 md:[&.router-link-active]:w-full"
        to="/categories"
      >
        <i class="fi fi-sr-category"></i>
        <p class="md:block hidden">Kategoriyalar</p>
      </router-link>

      <!-- Clients Link -->
      <router-link
        class="text-white flex items-center gap-2 md:w-0 rounded-md md:px-2 py-2.5 duration-500 md:[&.router-link-active]:bg-slate-700 md:[&.router-link-active]:w-full"
        to="/clients"
      >
        <i class="fi fi-sr-users"></i>
        <p class="md:block hidden">Mijozlar</p>
      </router-link>

      <!-- Admins Link -->
      <router-link
        class="text-white flex items-center gap-2 md:w-0 rounded-md md:px-2 py-2.5 duration-500 md:[&.router-link-active]:bg-slate-700 md:[&.router-link-active]:w-full"
        to="/admins"
      >
        <i class="fi fi-ss-admin-alt"></i>
        <p class="md:block hidden">Adminlar</p>
      </router-link>

      <!-- Contracts Link -->
      <router-link
        class="text-white flex items-center gap-2 md:w-0 rounded-md md:px-2 py-2.5 duration-500 md:[&.router-link-active]:bg-slate-700 md:[&.router-link-active]:w-full"
        to="/contracts"
      >
        <i class="fi fi-ss-diploma"></i>
        <p class="md:block hidden">Shartnomalar</p>
      </router-link>
    </div>

    <!-- Logout Button -->
    <button
      class="text-white lg:text-xl md:text-lg text-3xl flex gap-2 justify-center items-center md:px-8 font-medium"
    >
      <i class="fi fi-bs-sign-out-alt"></i>
      <p class="md:block hidden">Chiqish</p>
    </button>
  </div>
</template>

<script setup></script>

<style scoped></style>
