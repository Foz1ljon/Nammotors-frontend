<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm dark:bg-gray-900"
  >
    <div
      class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full dark:bg-gray-800"
    >
      <header class="border-b pb-4 mb-4 dark:border-gray-700">
        <slot name="header"></slot>
      </header>
      <main>
        <slot name="body"></slot>
      </main>
      <footer class="flex justify-end border-t pt-4 mt-4 dark:border-gray-700">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(5px);
}
</style>
