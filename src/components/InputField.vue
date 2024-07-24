<template>
  <div class="mb-4">
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{
      label
    }}</label>
    <input
      :value="modelValue"
      @input="updateValue($event.target.value)"
      :type="type"
      :placeholder="placeholder"
      class="border p-2 w-full bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
      :required="required"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  type: {
    type: String,
    default: "text",
  },
  required: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

function updateValue(value) {
  emit("update:modelValue", value);
}
</script>

<style scoped>
/* Scoped styles are not needed when using Tailwind CSS for dark mode */
</style>
