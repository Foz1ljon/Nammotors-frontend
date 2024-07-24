<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-semibold mb-6 text-center">NamMotors</h1>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="username" class="block text-gray-700 font-medium mb-2">
            Foydalanuvchi nomi
          </label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div class="mb-6">
          <label for="password" class="block text-gray-700 font-medium mb-2">
            Parol
          </label>
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="password"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div class="mt-2">
            <input type="checkbox" id="show-password" v-model="showPassword" />
            <label for="show-password" class="text-gray-700 ml-2">
              Parolni ko'rsatish
            </label>
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Kirish
        </button>
      </form>

      <div v-if="errorMessage" class="mt-4 text-red-500 text-center">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const showPassword = ref(false); // Parolni ko'rsatish/berkitish uchun ref qo'shildi
const errorMessage = ref("");
const router = useRouter();

const handleLogin = () => {
  // Kirish logikasini simulyatsiya qilish
  if (username.value === "admin" && password.value === "password") {
    router.push("/dashboard"); // Muvaffaqiyatli kirishda dashboard sahifasiga o'tish
  } else {
    errorMessage.value = "Foydalanuvchi nomi yoki parol noto'g'ri";
  }
};
</script>
