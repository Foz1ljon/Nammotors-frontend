<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
  >
    <div
      class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
    >
      <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-4">
        Foydalanuvchini Tahrirlash
      </h2>
      <form @submit.prevent="handleSubmit">
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
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 dark:text-gray-300 mb-2"
            for="photo"
          >
            Profil rasmi
          </label>
          <input
            type="file"
            id="photo"
            @change="handleFileChange"
            class="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <p v-if="previewPhoto" class="mt-2 text-gray-600 dark:text-gray-300">
            Oldindan ko'rish:
          </p>
          <img
            v-if="previewPhoto"
            :src="previewPhoto"
            alt="Rasmni oldindan ko'rish"
            class="mt-2 w-24 h-24 object-cover rounded"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            O'zgarishlarni saqlash
          </button>
          <button
            @click="closeModal"
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
import { ref, watch } from "vue";
import api from "@/api";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const props = defineProps({
  isVisible: Boolean,
  user: Object,
});

const emit = defineEmits(["update", "close"]);

const toast = useToast();
const form = ref({ ...props.user });
const router = useRouter();
const token = localStorage.getItem("token");
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
  try {
    if (!token) {
      toast.error("Ruxsat etilmagan foydalanuvchi!");
      router.push("/login");
      return;
    }

    const formData = new FormData();
    formData.append("fname", form.value.fname);
    formData.append("lname", form.value.lname);
    formData.append("username", form.value.username);
    if (photoFile.value) {
      formData.append("image", photoFile.value);
    }

    await api.put(`/admins/${props.user._id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Foydalanuvchi muvaffaqiyatli yangilandi!");
    emit("update");
    emit("close");
  } catch (error) {
    console.error("Foydalanuvchini yangilashda xatolik:", error);
    toast.error("Foydalanuvchini yangilashda xatolik.");
  }
};

const closeModal = () => {
  emit("close");
};

watch(
  () => props.user,
  (newVal) => {
    form.value = { ...newVal };
    previewPhoto.value = newVal.image; // Agar rasmni ko'rsatmoqchi bo'lsangiz, yangilash
  }
);
</script>

<style scoped>
/* Tailwind CSS avtomatik ravishda ranglar va fon ranglarini boshqaradi */
</style>
