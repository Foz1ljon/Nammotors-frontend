<template>
  <div
    class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100"
  >
    <h1 class="text-4xl text-black dark:text-white font-semibold mb-8">
      NamMotors
    </h1>

    <h2 class="text-2xl text-gray-800 dark:text-gray-200 font-semibold mb-4">
      Statistika
    </h2>

    <div
      class="grid sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 gap-6"
    >
      <div
        class="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex items-center"
      >
        <div
          class="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4"
        >
          <i class="fi fi-sr-admin-alt text-3xl"></i>
          <!-- Uicons class for admins -->
        </div>
        <div>
          <h3 class="text-xl font-semibold">Admins</h3>
          <p class="text-gray-600 dark:text-gray-300">{{ totalAdmins }}</p>
        </div>
      </div>

      <div
        class="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex items-center"
      >
        <div
          class="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mr-4"
        >
          <i class="fi fi-sr-users text-3xl"></i>
          <!-- Uicons class for clients -->
        </div>
        <div>
          <h3 class="text-xl font-semibold">Clients</h3>
          <p class="text-gray-600 dark:text-gray-300">{{ totalClients }}</p>
        </div>
      </div>

      <div
        class="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex items-center"
      >
        <div
          class="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mr-4"
        >
          <i class="fi fi-sr-box-alt text-3xl"></i>
          <!-- Uicons class for products -->
        </div>
        <div>
          <h3 class="text-xl font-semibold">Products</h3>
          <p class="text-gray-600 dark:text-gray-300">{{ totalProducts }}</p>
        </div>
      </div>

      <div
        class="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex items-center"
      >
        <div
          class="w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center mr-4"
        >
          <i class="fi fi-sr-diploma text-3xl"></i>
          <!-- Uicons class for contracts -->
        </div>
        <div>
          <h3 class="text-xl font-semibold">Contracts</h3>
          <p class="text-gray-600 dark:text-gray-300">{{ totalContracts }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import api from "@/api";

const totalAdmins = ref(0);
const totalClients = ref(0);
const totalProducts = ref(0);
const totalContracts = ref(0);
const token = localStorage.getItem("token");

const hdrs = {
  headers: { Authorization: `Bearer ${token}` },
};

onBeforeMount(() => {
  api
    .get("/admins/search", hdrs)
    .then((res) => {
      totalAdmins.value = res.data.length;
    })
    .catch((err) => {
      console.log(err);
    });

  api.get("/clients/search", hdrs).then((res) => {
    totalClients.value = res?.data?.length;
  });

  api.get("/product/search", hdrs).then((res) => {
    totalProducts.value = res?.data?.length;
  });

  api.get("/contract", hdrs).then((res) => {
    totalContracts.value = res?.data?.length;
  });
});
</script>
