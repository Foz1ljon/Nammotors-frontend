<template>
  <div
    :class="{ dark: isDarkMode }"
    class="p-6 flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
  >
    <h1 class="text-3xl font-semibold mb-4">Adminlar</h1>
    <!-- Header and Search -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center gap-4 w-full">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Adminlarni qidirish..."
          class="border w-full border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-gray-500 transition"
        />
        <button
          @click="openCreateModal"
          class="bg-gray-200 flex justify-center items-center dark:bg-gray-700 text-gray-700 dark:text-gray-100 px-5 py-3 rounded-lg shadow-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-transform transform hover:scale-105"
        >
          <i class="fi fi-sr-user-add w-5 h-5 mr-2"></i>
        </button>
      </div>
    </div>

    <!-- Admin List Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(admin, index) in filteredAdminList"
        :key="admin.username"
        class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
      >
        <img
          :src="admin.image"
          alt="Admin Image"
          class="w-24 h-24 object-cover rounded-full mb-4 border-2 border-gray-200 dark:border-gray-600"
        />
        <div class="text-xl font-semibold mb-2">
          {{ admin.fname }} {{ admin.lname }}
        </div>
        <div class="text-gray-600 dark:text-gray-300 mb-4">
          @{{ admin.username }}
        </div>
        <div class="flex space-x-2 mt-auto">
          <button
            @click="openEditModal(admin, index)"
            class="bg-gray-400 dark:bg-gray-600 text-gray-800 dark:text-gray-100 p-2 rounded-lg shadow-lg hover:bg-gray-500 dark:hover:bg-gray-500 transition-transform transform hover:scale-105 flex items-center"
          >
            <i class="fi fi-sr-file-edit"></i>
          </button>
          <button
            @click="deleteAdmin(index)"
            class="bg-gray-400 dark:bg-gray-600 text-gray-800 dark:text-gray-100 p-2 rounded-lg shadow-lg hover:bg-gray-500 dark:hover:bg-gray-500 transition-transform transform hover:scale-105 flex items-center"
          >
            <i class="fi fi-sr-trash"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Create/Update Admin Modal -->
    <transition name="modal">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50"
      >
        <div
          class="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md transform transition-transform scale-90"
        >
          <h2 class="text-2xl font-semibold mb-6">
            {{ isEditMode ? "Adminni Tahrirlash" : "Admin Qo'shish" }}
          </h2>
          <form @submit.prevent="isEditMode ? updateAdmin : createAdmin">
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-300 mb-2"
                >Rasm</label
              >
              <div class="relative flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  @change="handleImageUpload"
                  id="file-input"
                  class="absolute inset-0 opacity-0 cursor-pointer"
                />
                <label
                  for="file-input"
                  class="w-full bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 cursor-pointer flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  <span class="text-gray-500 dark:text-gray-300"
                    >Upload Rasm</span
                  >
                </label>
                <img
                  v-if="previewImage"
                  :src="previewImage"
                  alt="Image Preview"
                  class="w-24 h-24 object-cover mt-4 rounded-md border-2 border-gray-200 dark:border-gray-600 shadow-md"
                />
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-300">Ism</label>
              <input
                v-model="currentAdmin.fname"
                type="text"
                class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-gray-500 transition"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-300"
                >Familiya</label
              >
              <input
                v-model="currentAdmin.lname"
                type="text"
                class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-gray-500 transition"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-300"
                >Foydalanuvchi nomi</label
              >
              <input
                v-model="currentAdmin.username"
                type="text"
                class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-gray-500 transition"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-300"
                >Parol</label
              >
              <input
                v-model="currentAdmin.password"
                type="password"
                class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-gray-500 transition"
                required
              />
            </div>
            <div class="flex justify-end space-x-2">
              <button
                type="button"
                @click="closeModal"
                class="bg-gray-400 dark:bg-gray-600 text-gray-800 dark:text-gray-100 px-5 py-2 rounded-lg shadow-lg hover:bg-gray-500 dark:hover:bg-gray-500 transition-transform transform hover:scale-105"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                class="bg-gray-600 dark:bg-gray-700 text-gray-100 px-5 py-2 rounded-lg shadow-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-transform transform hover:scale-105"
              >
                {{ isEditMode ? "Yangilash" : "Qo'shish" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();

const adminList = ref([
  {
    image: "/image.png",
    fname: "Jobir",
    lname: "Qodirov",
    username: "Jobir505",
    password: "ldfkvk34",
  },
  {
    image: "/image.png",
    fname: "Jobir",
    lname: "Qodirov",
    username: "Jobir505",
    password: "ldfkvk34",
  },
  // Add more items if needed
]);

const showModal = ref(false);
const isEditMode = ref(false);
const editIndex = ref(null);
const previewImage = ref(null);
const currentAdmin = ref({
  image: "",
  fname: "",
  lname: "",
  username: "",
  password: "",
});
const searchTerm = ref("");
const isDarkMode = ref(false); // You can adjust this based on your dark mode logic

function openCreateModal() {
  currentAdmin.value = {
    image: "",
    fname: "",
    lname: "",
    username: "",
    password: "",
  };
  previewImage.value = null;
  isEditMode.value = false;
  showModal.value = true;
}

function openEditModal(admin, index) {
  currentAdmin.value = { ...admin };
  previewImage.value = admin.image;
  editIndex.value = index;
  isEditMode.value = true;
  showModal.value = true;
}

function createAdmin() {
  adminList.value.push({ ...currentAdmin.value });
  closeModal();
  toast.success("Admin muvaffaqiyatli qo'shildi!");
}

function updateAdmin() {
  if (editIndex.value !== null) {
    adminList.value[editIndex.value] = { ...currentAdmin.value };
    closeModal();
    toast.success("Admin muvaffaqiyatli yangilandi!");
  }
}

function deleteAdmin(index) {
  adminList.value.splice(index, 1);
  toast.error("Admin o'chirildi!");
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      previewImage.value = reader.result;
      currentAdmin.value.image = reader.result;
    };
    reader.readAsDataURL(file);
  }
}

function closeModal() {
  showModal.value = false;
  isEditMode.value = false;
}

const filteredAdminList = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return adminList.value.filter(
    (admin) =>
      admin.fname.toLowerCase().includes(term) ||
      admin.lname.toLowerCase().includes(term) ||
      admin.username.toLowerCase().includes(term)
  );
});
</script>
<style scoped>
.modal-enter-active,
.modal-leave-active {
  @apply transition-opacity;
}
.modal-enter, .modal-leave-to /* .modal-leave-active in <2.1.8 */ {
  @apply opacity-0;
}
</style>
