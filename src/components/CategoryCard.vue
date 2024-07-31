<template>
  <div
    class="bg-white dark:bg-gray-700 p-4 z-0 rounded-lg shadow transition-transform transform hover:scale-105 relative"
  >
    <div class="flex justify-between items-center">
      <span v-if="!isEditing" class="text-sm text-gray-900 dark:text-white">
        {{ category.name }}
      </span>
      <!-- Edit Category -->
      <div v-if="isEditing">
        <form @submit.prevent="updateCategory(category._id, currentCategory)">
          <div class="mb-4 w-full">
            <label class="block text-gray-700 dark:text-gray-300 mb-2">
              Kategoriya Nomi:
            </label>
            <input
              v-model="currentCategory.name"
              type="text"
              class="w-[60%] px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              required
            />
            <button
              type="submit"
              class="bg-blue-500 w-[15%] text-white px-3 py-2 rounded-md"
            >
              <i class="fi fi-sr-disk"></i>
            </button>
            <button
              type="button"
              @click="isEditing = false"
              class="bg-gray-200 w-[15%] dark:bg-gray-600 text-gray-700 dark:text-white px-3 py-2 rounded-md"
            >
              <i class="fi fi-rr-document-circle-wrong"></i>
            </button>
          </div>
        </form>
      </div>

      <div v-if="!isEditing" class="flex items-center">
        <button
          @click="isEditing = true"
          class="text-yellow-500 hover:text-yellow-700 dark:hover:text-yellow-400 mr-2"
        >
          <i class="fi fi-rr-file-edit"></i>
        </button>
        <button
          @click="onDelete(category._id)"
          class="text-red-500 hover:text-red-700 dark:hover:text-red-400"
        >
          <i class="fi fi-br-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCategoyStore } from "../store/categoryStore";

const categoryStore = useCategoyStore();

const props = defineProps({
  category: Object,
});

const isEditing = ref(false);
const currentCategory = ref({ ...props.category });

const updateCategory = (id, data) => {
  categoryStore.updateCategory(id, data);
  isEditing.value = false;
};

const onDelete = (id) => {
  categoryStore.deleteCategory(id);
};
</script>
