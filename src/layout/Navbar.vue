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
        <span class="mr-3 text-black dark:text-white sm:block hidden"
          >Dark Mode</span
        >
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

      <div class="flex items-center gap-4 px-5">
        <router-link
          to="/cart"
          class="px-3 py-1 rounded-full bg-gray-300 dark:bg-gray-600 dark:text-white text-black relative"
        >
          <div class="mt-1">
            <i class="fi fi-sr-shopping-cart text-2xl"></i>
          </div>
          <p
            :class="cartCount == 0 ? 'hidden' : ''"
            class="absolute text-sm bg-red-500 text-white py-0.5 px-1 rounded-full -top-1 -right-2"
          >
            {{ cartCount }}
          </p>
        </router-link>

        <!-- User Logo Dropdown -->
        <div class="relative">
          <img
            :src="
              profileStore?.user?.image
                ? profileStore?.user?.image
                : '/logo.png'
            "
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
                @click="profileStore.router.push('/profile')"
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
    </div>

    <!-- Main Content -->
    <div class="p-4 pt-20">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useProfileStore } from "@/store/profileStore";
import { useCartStore } from "@/store/cartStore";

const profileStore = useProfileStore();
const cartStore = useCartStore();
const isDarkMode = ref(false);
const dropdownOpen = ref(false);

// Load the dark mode setting from localStorage
onMounted(() => {
  const darkModeSetting = localStorage.getItem("isDarkMode");
  isDarkMode.value = darkModeSetting === "true";
  document.documentElement.classList.toggle("dark", isDarkMode.value);
  profileStore.fetchUser();
  console.log(cartStore.cart);
});

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle("dark", isDarkMode.value);

  // Save the dark mode setting to localStorage
  localStorage.setItem("isDarkMode", isDarkMode.value.toString());
};

// Toggle dropdown menu
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

// Logout user
const logout = () => {
  profileStore.logOut();
  dropdownOpen.value = false;
};

// Computed cart count
const cartCount = computed(() => cartStore.getTotalItems());
</script>

<style scoped>
/* Scoped styles if needed */
</style>
