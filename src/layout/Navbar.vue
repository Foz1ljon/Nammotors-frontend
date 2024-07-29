<template>
  <div
    :class="{ dark: isDarkMode }"
    class="min-h-screen bg-gray-50 dark:bg-gray-800 text-black dark:text-white transition-colors duration-300"
  >
    <!-- Navbar -->
    <div
      class="sm:w-[80%] w-full z-50 p-4 fixed border-b-0 bg-gray-50 dark:bg-gray-800 flex justify-between items-center shadow-md"
    >
      <!-- Dark Mode Toggle -->
      <label class="flex items-center cursor-pointer">
        <span class="mr-3 text-black dark:text-white">Dark Mode</span>
        <input
          type="checkbox"
          v-model="isDarkMode"
          @change="toggleDarkMode"
          class="hidden"
        />
        <div
          class="relative inline-flex items-center cursor-pointer"
          @click="toggleDarkMode"
        >
          <div
            class="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-300"
          ></div>
          <div
            class="absolute w-6 h-6 bg-white dark:bg-gray-800 rounded-full shadow-md transition-transform duration-300"
            :class="{
              'translate-x-6': isDarkMode,
              'translate-x-0': !isDarkMode,
            }"
          ></div>
        </div>
      </label>

      <!-- User Logo Dropdown -->
      <div class="relative">
        <img
          :src="user ? user.image : '/logo.png'"
          alt="User Logo"
          class="w-10 h-10 rounded-full cursor-pointer"
          @click="toggleDropdown"
        />
        <div
          v-if="dropdownOpen"
          class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-50"
        >
          <ul class="py-2">
            <li
              class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
              @click="navigateTo('profile')"
            >
              <i
                class="fi fi-ss-user w-5 h-5 mr-2 text-gray-600 dark:text-gray-300"
              ></i>
              Sozlamalar
            </li>

            <li
              class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
              @click="logout"
            >
              <i
                class="fi fi-br-sign-out-alt w-5 h-5 mr-2 text-gray-600 dark:text-gray-300"
              ></i>
              Chiqish
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="p-4 pt-20">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import api from "@/api";

const toast = useToast();
const isDarkMode = ref(false);
const dropdownOpen = ref(false);
const router = useRouter();
const user = ref();
const token = localStorage.getItem("token");


onMounted(async () => {
  if (token) {
    try {
      const response = await api.get("/admins/auth/getme", {
        headers: { Authorization: `Bearer ${token}` },
      });
      user.value = response.data;
    } catch (error) {
      if (error.code == "ERR_NETWORK") return toast.warning("Tarmoq xatosi!");
      toast.error("Ruxsati yo'q foydalanuvchi!");
      console.log("error response", error.code);
      localStorage.removeItem("token");

      router.push("/login");
    }
  } else {
    console.error("No token found");
    // router.push("/login");
  }
});

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("darkMode", "true");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", "false");
  }
};

// Initialize dark mode based on local storage
if (localStorage.getItem("darkMode") === "true") {
  isDarkMode.value = true;
  document.documentElement.classList.add("dark");
}

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const navigateTo = (path) => {
  router.push(`/${path}`);
  dropdownOpen.value = false;
};

const logout = () => {
  localStorage.removeItem("token");
  toast.success("Success logout");
  router.push("/login");
  dropdownOpen.value = false;
};
</script>
