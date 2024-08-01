<template>
  <div>Update Product {{ id }}</div>
</template>

<script setup>
import { useRoute } from "vue-router";

const id = useRoute().params.id;
</script>
