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
      <router-link
        v-for="(item, i) in menu"
        :key="i"
        :to="item.to"
        class="bg-white hover:bg-gray-200 dark:bg-gray-700 hover:dark:bg-gray-800 shadow rounded-lg p-4 flex items-center"
      >
        <div
          :class="item.bg"
          class="w-12 h-12 text-white rounded-full flex items-center justify-center mr-4"
        >
          <i :class="item.icon"></i>
          <!-- Uicons class for  items -->
        </div>
        <div>
          <h3 class="text-xl font-semibold">{{ item.name }}</h3>
          <p class="text-gray-600 dark:text-gray-300">{{ item.stat }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/api";

const totalAdmins = ref(0);
const totalClients = ref(0);
const totalProducts = ref(0);
const totalContracts = ref(0);
const token = localStorage.getItem("token");

const menu = [
  {
    name: "Adminlar",
    icon: "fi fi-sr-admin-alt text-3xl",
    to: "/admins",
    bg: "bg-blue-500",
    stat: totalAdmins,
  },
  {
    name: "Mijozlar",
    icon: "fi fi-sr-users text-3xl",
    to: "/clients",
    bg: "bg-green-500",
    stat: totalClients,
  },
  {
    name: "Mahsulotlar",
    icon: "fi fi-sr-box-alt text-3xl",
    to: "/products",
    bg: "bg-red-500",
    stat: totalProducts,
  },
  {
    name: "Shartnomalar",
    icon: "fi fi-sr-diploma text-3xl",
    to: "/contracts",
    bg: "bg-yellow-500",
    stat: totalContracts,
  },
];

const hdrs = {
  headers: { Authorization: `Bearer ${token}` },
};

onMounted(() => {
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
