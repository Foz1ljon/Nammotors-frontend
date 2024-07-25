<template>
  <div
    class="bg-white dark:bg-gray-700 p-4 rounded-lg shadow transition-transform transform hover:scale-105"
  >
    <div class="flex justify-between items-center">
      <span class="text-sm text-gray-900 dark:text-white">
        {{ category.name }}
      </span>
      <div>
        <button
          @click="onEdit(category._id)"
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
import { defineProps } from "vue";

const props = defineProps({
  category: Object,
});

const onEdit = (index) => {
  alert(index);
};

const onDelete = (index) => {
  alert(index);
};
</script>

<style scoped></style>
