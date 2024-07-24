<template>
  <div class="p-4 md:p-6 bg-white dark:bg-gray-900 min-h-screen">
    <h1
      class="text-2xl md:text-4xl text-black dark:text-white font-semibold mb-4 md:mb-6"
    >
      Mijozlar
    </h1>

    <!-- Search Input and Create Client Button -->
    <div class="flex flex-col md:flex-row md:justify-between mb-4 md:mb-6">
      <div class="flex flex-1 mb-4 md:mb-0">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Mijozlarni qidirish..."
          class="border p-2 md:p-3 rounded-lg w-full md:w-3/4 lg:w-1/2 xl:w-1/3 bg-white dark:bg-gray-800 text-black dark:text-white"
        />
      </div>
      <button
        @click="showCreateModal = true"
        class="bg-gray-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2"
      >
        <i class="fi fi-sr-user-add text-base md:text-lg"></i>
        <span class="hidden md:inline">Yangi Mijoz</span>
      </button>
    </div>

    <!-- Clients Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th
              class="px-2 py-1 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider"
            >
              Ismi
            </th>
            <th
              class="px-2 py-1 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider"
            >
              Telefon raqami
            </th>
            <th
              class="px-2 py-1 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider"
            >
              Turi
            </th>
            <th
              class="px-2 py-1 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider"
            >
              Taklif qilgan
            </th>
            <th
              class="px-2 py-1 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider"
            >
              Funksiyalar
            </th>
          </tr>
        </thead>
        <tbody
          class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700"
        >
          <tr v-for="client in filteredClients" :key="client.phone_number">
            <td
              class="px-2 py-2 text-xs md:text-sm text-gray-800 dark:text-gray-300"
            >
              {{ client.fname }}
            </td>
            <td
              class="px-2 py-2 text-xs md:text-sm text-gray-800 dark:text-gray-300"
            >
              {{ client.phone_number }}
            </td>
            <td
              class="px-2 py-2 text-xs md:text-sm text-gray-800 dark:text-gray-300"
            >
              {{ client.type }}
            </td>
            <td
              class="px-2 py-2 text-xs md:text-sm text-gray-800 dark:text-gray-300"
            >
              {{ client.admin }}
            </td>
            <td
              class="px-2 py-2 text-xs md:text-sm text-gray-800 dark:text-gray-300 flex space-x-2"
            >
              <button
                @click="openEditModal(client)"
                class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-lg"
              >
                <i class="fi fi-sr-file-edit text-base md:text-lg"></i>
              </button>
              <button
                @click="removeClient(client)"
                class="bg-gray-100 dark:bg-gray-700 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-600 p-2 rounded-lg"
              >
                <i class="fi fi-sr-trash text-base md:text-lg"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create Client Modal -->
    <Modal v-if="showCreateModal" @close="showCreateModal = false">
      <template #header>
        <h2
          class="text-xl md:text-2xl font-semibold text-black dark:text-white"
        >
          Mijoz yaratish
        </h2>
      </template>
      <template #body>
        <form @submit.prevent="createClient">
          <InputField
            v-model="newClient.fname"
            label="Ism"
            placeholder="Mijoz ismi"
          />
          <InputField
            v-model="newClient.phone_number"
            label="Telefon raqami"
            placeholder="Telefon raqami"
          />
          <SelectField
            v-model="newClient.type"
            label="Turi"
            :options="clientTypes"
          />
          <InputField
            v-model="newClient.admin"
            label="Taklif qilgan"
            placeholder="Admin ismi"
          />
        </form>
      </template>
      <template #footer>
        <button
          type="submit"
          class="bg-gray-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg mr-2 flex items-center gap-2"
          @click="createClient"
        >
          <i class="fi fi-ss-disk text-base md:text-lg"></i>
          <span>Saqlash</span>
        </button>
        <button
          @click="showCreateModal = false"
          class="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-3 py-2 md:px-4 md:py-2 rounded-lg flex items-center gap-2"
        >
          <i class="fi fi-rr-delete-document text-base md:text-lg"></i>
          <span>Bekor qilish</span>
        </button>
      </template>
    </Modal>

    <!-- Edit Client Modal -->
    <Modal v-if="showEditModal" @close="showEditModal = false">
      <template #header>
        <h2
          class="text-xl md:text-2xl font-semibold text-black dark:text-white"
        >
          Mijozni tahrirlash
        </h2>
      </template>
      <template #body>
        <form @submit.prevent="saveEdit">
          <InputField
            v-model="editClient.fname"
            label="Ism"
            placeholder="Mijoz ismi"
          />
          <InputField
            v-model="editClient.phone_number"
            label="Telefon raqami"
            placeholder="Telefon raqami"
          />
          <SelectField
            v-model="editClient.type"
            label="Turi"
            :options="clientTypes"
          />
          <InputField
            v-model="editClient.admin"
            label="Taklif qilgan"
            placeholder="Admin ismi"
          />
        </form>
      </template>
      <template #footer>
        <button
          type="submit"
          class="bg-gray-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg mr-2 flex items-center gap-2"
          @click="saveEdit"
        >
          <i class="fi fi-ss-disk text-base md:text-lg"></i>
          <span>Saqlash</span>
        </button>
        <button
          @click="showEditModal = false"
          class="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-3 py-2 md:px-4 md:py-2 rounded-lg flex items-center gap-2"
        >
          <i class="fi fi-rr-delete-document text-base md:text-lg"></i>
          <span>Bekor qilish</span>
        </button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useToast } from "vue-toastification";
import InputField from "@/components/InputField.vue";
import SelectField from "@/components/SelectField.vue";
import Modal from "@/components/Modal.vue";

const toast = useToast();

const searchQuery = ref("");

const clients = reactive([
  {
    fname: "Shokirjon",
    phone_number: "+998902234567",
    type: "b2b",
    admin: "Sobirjon",
  },
]);

const showCreateModal = ref(false);
const showEditModal = ref(false);
const newClient = reactive({
  fname: "",
  phone_number: "",
  type: "",
  admin: "",
});
const editClient = reactive({});
const editIndex = ref(null);

const clientTypes = ["b2b", "b2c", "b2g", "other"];

const filteredClients = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return clients.filter((client) =>
    Object.values(client).some((value) => value.toLowerCase().includes(query))
  );
});

function createClient() {
  clients.push({ ...newClient });
  showCreateModal.value = false;
  resetNewClientForm();
  toast.success("Client created successfully");
}

function removeClient(client) {
  const index = clients.indexOf(client);
  if (index !== -1) {
    clients.splice(index, 1);
    toast.warning("Client removed successfully");
  }
}

function openEditModal(client) {
  editClient.value = { ...client };
  showEditModal.value = true;
}

function saveEdit() {
  const index = clients.findIndex(
    (c) => c.phone_number === editClient.value.phone_number
  );
  if (index !== -1) {
    clients[index] = { ...editClient };
    showEditModal.value = false;
    toast.success("Client updated successfully");
  }
}

function resetNewClientForm() {
  Object.assign(newClient, {
    fname: "",
    phone_number: "",
    type: "",
    admin: "",
  });
}
</script>
