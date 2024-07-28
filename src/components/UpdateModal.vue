<template>
  <div
    class="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4"
  >
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full">
      <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Update Product
      </h4>
      <form @submit.prevent="updateProduct">
        <!-- Image Upload -->
        <div class="mt-4">
          <label for="img" class="block text-gray-700 dark:text-gray-300"
            >Image</label
          >
          <div class="flex items-center space-x-4">
            <input
              ref="fileInput"
              type="file"
              @change="handleFileChange"
              class="border w-[80%] rounded-md py-2 px-3 text-gray-900 dark:text-gray-100 dark:bg-gray-800"
            />
            <div
              v-if="product.img"
              class="mt-4 w-32 h-32 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-700"
            >
              <img
                :src="product.img"
                alt="Product Image"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <!-- Other Form Fields -->
        <div class="mt-4">
          <label for="marka" class="block text-gray-700 dark:text-gray-300"
            >Marka</label
          >
          <input
            v-model="product.marka"
            id="marka"
            type="text"
            class="border rounded-md w-full py-2 px-3 text-gray-900 dark:text-gray-100 dark:bg-gray-800"
          />
        </div>

        <div class="mt-4">
          <label for="kwt" class="block text-gray-700 dark:text-gray-300"
            >KWt</label
          >
          <input
            v-model="product.kwt"
            id="kwt"
            type="text"
            class="border rounded-md w-full py-2 px-3 text-gray-900 dark:text-gray-100 dark:bg-gray-800"
          />
        </div>

        <div class="mt-4">
          <label for="turnover" class="block text-gray-700 dark:text-gray-300"
            >Turnover</label
          >
          <input
            v-model="product.turnover"
            id="turnover"
            type="text"
            class="border rounded-md w-full py-2 px-3 text-gray-900 dark:text-gray-100 dark:bg-gray-800"
          />
        </div>

        <div class="mt-4">
          <label for="count" class="block text-gray-700 dark:text-gray-300"
            >Quantity</label
          >
          <input
            v-model="product.count"
            id="count"
            type="text"
            class="border rounded-md w-full py-2 px-3 text-gray-900 dark:text-gray-100 dark:bg-gray-800"
          />
        </div>

        <div class="mt-4">
          <label for="category" class="block text-gray-700 dark:text-gray-300"
            >Category</label
          >
          <select
            v-model="product.category"
            id="category"
            class="border rounded-md w-full py-2 px-3 text-gray-900 dark:text-gray-100 dark:bg-gray-800"
          >
            <option
              v-for="category in categories"
              :key="category._id"
              :value="category._id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>

        <div class="mt-4">
          <label for="location" class="block text-gray-700 dark:text-gray-300"
            >Location</label
          >
          <input
            v-model="product.location"
            id="location"
            type="text"
            class="border rounded-md w-full py-2 px-3 text-gray-900 dark:text-gray-100 dark:bg-gray-800"
          />
        </div>

        <div class="mt-6 flex justify-end space-x-2">
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Update
          </button>
          <button
            @click="cancel"
            type="button"
            class="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/api";
import { useToast } from "vue-toastification";

const product = ref({
  img: null,
  marka: "",
  kwt: "",
  turnover: "",
  count: "",
  category: "", // Ensure this holds the category ID
  location: "",
  photo: null, // Track the selected image file
});

const categories = ref([]);
const toast = useToast();
const router = useRouter();
const route = useRoute();
const token = localStorage.getItem("token");

const productId = route.params.id;

const fetchProductDetails = async () => {
  try {
    const { data } = await api.get(`/product/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    product.value = { ...data, img: data.img }; // Ensure img is updated from backend response
  } catch (error) {
    console.error("Failed to fetch product details:", error);
    toast.error("Failed to fetch product details.");
  }
};

const fetchCategories = async () => {
  try {
    const { data } = await api.get("/category", {
      headers: { Authorization: `Bearer ${token}` },
    });
    categories.value = data; // Assume the response is an array of category objects
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    toast.error("Failed to fetch categories.");
  }
};

const updateProduct = async () => {
  try {
    const formData = new FormData();

    // Append all fields to FormData
    Object.entries(product.value).forEach(([key, value]) => {
      if (key === "photo" && value) {
        formData.append("img", value); // Append the image file with key 'img'
      } else if (key !== "img") {
        formData.append(key, value);
      }
    });

    // Send the update request
    const { data } = await api.put(`/product/${productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    // Update the product object with the returned data from the server
    product.value = { ...data, img: data.img }; // Ensure img is updated from backend response

    toast.success("Product updated successfully");
    router.push({ name: "Products" });
  } catch (error) {
    toast.error(
      `Failed to update product: ${
        error.response ? error.response.data.message : error.message
      }`
    );
  }
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    product.value.img = URL.createObjectURL(file);
    product.value.photo = file; // Update the photo file
  }
};

const cancel = () => {
  router.push({ name: "Products" });
};

onMounted(() => {
  fetchProductDetails();
  fetchCategories(); // Fetch categories when component mounts
});
</script>

<style scoped>
/* Add your styles here */
</style>
