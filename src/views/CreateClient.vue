<template>
  <div class="p-6 bg-white dark:bg-gray-900 min-h-screen">
    <h1
      class="md:text-4xl text-3xl text-black dark:text-white font-semibold mb-6"
    >
      Mijoz yaratish
    </h1>

    <form
      @submit.prevent="createClient"
      class="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <!-- Name Input -->
      <input
        type="text"
        v-model="form.fname"
        placeholder="Ismini kiriting..."
        class="p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-800 text-black dark:text-white"
      />

      <!-- Phone Number Input -->
      <input
        type="text"
        v-model="form.phone_number"
        placeholder="Telefon raqamini kiriting..."
        class="p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-800 text-black dark:text-white"
      />

      <!-- Firm Input -->
      <input
        type="text"
        v-model="form.firma"
        placeholder="Firmasini nomini kiriting"
        class="p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-800 text-black dark:text-white"
      />

      <!-- Location Input -->
      <input
        type="text"
        v-model="form.location"
        placeholder="Manzilini kiriting..."
        class="p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-800 text-black dark:text-white"
      />

      <!-- Dropdown Select Type -->
      <div class="md:col-span-2">
        <label
          for="type"
          class="block text-black dark:text-white mb-2 font-medium"
        >
          Turini tanlang
        </label>
        <select
          id="type"
          v-model="form.type"
          class="block w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-800 text-black dark:text-white"
        >
          <option disabled value="">Tanlang...</option>
          <option v-for="type in types" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>
      <button type="submit">Add</button>
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
  alert("succes");
};
</script>
