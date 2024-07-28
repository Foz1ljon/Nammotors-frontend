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
        @click="showCreateModal = true"
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
              {{ client.admin }}
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

    <!-- Create Client Modal -->
    <CreateClientModal
      v-if="showCreateModal"
      :newClient="newClient"
      :clientTypes="clientTypes"
      @close="showCreateModal = false"
      @createClient="createClient"
    />

    <!-- Edit Client Modal -->
    <EditClientModal
      v-if="showEditModal"
      :editClient="editClient"
      :clientTypes="clientTypes"
      @close="showEditModal = false"
      @saveEdit="saveEdit"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import CreateClientModal from "@/components/clients/CreateClientModal.vue";
import EditClientModal from "@/components/clients/EditClientModal.vue";
import api from "@/api"; // Adjust the path to your API file
import { useToast } from "vue-toastification";

const toast = useToast();

const clients = ref([]);
const showCreateModal = ref(false);
const showEditModal = ref(false);
const newClient = reactive({
  fname: "",
  phone_number: "",
  type: "",
  location: "",
  firma: "",
});
const editClient = reactive({
  fname: "",
  phone_number: "",
  type: "",
  location: "",
  firma: "",
});
const clientTypes = ref(["b2b", "b2c", "b2g"]); // Example client types

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
  try {
    await api.post("/clients", newClient, hdrs);
    showCreateModal.value = false;
    await fetchClients(); // Refresh the client list
    toast.success("Mijoz muvaffaqiyatli yaratildi");
  } catch (error) {
    toast.error("Mijoz yaratishda xatolik yuz berdi");
  }
};

// Remove client
const removeClient = async (client) => {
  try {
    await api.delete(`/clients/${client.id}`, hdrs);
    await fetchClients(); // Refresh the client list
    toast.warning("Mijoz muvaffaqiyatli o'chirildi");
  } catch (error) {
    toast.error("Mijozni o'chirishda xatolik yuz berdi");
  }
};

// Open edit modal
const openEditModal = (client) => {
  Object.assign(editClient, client); // Update editClient with client details
  showEditModal.value = true;
};

// Save edit
const saveEdit = async () => {
  try {
    const response = await api.patch(
      `/clients/${editClient.id}`,
      editClient,
      hdrs
    );
    fetchClients();
    showEditModal.value = false;
    toast.success("Mijoz muvaffaqiyatli yangilandi");
  } catch (error) {
    toast.error("Mijozni yangilashda xatolik yuz berdi");
    console.error(
      "Mijozni yangilash xatosi:",
      error.response?.data || error.message
    );
  }
};
</script>
