<template>
  <div class="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen relative">
    <div class="flex items-center justify-between">
      <h1
        class="md:text-4xl text-3xl d text-black dark:text-white font-semibold mb-6"
      >
        Shartnomalar
      </h1>

      <!-- Create Button -->
      <button
        @click="createContract"
        class="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 absolute top-6 right-6"
      >
        <i class="fi fi-sr-add-document"></i>
      </button>
    </div>

    <!-- Contract Card -->
    <ContractCard v-for="item in contract" :key="item" :contract="item" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import ContractCard from "@/components/ContractCardItem.vue";
import api from "@/api";

const token = localStorage.getItem("token");

const contract = ref();

const fetchContracts = () => {
  api
    .get("/contract", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log(res.data);
      contract.value = res.data;
    });
};

onMounted(fetchContracts);

const createContract = () => {
  // Logic for creating a contract
  console.log("Create contract");
};
</script>

<style scoped>
/* TailwindCSS handles the main styling */
</style>
