<template>
  <div class="p-6 bg-white dark:bg-gray-900 min-h-screen">
    <h1 class="text-4xl font-semibold text-black dark:text-white mb-8">
      Mijoz yaratish
    </h1>

    <form
      @submit.prevent="createClient"
      class="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <!-- Name Input -->
      <div class="col-span-1">
        <label
          for="fname"
          class="block text-black dark:text-white mb-2 font-medium"
          >Ism</label
        >
        <input
          id="fname"
          type="text"
          v-model="form.fname"
          placeholder="Ismini kiriting..."
          class="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-800 text-black dark:text-white"
        />
      </div>

      <!-- Phone Number Input -->
      <div class="col-span-1">
        <label
          for="phone_number"
          class="block text-black dark:text-white mb-2 font-medium"
          >Telefon raqam</label
        >
        <input
          id="phone_number"
          type="text"
          v-model="form.phone_number"
          placeholder="Telefon raqamini kiriting..."
          class="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-800 text-black dark:text-white"
        />
      </div>

      <!-- Firm Input -->
      <div class="col-span-1">
        <label
          for="firma"
          class="block text-black dark:text-white mb-2 font-medium"
          >Firma</label
        >
        <input
          id="firma"
          type="text"
          v-model="form.firma"
          placeholder="Firmasini nomini kiriting"
          class="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-800 text-black dark:text-white"
        />
      </div>

      <!-- Location Input -->
      <div class="col-span-1">
        <label
          for="location"
          class="block text-black dark:text-white mb-2 font-medium"
          >Manzil</label
        >
        <input
          id="location"
          type="text"
          v-model="form.location"
          placeholder="Manzilini kiriting..."
          class="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-800 text-black dark:text-white"
        />
      </div>

      <!-- Dropdown Select Type -->
      <div class="col-span-1 md:col-span-2">
        <label
          for="type"
          class="block text-black dark:text-white mb-2 font-medium"
          >Turini tanlang</label
        >
        <select
          id="type"
          v-model="form.type"
          class="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-800 text-black dark:text-white"
        >
          <option disabled value="">Tanlang...</option>
          <option v-for="type in types" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>

      <!-- Submit Button -->
      <div class="col-span-1 md:col-span-2 flex justify-center">
        <button
          type="submit"
          class="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition duration-300"
        >
          Qo'shish
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import api from "@/api";
const types = ["b2b", "b2c", "b2g"];

const form = reactive({
  fname: "",
  phone_number: "",
  firma: "",
  location: "",
  type: "",
});

const createClient = () => {
  alert("Client created successfully");
};
</script>

<style scoped>
/* Optional scoped styles */
</style>
