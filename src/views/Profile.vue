<template>
  <div class="p-6 bg-white dark:bg-gray-900 min-h-screen">
    <h1
      class="md:text-4xl text-3xl text-black dark:text-white font-semibold mb-6"
    >
      Mening ma'lumotlarim
    </h1>

    <!-- User Data Display -->
    <div class="relative bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <!-- Action Buttons Positioned Top-Right -->
      <button
        @click="showModal = true"
        class="absolute top-4 right-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <i class="fi fi-sr-user-pen"></i>
      </button>

      <div class="flex items-center space-x-4 mb-4">
        <img
          v-if="user.image"
          :src="user.image"
          alt="User Image"
          class="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-gray-200">
            {{ user.fname }} {{ user.lname }}
          </h2>
          <p class="text-gray-700 dark:text-gray-400">
            {{ user.username }}
          </p>
        </div>
      </div>

      <div class="mt-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
          User ID
        </h3>
        <p class="text-gray-600 dark:text-gray-300">{{ user._id }}</p>
      </div>

      <!-- Clients Toggle Button -->
      <button
        @click="toggleClients"
        class="mt-4 flex items-center py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <i v-if="isShowClients" class="fi fi-sr-caret-up mt-1"></i>
        <i v-else class="fi fi-br-caret-down mt-1"></i>
        Mening mijozlarim
      </button>

      <!-- Clients List -->
      <div v-if="isShowClients" class="mt-4">
        <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Mijozlar
        </h4>

        <div class="py-5" v-if="user.clients.length == 0">
          Hozirda mijozlari mavjud emas...
        </div>

        <ul class="list-disc pl-5">
          <li
            v-for="client in user.clients"
            :key="client._id"
            class="text-gray-700 dark:text-gray-400 mb-2"
          >
            <strong>{{ client.fname }}</strong> {{ client.phone_number }}
            <p class="text-sm text-gray-600 dark:text-gray-300">
              Firma: {{ client.firma }} | Manzili: {{ client.location }} | Turi:
              {{ client.type }}
            </p>
          </li>
        </ul>
      </div>
    </div>

    <!-- Edit User Modal -->
    <EditUserModal
      v-if="showModal"
      :isVisible="showModal"
      :user="user"
      @update="fetchUserData"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import api from "@/api";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import EditUserModal from "@/components/EditAdminModal.vue"; // Import the modal component

const router = useRouter();
const toast = useToast();
const token = localStorage.getItem("token");
const user = ref({});
const isShowClients = ref(false);
const showModal = ref(false);

const toggleClients = () => {
  isShowClients.value = !isShowClients.value;
};

const editUser = () => {
  // Handle user editing logic here
  showModal.value = true;
};

const fetchUserData = async () => {
  if (token) {
    try {
      const response = await api.get("/admins/auth/getme", {
        headers: { Authorization: `Bearer ${token}` },
      });
      user.value = response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      localStorage.removeItem("token");
      toast.error("Ruxsati yo'q foydalanuvchi!");
      router.push({ name: "auth" });
    }
  } else {
    console.error("No token found");
    router.push({ name: "auth" });
  }
};

onMounted(() => {
  fetchUserData();
});
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
