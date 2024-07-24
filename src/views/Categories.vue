<template>
  <div
    :class="{ dark: isDarkMode }"
    class="min-h-screen bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
  >
    <div class="my-6 p-4">
      <h1 class="md:text-4xl text-3xl font-semibold mb-6 ">
        Kategoriyalar Ro'yxati
      </h1>

      <!-- Search Input and Create Category Button -->
      <div class="flex items-center gap-2 mb-4">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Kategoriyalarni Qidirish"
          class="border dark:border-gray-600 p-2 w-full sm:w-auto flex-grow rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white"
        />
        <button
          @click="showCreateModal = true"
          class="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition"
        >
          <i class="fi fi-rr-multiple"></i>
        </button>
      </div>

      <!-- Categories Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(category, index) in filteredCategories"
          :key="index"
          class="bg-white dark:bg-gray-700 p-4 rounded-lg shadow transition-transform transform hover:scale-105"
        >
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-900 dark:text-white">{{
              category.name
            }}</span>
            <div>
              <button
                @click="openEditModal(index)"
                class="text-yellow-500 hover:text-yellow-700 dark:hover:text-yellow-400 mr-2"
              >
                <i class="fi fi-sr-pencil"></i>
              </button>
              <button
                @click="deleteCategory(index)"
                class="text-red-500 hover:text-red-700 dark:hover:text-red-400"
              >
                <i class="fi fi-sr-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Create Category Modal -->
      <transition name="fade">
        <div
          v-if="showCreateModal"
          class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
        >
          <div
            class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg transform transition-transform scale-90"
          >
            <h2 class="text-xl mb-4 dark:text-white">Kategoriya Yaratish</h2>
            <input
              v-model="newCategory.name"
              type="text"
              placeholder="Kategoriya Nomi"
              class="border dark:border-gray-600 p-2 mb-4 w-full rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white"
            />
            <div class="flex justify-end gap-2">
              <button
                @click="createCategory"
                class="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition"
              >
                Yaratish
              </button>
              <button
                @click="showCreateModal = false"
                class="bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition"
              >
                Bekor Qilish
              </button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Edit Category Modal -->
      <transition name="fade">
        <div
          v-if="showEditCategoryModal"
          class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
        >
          <div
            class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg transform transition-transform scale-90"
          >
            <h2 class="text-xl mb-4 dark:text-white">
              Kategoriyani Tahrirlash
            </h2>
            <input
              v-model="editCategoryData.name"
              type="text"
              placeholder="Kategoriya Nomi"
              class="border dark:border-gray-600 p-2 mb-4 w-full rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white"
            />
            <div class="flex justify-end gap-2">
              <button
                @click="updateCategory"
                class="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition"
              >
                Yangilash
              </button>
              <button
                @click="showEditCategoryModal = false"
                class="bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition"
              >
                Bekor Qilish
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch } from "vue";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

const toast = useToast();

const categories = ref([
  { name: "Elektronika" },
  { name: "Kitoblar" },
  { name: "Kiyim-kechak" },
  { name: "Uy va Oshxona" },
  { name: "Sport" },
]);

const showCreateModal = ref(false);
const showEditCategoryModal = ref(false);
const newCategory = ref({ name: "" });
const editCategoryData = ref({ name: "" });
const searchTerm = ref("");
const isDarkMode = ref(localStorage.getItem("darkMode") === "true");
let editCategoryIndex = null;

watch(isDarkMode, (newVal) => {
  if (newVal) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("darkMode", "true");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", "false");
  }
});

const createCategory = () => {
  if (newCategory.value.name.trim()) {
    categories.value.push({ ...newCategory.value });
    newCategory.value.name = "";
    showCreateModal.value = false;
    toast.success("Kategoriya muvaffaqiyatli yaratildi!");
  } else {
    toast.error("Kategoriya nomi bo'sh bo'lishi mumkin emas!");
  }
};

const openEditModal = (index) => {
  editCategoryIndex = index;
  editCategoryData.value = { ...categories.value[index] };
  showEditCategoryModal.value = true;
};

const updateCategory = () => {
  if (editCategoryData.value.name.trim() && editCategoryIndex !== null) {
    categories.value[editCategoryIndex].name = editCategoryData.value.name;
    showEditCategoryModal.value = false;
    toast.success("Kategoriya muvaffaqiyatli yangilandi!");
  } else {
    toast.error("Kategoriya nomi bo'sh bo'lishi mumkin emas!");
  }
};

const deleteCategory = (index) => {
  categories.value.splice(index, 1);
  toast.success("Kategoriya muvaffaqiyatli o'chirildi!");
};

const filteredCategories = computed(() => {
  const term = searchTerm.value.trim().toLowerCase();
  return categories.value.filter((category) =>
    category.name.toLowerCase().includes(term)
  );
});
</script>
