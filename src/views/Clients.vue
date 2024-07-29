<template>
  <div class="p-6 bg-white dark:bg-gray-900 min-h-screen">
    <h1
      class="md:text-4xl text-3xl text-black dark:text-white font-semibold mb-6"
    >
      Mijozlar
    </h1>

    <!-- Create Client Button -->
    <div class="flex justify-end mb-6">
      <button
        @click="createClient"
        class="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2"
      >
        <i class="fi fi-sr-user-add text-lg"></i>
        <span class="hidden md:inline">Yangi Mijoz</span>
      </button>
    </div>

    <!-- Clients Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th
              class="px-4 py-2 md:table-cell hidden text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider"
            >
              Ismi
            </th>
            <th
              class="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider"
            >
              Telefon raqami
            </th>
            <th
              class="px-4 py-2 text-left md:table-cell hidden text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider"
            >
              Turi
            </th>
            <th
              class="px-4 py-2 text-left md:table-cell hidden text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider"
            >
              Taklif qilgan
            </th>
            <th
              class="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider"
            >
              Funksiyalar
            </th>
          </tr>
        </thead>
        <tbody
          class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700"
        >
          <tr v-for="client in clients" :key="client.id">
            <td
              class="px-4 py-2 md:table-cell hidden text-sm text-gray-800 dark:text-gray-300"
            >
              {{ client.fname }}
            </td>
            <td class="px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
              {{ client.phone_number }}
            </td>
            <td
              class="px-4 py-2 md:table-cell hidden text-sm text-gray-800 dark:text-gray-300"
            >
              {{ client.type }}
            </td>
            <td
              class="px-4 md:table-cell hidden py-2 text-sm text-gray-800 dark:text-gray-300"
            >
              @{{ client.admin.username }}
            </td>
            <td
              class="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 flex space-x-2"
            >
              <button
                @click="openEditModal(client)"
                class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-lg"
              >
                <i class="fi fi-sr-file-edit text-lg"></i>
              </button>
              <button
                @click="removeClient(client)"
                class="bg-gray-100 dark:bg-gray-700 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-600 p-2 rounded-lg"
              >
                <i class="fi fi-sr-trash text-lg"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import api from "@/api"; // Adjust the path to your API file
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const toast = useToast();

const clients = ref([]);
const router = useRouter();

const token = localStorage.getItem("token");
const hdrs = { headers: { Authorization: `Bearer ${token}` } };

// Fetch clients from API
const fetchClients = async () => {
  try {
    const response = await api.get("/clients/search?query=", hdrs);
    clients.value = response.data;
  } catch (error) {
    toast.error("Mijozlarni olishda xatolik yuz berdi");
    console.error("Mijozlarni olish xatosi:", error);
  }
};

// Call fetchClients when component is mounted
onMounted(() => {
  fetchClients();
});

// Create client
const createClient = async () => {
  router.push({ name: "client-create" });
};

// Remove client
const removeClient = async (client) => {
  try {
    await api.delete(`/clients/${client.id}`, hdrs);
    await fetchClients();
    toast.warning("Mijoz muvaffaqiyatli o'chirildi");
  } catch (error) {
    toast.error("Mijozni o'chirishda xatolik yuz berdi");
  }
};

// Open edit modal
const openEditModal = (client) => {
  router.push(`/clients/${client._id}`);
};
</script>
