<template>
  <div class="p-6 bg-white dark:bg-gray-900 min-h-screen">
    <h1
      class="md:text-4xl text-3xl text-black dark:text-white font-semibold mb-6"
    >
      Mijozni tahrirlash
    </h1>

    <form
      @submit.prevent="updateClient"
      class="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <!-- Ism Input -->
      <input
        type="text"
        v-model="form.fname"
        placeholder="Ismini kiriting..."
        class="p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-800 text-black dark:text-white"
      />

      <!-- Telefon Raqam Input -->
      <input
        type="text"
        v-model="form.phone_number"
        placeholder="Telefon raqamini kiriting..."
        class="p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-800 text-black dark:text-white"
      />

      <!-- Firma Input -->
      <input
        type="text"
        v-model="form.firma"
        placeholder="Firmasining nomini kiriting"
        class="p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-800 text-black dark:text-white"
      />

      <!-- Manzil Input -->
      <input
        type="text"
        v-model="form.location"
        placeholder="Manzilini kiriting..."
        class="p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-800 text-black dark:text-white"
      />

      <!-- Dropdown Tanlash -->
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

      <!-- Tugmalar -->
      <div class="md:col-span-2 flex gap-4 mt-4">
        <button
          type="submit"
          class="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700 transition-colors"
        >
          Yangilash
        </button>
        <button
          type="button"
          @click="cancelUpdate"
          class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-400 transition-colors"
        >
          Bekor qilish
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useClientStore } from "../store/clientStore"; // Ensure correct import

const clientStore = useClientStore();
const types = clientStore.types; // Use the types from the stores

const form = reactive({
  fname: "",
  phone_number: "",
  firma: "",
  location: "",
  type: "",
});

const route = useRoute();
const router = useRouter();
const id = route.params.id;

onMounted(async () => {
  const clientData = await clientStore.getClientById(id);
  if (clientData) {
    Object.assign(form, clientData);
  }
});

const updateClient = async () => {
  await clientStore.updateClient(id, form);
  router.push("/clients");
};

const cancelUpdate = () => {
  router.push("/clients");
};
</script>
