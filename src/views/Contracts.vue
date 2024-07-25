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
    <ContractCard v-for="item in 5" :key="item" :contract="contract" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import ContractCard from "@/components/ContractCardItem.vue";

const contract = ref({
  product: [
    {
      _id: "66a0076c8ff21ea89e714550",
      img: "http://res.cloudinary.com/dc28msg2s/image/upload/v1721763692/hjne1s2jt3izu8fhjvdx.png",
      marka: "salom3945g",
      price: "5600",
      kwt: "325kw",
      turnover: "444",
    },
    {
      _id: "66a007908ff21ea89e714554",
      img: "http://res.cloudinary.com/dc28msg2s/image/upload/v1721763727/kis3z41xsugmj2n34fsa.png",
      marka: "salom3945g",
      price: "5600",
      kwt: "325kw",
      turnover: "444",
    },
  ],
  vendor: {
    fname: "Foziljon",
    username: "fozil",
  },
  client: {
    fname: "Firdavs",
    phone_number: "+998912345678",
  },
  discount: 5,
  price: 10640,
  paytype: "card",
  createAt: "2024-07-25T04:43:15.217Z",
});

const createContract = () => {
  // Logic for creating a contract
  console.log("Create contract");
};
</script>

<style scoped>
/* TailwindCSS handles the main styling */
</style>
