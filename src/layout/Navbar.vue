<template>
  <div
    :class="{ dark: isDarkMode }"
    class="min-h-screen bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
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
            class="toggle-line w-12 h-6 bg-gray-300 rounded-full"
            :class="{ 'bg-gray-600': isDarkMode }"
          ></div>
          <div
            class="toggle-dot absolute w-6 h-6 bg-white rounded-full shadow-md transition-transform"
            :style="{
              transform: isDarkMode ? 'translateX(1.5rem)' : 'translateX(0)',
            }"
          ></div>
        </div>
      </label>

      <!-- User Logo Dropdown -->
      <div class="relative">
        <img
          src="https://via.placeholder.com/40"
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
              Profile
            </li>
            <li
              class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
              @click="navigateTo('settings')"
            >
              <i
                class="fi fi-sr-settings w-5 h-5 mr-2 text-gray-600 dark:text-gray-300"
              ></i>
              Settings
            </li>
            <li
              class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
              @click="navigateTo('admin')"
            >
              <i
                class="fi fi-ss-lock w-5 h-5 mr-2 text-gray-600 dark:text-gray-300"
              ></i>
              Admin Panel
            </li>
            <li
              class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
              @click="logout"
            >
              <i
                class="fi fi-br-sign-out-alt w-5 h-5 mr-2 text-gray-600 dark:text-gray-300"
              ></i>
              Logout
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
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const isDarkMode = ref(false);
const dropdownOpen = ref(false);
const router = useRouter();

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};

watch(isDarkMode, (newVal) => {
  if (newVal) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("darkMode", "true");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", "false");
  }
});

// Initialize dark mode based on local storage
if (localStorage.getItem("darkMode") === "true") {
  isDarkMode.value = true;
}

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const navigateTo = (path) => {
  router.push(`/${path}`);
  dropdownOpen.value = false;
};

const logout = () => {
  // Implement logout logic here
  console.log("Logged out");
  dropdownOpen.value = false;
};
</script>

<style scoped>
button {
  transition: background-color 0.3s, color 0.3s;
}

button:hover {
  background-color: #e5e7eb; /* Light gray background on hover */
  color: #1f2937; /* Dark text color on hover */
}

/* Toggle Switch Styles */
.toggle-line {
  position: relative;
  transition: background-color 0.3s;
}

.toggle-dot {
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s;
}
</style>
