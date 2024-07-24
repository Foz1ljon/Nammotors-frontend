<template>
  <div
    class="fixed sm:w-[20%] w-full bottom-0 h-[10vh] bg-gray-50 border-r-2 sm:h-screen flex sm:flex-col md:py-0 py-8 gap-6 justify-between md:px-1 px-4 sm:justify-around"
  >
    <!-- Header Section -->
    <h1
      class="text-center xl:text-[45px] lg:text-[35px] md:text-[25px] md:block hidden font-semibold"
    >
      Nammotors
    </h1>

    <!-- Navigation Links -->
    <div
      class="flex w-full justify-between sm:flex-col sm:justify-center md:items-start items-center md:px-3 md:gap-6 xl:text-2xl lg:text-xl md:text-base text-3xl"
    >
      <!-- Products Link -->
      <router-link
        class="flex lg:flex-row md:flex-col flex-row items-center gap-2 md:w-full rounded-md md:px-2 py-2.5 duration-500 transition-colors shadow-md hover:shadow-lg"
        active-class="bg-gray-400"
        to="/products"
      >
        <i class="fi fi-ss-engine"></i>
        <p class="md:block hidden">Mahsulotlar</p>
      </router-link>

      <!-- Categories Link -->
      <router-link
        class="flex lg:flex-row md:flex-col flex-row items-center gap-2 md:w-full rounded-md md:px-2 py-2.5 duration-500 transition-colors shadow-md hover:shadow-lg"
        active-class="bg-gray-400"
        to="/categories"
      >
        <i class="fi fi-sr-category"></i>
        <p class="md:block hidden">Kategoriyalar</p>
      </router-link>

      <!-- Clients Link -->
      <router-link
        class="flex lg:flex-row md:flex-col flex-row items-center gap-2 md:w-full rounded-md md:px-2 py-2.5 duration-500 transition-colors shadow-md hover:shadow-lg"
        active-class="bg-gray-400"
        to="/clients"
      >
        <i class="fi fi-sr-users"></i>
        <p class="md:block hidden">Mijozlar</p>
      </router-link>

      <!-- Admins Link -->
      <router-link
        class="flex lg:flex-row md:flex-col flex-row items-center gap-2 md:w-full rounded-md md:px-2 py-2.5 duration-500 transition-colors shadow-md hover:shadow-lg"
        active-class="bg-gray-400"
        to="/admins"
      >
        <i class="fi fi-ss-admin-alt"></i>
        <p class="md:block hidden">Adminlar</p>
      </router-link>

      <!-- Contracts Link -->
      <router-link
        class="flex lg:flex-row md:flex-col flex-row items-center gap-2 md:w-full rounded-md md:px-2 py-2.5 duration-500 transition-colors shadow-md hover:shadow-lg"
        active-class="bg-gray-400"
        to="/contracts"
      >
        <i class="fi fi-ss-diploma"></i>
        <p class="md:block hidden">Shartnomalar</p>
      </router-link>
    </div>

    <!-- Logout Button -->
    <!-- Add logout button here if needed -->
  </div>
</template>
