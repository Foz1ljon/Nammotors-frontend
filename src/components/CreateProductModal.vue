<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50"
    @click.self="handleClose"
  >
    <div
      class="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg relative max-w-4xl w-full"
    >
      <!-- Yopish tugmasi -->
      <button
        @click="handleClose"
        class="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 text-xl"
      >
        &times;
      </button>

      <!-- Forma -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Marka va KWT -->
        <div class="flex flex-wrap gap-4">
          <div class="flex-1">
            <label class="block text-gray-700 dark:text-gray-300 mb-1 text-sm"
              >Marka:</label
            >
            <input
              v-model="productData.marka"
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-sm"
              required
            />
          </div>
          <div class="flex-1">
            <label class="block text-gray-700 dark:text-gray-300 mb-1 text-sm"
              >KWT:</label
            >
            <input
              v-model="productData.kwt"
              type="number"
              class="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-sm"
              required
            />
          </div>
        </div>

        <!-- Aylantiruvchi, Narx va Son -->
        <div class="flex flex-wrap gap-4">
          <div class="flex-1">
            <label class="block text-gray-700 dark:text-gray-300 mb-1 text-sm"
              >Aylantiruvchi:</label
            >
            <input
              v-model="productData.turnover"
              type="number"
              class="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-sm"
              required
            />
          </div>
          <div class="flex-1">
            <label class="block text-gray-700 dark:text-gray-300 mb-1 text-sm"
              >Narx:</label
            >
            <input
              v-model="productData.price"
              type="number"
              class="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-sm"
              required
            />
          </div>
          <div class="flex-1">
            <label class="block text-gray-700 dark:text-gray-300 mb-1 text-sm"
              >Son:</label
            >
            <input
              v-model="productData.count"
              type="number"
              class="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-sm"
              required
            />
          </div>
        </div>

        <!-- Rasm -->
        <div>
          <label class="block text-gray-700 dark:text-gray-300 mb-1 text-sm"
            >Rasm:</label
          >
          <input
            ref="fileInput"
            type="file"
            @change="handleFileChange"
            class="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-sm"
          />
          <div
            v-if="productData.img"
            class="mt-3 w-28 h-28 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-700"
          >
            <img
              :src="productData.img"
              alt="Mahsulot rasmi"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- Kategoriya va Manzil -->
        <div class="flex flex-wrap gap-4">
          <div class="flex-1">
            <label class="block text-gray-700 dark:text-gray-300 mb-1 text-sm"
              >Kategoriya:</label
            >
            <select
              v-model="productData.category"
              class="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-sm"
              required
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
          <div class="flex-1">
            <label class="block text-gray-700 dark:text-gray-300 mb-1 text-sm"
              >Manzil:</label
            >
            <input
              v-model="productData.location"
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-sm"
              required
            />
          </div>
        </div>

        <!-- Tugmalar -->
        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="handleClose"
            class="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white px-3 py-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 text-sm"
          >
            Bekor qilish
          </button>
          <button
            type="submit"
            class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm"
          >
            Saqlash
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
import api from "@/api";
import { useToast } from "vue-toastification";

const toast = useToast();
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
const token = localStorage.getItem("token");

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    productData.value.photo = file;
    productData.value.img = URL.createObjectURL(file);
  }
};

const handleSubmit = async () => {
  try {
    const formData = new FormData();
    Object.entries(productData.value).forEach(([key, value]) => {
      if (key === "photo" && value) {
        formData.append("photo", value);
      } else if (key !== "img") {
        formData.append(key, value);
      }
    });

    await api.post("/product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Mahsulot yaratildi");

    resetForm();
    handleClose(); // Modalni yopish uchun handleClose funksiyasidan foydalaning
    emit("create");
  } catch (err) {
    toast.error("Xatolik!");
    console.error(
      "API xatosi:",
      err.response ? err.response.data : err.message
    );
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
  props.close(); // Modalni yopish uchun ota-onaning komponentiga xabar bering
};

onMounted(async () => {
  try {
    const res = await api.get("/category", {
      headers: { Authorization: `Bearer ${token}` },
    });
    categories.value = res.data;
  } catch (err) {
    console.error("Kategoriya olishda xatolik:", err);
  }
});
</script>
