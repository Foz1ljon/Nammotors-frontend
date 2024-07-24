<template>
  <div class="mb-4">
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{
      label
    }}</label>
    <select
      :value="modelValue"
      @change="updateValue($event.target.value)"
      class="border p-2 w-full bg-white dark:bg-gray-800 text-black dark:text-white"
      :required="required"
    >
      <option value="" disabled>Select {{ label.toLowerCase() }}</option>
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: String,
  label: String,
  options: Array,
  required: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

function updateValue(value) {
  emit("update:modelValue", value);
}
</script>

<style scoped>
/* Optional: Add custom styles if needed */
</style>
