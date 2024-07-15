<template>
  <div class="flex">
    <SideBar />
    <div class="sm:ml-[20%] w-[80%] container">
      <RouterView />
    </div>
    <!-- <div class="fixed w-full h-[10vh] bg-slate-500 bottom-0"></div> -->
  </div>
</template>

<script setup>
import SideBar from "../layout/SideBar.vue";
</script>
