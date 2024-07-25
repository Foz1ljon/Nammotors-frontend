<template>
  <div
    v-if="showEditCategoryModal"
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
  >
    <div
      class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg transform transition-transform scale-90"
    >
      <h2 class="text-xl mb-4 dark:text-white">Kategoriyani Tahrirlash</h2>
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
          @click="closeModal"
          class="bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition"
        >
          Bekor Qilish
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, defineEmits } from "vue";

const props = defineProps({
  showEditCategoryModal: Boolean,
});

const emit = defineEmits(["update:showEditCategoryModal"]);

const editCategoryData = reactive({
  name: "test",
});



const closeModal = () => {
  emit("update:showEditCategoryModal", false);
};
</script>
