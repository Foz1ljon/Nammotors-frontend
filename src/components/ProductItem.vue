<template>
  <div
    class="xl:w-[300px] lg:w-[250px] md:w-[280px] sm:w-[240px] w-full h-[380px] rounded-md bg-slate-700 dark:bg-slate-900"
  ></div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  data: Object,
});
</script>

<style scoped>
/* Optional: You can add additional custom styles here if needed */
</style>
