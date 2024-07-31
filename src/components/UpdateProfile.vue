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
          <label class="block text-gray-700 dark:text-gray-300 mb-2" for="fname"
            >Ism</label
          >
          <input
            v-model="form.fname"
            id="fname"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 dark:text-gray-300 mb-2" for="lname"
            >Familya</label
          >
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
            >Foydalanuvchi nomi</label
          >
          <input
            v-model="form.username"
            id="username"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 dark:text-gray-300 mb-2" for="photo"
            >Profil rasmi</label
          >
          <div class="relative">
            <input
              type="file"
              id="photo"
              @change="handleFileChange"
              class="absolute inset-0 opacity-0 cursor-pointer"
            />
            <button
              type="button"
              class="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 flex items-center justify-between"
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
              <svg
                class="w-5 h-5 text-gray-600 dark:text-gray-300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
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
            :disabled="loading"
            class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 relative"
          >
            O'zgarishlarni saqlash
            <div
              v-if="loading"
              class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 rounded"
            >
              <svg
                class="animate-spin h-5 w-5 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 000 8v-4a8 8 0 01-8 8z"
                ></path>
              </svg>
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
import { ref, watch, onMounted } from "vue";
import { useProfileStore } from "@/store/profileStore";
import { useToast } from "vue-toastification";

const props = defineProps({
  isVisible: Boolean,
  user: Object,
});

const emit = defineEmits(["update", "close"]);

const toast = useToast();
const profileStore = useProfileStore();

const form = ref({
  fname: "",
  lname: "",
  username: "",
});
const photoFile = ref(null);
const previewPhoto = ref(null);
const loading = ref(false);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    previewPhoto.value = URL.createObjectURL(file);
    photoFile.value = file;
  }
};

const handleSubmit = async () => {
  if (!profileStore.token) {
    toast.error("Ruxsat etilmagan foydalanuvchi!");
    profileStore.router.push("/login");
    return;
  }

  loading.value = true;

  const formData = new FormData();
  formData.append("fname", form.value.fname);
  formData.append("lname", form.value.lname);
  formData.append("username", form.value.username);
  if (photoFile.value) {
    formData.append("image", photoFile.value);
  }

  try {
    await profileStore.updateUser(props.user._id, formData);
    emit("update");
    emit("close");
  } catch (error) {
    // Error handling already managed in store
    console.log("Update error", error);
  } finally {
    loading.value = false;
  }
};

const closeModal = () => {
  emit("close");
};

watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      form.value = {
        fname: newUser.fname || "",
        lname: newUser.lname || "",
        username: newUser.username || "",
      };
      previewPhoto.value = newUser.image || null;
    }
  }
);

onMounted(() => {
  if (props.user) {
    form.value = {
      fname: props.user.fname || "",
      lname: props.user.lname || "",
      username: props.user.username || "",
    };
    previewPhoto.value = props.user.image || null;
  }
});
</script>
