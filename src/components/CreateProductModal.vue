<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center p-8 justify-center z-50 bg-gray-800 bg-opacity-50"
    @click.self="handleClose"
  >
    <div
      class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg relative max-w-4xl w-full"
    >
      <!-- Close Button -->
      <button
        @click="handleClose"
        class="absolute top-3 right-3 dark:bg-gray-700 bg-gray-300 px-2 pb-0.5 rounded-full text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-100 text-xl"
        aria-label="Close"
      >
        &times;
      </button>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Brand and KWT -->
        <div class="flex flex-wrap gap-6">
          <div class="flex-1">
            <label
              for="brand"
              class="block text-gray-700 dark:text-gray-300 mb-1 text-sm"
            >
              Brend:
            </label>
            <input
              id="brand"
              v-model="productData.marka"
              type="text"
              placeholder="Brend nomi"
              class="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-sm focus:border-blue-500 dark:focus:border-blue-600"
              required
            />
          </div>
          <div class="flex-1">
            <label
              for="kwt"
              class="block text-gray-700 dark:text-gray-300 mb-1 text-sm"
            >
              KWT:
            </label>
            <input
              id="kwt"
              v-model="productData.kwt"
              type="number"
              placeholder="KVT qiymati"
              class="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-sm focus:border-blue-500 dark:focus:border-blue-600"
              required
            />
          </div>
        </div>

        <!-- Turnover, Price, and Quantity -->
        <div class="flex flex-wrap gap-6">
          <div class="flex-1">
            <label
              for="turnover"
              class="block text-gray-700 dark:text-gray-300 mb-1 text-sm"
            >
              Turnover:
            </label>
            <input
              id="turnover"
              v-model="productData.turnover"
              type="number"
              placeholder="Aylanish"
              class="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-sm focus:border-blue-500 dark:focus:border-blue-600"
              required
            />
          </div>
          <div class="flex-1">
            <label
              for="price"
              class="block text-gray-700 dark:text-gray-300 mb-1 text-sm"
            >
              Narx:
            </label>
            <input
              id="price"
              v-model="productData.price"
              type="number"
              placeholder="Narx"
              class="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-sm focus:border-blue-500 dark:focus:border-blue-600"
              required
            />
          </div>
          <div class="flex-1">
            <label
              for="count"
              class="block text-gray-700 dark:text-gray-300 mb-1 text-sm"
            >
              Soni:
            </label>
            <input
              id="count"
              v-model="productData.count"
              type="number"
              placeholder="Soni"
              class="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-sm focus:border-blue-500 dark:focus:border-blue-600"
              required
            />
          </div>
        </div>

        <!-- Image Upload -->
        <div>
          <label
            for="image"
            class="block text-gray-700 dark:text-gray-300 mb-1 text-sm"
          >
            Rasm:
          </label>
          <div class="flex items-center">
            <input
              id="image"
              ref="fileInput"
              type="file"
              @change="handleFileChange"
              class="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-sm file:bg-gray-200 file:dark:bg-gray-700 file:border-none file:rounded-md file:text-sm file:font-medium"
              aria-label="Upload image"
            />
            <div
              v-if="productData.img"
              class="ml-4 w-28 h-28 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
            >
              <img
                :src="productData.img"
                alt="Mahsulot rasmi"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <!-- Category and Location -->
        <div class="flex flex-wrap gap-6">
          <div class="flex-1">
            <label
              for="category"
              class="block text-gray-700 dark:text-gray-300 mb-1 text-sm"
            >
              Kategoriya:
            </label>
            <div class="relative">
              <select
                id="category"
                v-model="productData.category"
                class="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-sm focus:border-blue-500 dark:focus:border-blue-600 appearance-none"
                required
              >
                <option value="" disabled selected>Kategoriya tanlang</option>
                <option
                  v-for="category in categories"
                  :key="category._id"
                  :value="category._id"
                >
                  {{ category.name }}
                </option>
              </select>
              <div
                class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"
              >
                <svg
                  class="w-5 h-5 text-gray-500 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div class="flex-1">
            <label
              for="location"
              class="block text-gray-700 dark:text-gray-300 mb-1 text-sm"
            >
              Joylashuv:
            </label>
            <input
              id="location"
              v-model="productData.location"
              type="text"
              placeholder="Joylashuv"
              class="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-sm focus:border-blue-500 dark:focus:border-blue-600"
              required
            />
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="handleClose"
            class="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 text-sm"
          >
            Bekor qilish
          </button>
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm"
            :disabled="isLoading"
          >
            <span v-if="isLoading">Yuklanmoqda...</span>
            <span v-else>Saqlash</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
import { useProductStore } from "@/store/productStore"; // Updated import path

const props = defineProps({
  show: Boolean,
  close: Function,
});
const emit = defineEmits(["create"]);

const productData = ref({
  marka: "",
  kwt: "",
  turnover: "",
  category: "",
  location: "",
  price: "",
  count: "",
  photo: null,
  img: null,
});

const categories = ref([]);
const isLoading = ref(false);
const productStore = useProductStore();

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    productData.value.photo = file;
    productData.value.img = URL.createObjectURL(file);
  }
};

const handleSubmit = async () => {
  isLoading.value = true; // Set loading to true
  const formData = new FormData();
  Object.entries(productData.value).forEach(([key, value]) => {
    if (key === "photo" && value) {
      formData.append("photo", value);
    } else if (key !== "img") {
      formData.append(key, value);
    }
  });

  try {
    await productStore.createProduct(formData); // Use store action
    resetForm();
    handleClose(); // Close the modal using handleClose
    emit("create");
  } catch (err) {
    console.error("API Error:", err.response ? err.response.data : err.message);
  } finally {
    isLoading.value = false; // Set loading to false
  }
};

const resetForm = () => {
  productData.value = {
    marka: "",
    kwt: "",
    turnover: "",
    category: "",
    location: "",
    price: "",
    count: "",
    photo: null,
    img: null,
  };
};

const handleClose = () => {
  props.close(); // Notify the parent component to close the modal
};

onMounted(async () => {
  try {
    await productStore.fetchCategories(); // Use store action
    categories.value = productStore.categories; // Load categories from store
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
});
</script>
