<template>
  <div class="p-6 flex flex-col">
    <div class="flex flex-col md:flex-row justify-between items-center mb-6">
      <h1 class="text-3xl font-semibold text-gray-800 mb-4 md:mb-0">
        Adminlar
      </h1>
      <button
        @click="openCreateModal"
        class="bg-blue-600 text-white px-5 py-2  rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 flex items-center"
      >
        <i class="uicons-plus-circle w-5 h-5 mr-2"></i>
        Admin Qo'shish
      </button>
    </div>

    <!-- Admin List Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(admin, index) in adminList"
        :key="admin.username"
        class="bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
      >
        <img
          :src="admin.image"
          alt="Admin Image"
          class="w-24 h-24 object-cover rounded-full mb-4 border-2 border-gray-200"
        />
        <div class="text-xl font-semibold mb-2">
          {{ admin.fname }} {{ admin.lname }}
        </div>
        <div class="text-gray-600 mb-4">@{{ admin.username }}</div>
        <div class="flex space-x-2 mt-auto">
          <button
            @click="openEditModal(admin, index)"
            class="bg-yellow-500 text-white p-2 rounded-lg shadow-lg hover:bg-yellow-600 transition-transform transform hover:scale-105 flex items-center"
          >
            <i class="fi fi-sr-file-edit"></i>
          </button>
          <button
            @click="deleteAdmin(index)"
            class="bg-red-500 text-white p-2 rounded-lg shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105 flex items-center"
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
          class="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-lg transform transition-transform scale-90"
        >
          <h2 class="text-2xl font-semibold mb-6">
            {{ isEditMode ? "Adminni Tahrirlash" : "Admin Qo'shish" }}
          </h2>
          <form @submit.prevent="isEditMode ? updateAdmin : createAdmin">
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Rasm</label>
              <div class="relative">
                <input
                  type="file"
                  accept="image/*"
                  @change="handleImageUpload"
                  id="file-input"
                  class="absolute inset-0 opacity-0 cursor-pointer"
                />
                <label
                  for="file-input"
                  class="w-full h-24 bg-gray-200 border border-gray-300 rounded-md px-3 py-2 cursor-pointer flex items-center justify-center hover:bg-gray-300 transition"
                >
                  <span class="text-gray-500">Upload Rasm</span>
                </label>
                <img
                  v-if="previewImage"
                  :src="previewImage"
                  alt="Image Preview"
                  class="w-24 h-24 object-cover mt-4 rounded-md border-2 border-gray-200 shadow-md"
                />
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Ism</label>
              <input
                v-model="currentAdmin.fname"
                type="text"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Familiya</label>
              <input
                v-model="currentAdmin.lname"
                type="text"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Foydalanuvchi nomi</label>
              <input
                v-model="currentAdmin.username"
                type="text"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Parol</label>
              <input
                v-model="currentAdmin.password"
                type="password"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
            <div class="flex justify-end space-x-2">
              <button
                type="button"
                @click="closeModal"
                class="bg-gray-400 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-gray-500 transition-transform transform hover:scale-105"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                class="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
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
import { ref } from "vue";
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
  }, {
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
</script>

<style>
.modal-enter-active,
.modal-leave-active {
  @apply transition-opacity duration-300;
}
.modal-enter, .modal-leave-to /* .modal-leave-active in <2.1.8 */ {
  @apply opacity-0;
}
</style>
