<template>
  <div
    class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100"
  >
    <!-- Header and Search -->
    <div class="flex flex-col md:flex-row justify-between items-center mb-6">
      <input
        v-model="searchTerm"
        @input="fetchAdmins"
        type="text"
        placeholder="Adminlarni qidirish..."
        class="border w-full md:w-1/2 border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-gray-500 transition"
      />
      <button
        @click="openCreateModal"
        class="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
      >
        Add Admin
      </button>
    </div>

    <!-- Admin List Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(admin, index) in filteredAdminList"
        :key="admin.username"
        class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
      >
        <img
          :src="admin.image || '/logo.png'"
          alt="Admin Image"
          class="w-24 h-24 object-cover rounded-full mb-4 border-2 border-gray-200 dark:border-gray-600"
        />
        <div class="text-xl font-semibold mb-2">
          {{ admin.fname }} {{ admin.lname }}
        </div>
        <div class="text-gray-600 dark:text-gray-300 mb-4">
          @{{ admin.username }}
        </div>

        <div
          class="flex items-center gap-2 flex-wrap justify-center space-x-2 mt-4"
        >
          <button
            @click="openUpdateModal(admin)"
            class="bg-green-600 text-white p-2 rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
          >
            <i class="fi fi-sr-file-edit"></i>
          </button>
          <button
            @click="deleteAdmin(admin._id)"
            class="bg-red-600 text-white p-2 rounded-lg shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105"
          >
            <i class="fi fi-sr-trash"></i>
          </button>
          <button
            @click="handleClientInfo(admin)"
            class="bg-gray-400 dark:bg-gray-600 text-gray-800 dark:text-gray-100 p-2 rounded-lg shadow-lg hover:bg-gray-500 dark:hover:bg-gray-500 transition-transform transform hover:scale-105"
          >
            <i class="fi fi-sr-users-alt"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Client Info Modal -->
    <transition name="fade">
      <div
        v-if="showClientModal"
        class="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50"
      >
        <div
          class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full relative"
        >
          <button
            @click="showClientModal = false"
            class="absolute top-2 right-2 text-gray-500 p-2 dark:text-gray-300"
          >
            <i class="fi fi-sr-x"></i>
          </button>
          <div
            v-if="selectedAdmin.clientsInfo.length === 0"
            class="text-gray-600 dark:text-gray-300"
          >
            Hozirda mijozlari mavjud emas...
          </div>
          <div v-else>
            <div
              v-for="client in selectedAdmin.clientsInfo"
              :key="client.phone_number"
              class="mb-4 border-b border-gray-300 dark:border-gray-600 pb-2"
            >
              <div class="font-semibold">{{ client.fname }}</div>
              <div class="text-gray-500 dark:text-gray-400">
                {{ client.phone_number }}
              </div>
              <div class="text-gray-500 dark:text-gray-400">
                {{ client.firma }}
              </div>
              <div class="text-gray-500 dark:text-gray-400">
                {{ client.type }}
              </div>
              <div class="text-gray-500 dark:text-gray-400">
                {{ client.location }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <CreateAdmin
      v-if="showCreateModal"
      :isVisible="showCreateModal"
      @close="showCreateModal = false"
    />
    <EditAdmin
      v-if="showUpdateModal"
      :isVisible="showUpdateModal"
      :user="selectedAdmin"
      @close="showUpdateModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useAdminStore } from "@/store/adminStore";
import EditAdmin from "@/components/UpdateProfile.vue";
import CreateAdmin from "@/components/CreateProfile.vue";
import { useToast } from "vue-toastification";

const toast = useToast();
const adminStore = useAdminStore();
const searchTerm = ref("");
const selectedAdmin = ref(null);
const showCreateModal = ref(false);
const showUpdateModal = ref(false);
const showClientModal = ref(false);

watch(searchTerm, () => {
  fetchAdmins();
});

onMounted(() => {
  fetchAdmins();
});

function fetchAdmins() {
  adminStore.fetchAdmins(searchTerm.value);
}

function openCreateModal() {
  showCreateModal.value = true;
}

function openUpdateModal(admin) {
  selectedAdmin.value = admin;
  showUpdateModal.value = true;
}

function deleteAdmin(id) {
  adminStore.deleteAdmin(id).then(() => {
    fetchAdmins();
  });
}

function handleClientInfo(admin) {
  if (admin.clientsInfo.length === 0) {
    toast.info("Hozirda mijozlari mavjud emas...");
  } else {
    selectedAdmin.value = admin;
    showClientModal.value = true;
  }
}

const filteredAdminList = computed(() => adminStore.admins);
</script>

<style scoped>
/* Animation for the modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
