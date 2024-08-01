<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
  >
    <div
      class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md relative"
    >
      <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-4">
        Foydalanuvchini Tahrirlash
      </h2>
      <form @submit.prevent="handleSubmit">
        <!-- Form fields as before -->
        <div class="mb-4">
          <label
            class="block text-gray-700 dark:text-gray-300 mb-2"
            for="fname"
          >
            Ism
          </label>
          <input
            v-model="form.fname"
            id="fname"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
            :disabled="adminStore.loading"
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 dark:text-gray-300 mb-2"
            for="lname"
          >
            Familya
          </label>
          <input
            v-model="form.lname"
            id="lname"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
            :disabled="adminStore.loading"
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 dark:text-gray-300 mb-2"
            for="username"
          >
            Foydalanuvchi nomi
          </label>
          <input
            v-model="form.username"
            id="username"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
            :disabled="adminStore.loading"
          />
          <label
            class="block text-gray-700 dark:text-gray-300 mb-2"
            for="password"
          >
            Foydalanuvchi paroli
          </label>
          <input
            v-model="form.password"
            id="password"
            type="password"
            class="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
            :disabled="adminStore.loading"
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 dark:text-gray-300 mb-2"
            for="photo"
          >
            Profil rasmi
          </label>
          <div class="relative flex gap-2 items-center">
            <input
              type="file"
              id="photo"
              @change="handleFileChange"
              class="absolute inset-0 opacity-0 cursor-pointer"
              :disabled="adminStore.loading"
            />
            <button
              type="button"
              class="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 flex items-center justify-between"
              :disabled="adminStore.loading"
            >
              <span v-if="!previewPhoto">Rasm tanlang</span>
              <span v-if="previewPhoto" class="flex items-center">
                <img
                  :src="previewPhoto"
                  alt="Rasmni oldindan ko'rish"
                  class="w-8 h-8 object-cover rounded-full mr-2"
                />
                <span>Rasm tanlandi</span>
              </span>
              <i class="uicons uicons-add"></i>
            </button>

            <img
              v-if="previewPhoto"
              :src="previewPhoto"
              alt="Rasmni oldindan ko'rish"
              class="mt-2 w-16 h-16 object-cover rounded"
            />
          </div>
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            :disabled="adminStore.loading"
            class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 relative"
          >
            O'zgarishlarni saqlash
            <div
              v-if="adminStore.loading"
              class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 rounded"
            >
              <i class="uicons uicons-spinner uicons-spin"></i>
            </div>
          </button>
          <button
            @click="closeModal"
            type="button"
            class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700"
          >
            Bekor qilish
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { useAdminStore } from "../store/adminStore";

const adminStore = useAdminStore();
const props = defineProps({
  isVisible: Boolean,
});

const emit = defineEmits(["close"]);

const form = ref({
  fname: "",
  lname: "",
  username: "",
  password: "",
});
const photoFile = ref(null);
const previewPhoto = ref(null);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    previewPhoto.value = URL.createObjectURL(file);
    photoFile.value = file;
  }
};

const handleSubmit = async () => {
  // Prevent multiple submissions
  if (adminStore.loading) return;

  adminStore.loading = true;

  const formData = new FormData();
  formData.append("fname", form.value.fname);
  formData.append("lname", form.value.lname);
  formData.append("username", form.value.username);
  formData.append("password", form.value.password);

  if (photoFile.value) {
    formData.append("image", photoFile.value);
  }

  try {
    await adminStore.createAdmin(formData);
    closeModal();
  } catch (error) {
    console.error("Error submitting form:", error);
  } finally {
    adminStore.loading = false;
  }
};

const closeModal = () => {
  emit("close");
};
</script>
