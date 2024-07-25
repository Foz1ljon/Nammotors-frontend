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
            v-model="data.username"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="mb-6">
          <label for="password" class="block text-gray-700 font-medium mb-2">
            Parol
          </label>
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="data.password"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import api from "@/api";

const toast = useToast();

const data = reactive({
  username: "foziljon",
  password: "fozil0990",
});

const showPassword = ref(false);

const router = useRouter();

// Login auth function
const handleLogin = () => {
  api
    .post("/admins/auth/signin", data)
    .then((res) => {
      toast.success("Muvofaqqiyatli kirdingiz!", { timeout: 1000 });
      localStorage.setItem("token", res.data.token);
      setTimeout(function () {
        router.push("/");
      }, 1000);
    })
    .catch((err) => {
      if (err.code == "ERR_NETWORK")
        toast.warning("Tarmoq xatosi!", { timeout: 2000 });
      if (err.response.status == 400)
        toast.warning(err.response.data.message[0], { timeout: 2000 });
      if (err.response.status == 404)
        toast.error("Username yoki parol xato!", { timeout: 2000 });
    });
};
</script>
