<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <!-- Client Details -->
      <div class="border-b border-gray-300 dark:border-gray-700 pb-4 mb-4">
        <h2
          class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4"
        >
          Mijoz ma'lumotlari
        </h2>
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex flex-col gap-1">
            <p class="text-gray-600 dark:text-gray-400">Ism:</p>
            <p class="text-lg font-medium text-gray-800 dark:text-gray-200">
              {{ contract.client.fname }}
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-gray-600 dark:text-gray-400">Telefon raqami:</p>
            <p class="text-lg font-medium text-gray-800 dark:text-gray-200">
              {{ contract.client.phone_number }}
            </p>
          </div>
        </div>
      </div>

      <!-- Vendor Details -->
      <div class="border-b border-gray-300 dark:border-gray-700 pb-4 mb-4">
        <h2
          class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4"
        >
          Sotuvchi ma'lumotlari
        </h2>
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex flex-col gap-1">
            <p class="text-gray-600 dark:text-gray-400">Ism:</p>
            <p class="text-lg font-medium text-gray-800 dark:text-gray-200">
              {{ contract.vendor.fname }}
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-gray-600 dark:text-gray-400">Foydalanuvchi nomi:</p>
            <p class="text-lg font-medium text-gray-800 dark:text-gray-200">
              {{ contract.vendor.username }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Toggle Button for Products -->
    <button
      @click="toggleProducts"
      class="bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-4 py-2 rounded-lg mb-4 flex items-center"
    >
      <i v-if="showProducts" class="fi fi-sr-caret-up mt-1"></i>
      <i v-else class="fi fi-br-caret-down mt-1"></i>
      Mahsulotlar
    </button>

    <!-- Products Section -->
    <div
      v-if="showProducts"
      class="border-b border-gray-300 dark:border-gray-700 pb-4 mb-4"
    >
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Mahsulotlar
      </h2>
      <div
        v-for="product in contract.product"
        :key="product._id"
        class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4"
      >
        <div class="flex flex-col sm:flex-row items-center gap-4">
          <img
            :src="product.img"
            alt="Product Image"
            class="w-24 h-24 object-cover rounded-lg shadow-md mb-4 sm:mb-0"
          />
          <div class="flex flex-col">
            <p class="text-lg font-medium text-gray-800 dark:text-gray-200">
              {{ product.marka }}
            </p>
            <p class="text-gray-600 dark:text-gray-400">
              Narxi:
              <span class="font-semibold">{{ product.price }} UZS</span>
            </p>
            <p class="text-gray-600 dark:text-gray-400">
              KWT: {{ product.kwt }}
            </p>
            <p class="text-gray-600 dark:text-gray-400">
              Turnover: {{ product.turnover }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Summary Section -->
    <div class="text-gray-900 dark:text-gray-100">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex flex-col gap-1">
          <p class="text-gray-600 dark:text-gray-400">Chegirma:</p>
          <p class="text-lg font-medium">{{ contract.discount }}%</p>
        </div>
        <div class="flex flex-col gap-1">
          <p class="text-gray-600 dark:text-gray-400">Jami narx:</p>
          <p class="text-lg font-medium">{{ contract.price }} UZS</p>
        </div>
        <div class="flex flex-col gap-1">
          <p class="text-gray-600 dark:text-gray-400">To'lov turi:</p>
          <p class="text-lg font-medium capitalize">{{ contract.paytype }}</p>
        </div>
        <div class="flex flex-col gap-1">
          <p class="text-gray-600 dark:text-gray-400">Yaratilgan sana:</p>
          <p class="text-lg font-medium">
            {{ new Date(contract.createAt).toLocaleDateString() }}
          </p>
        </div>
      </div>
    </div>

    <!-- Update and Delete Buttons -->
    <div class="flex gap-4 mt-6">
      <button
        @click="updateContract"
        class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
      >
        <i class="fi fi-sr-file-edit"></i>
      </button>
      <button
        @click="deleteContract"
        class="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-300"
      >
        <i class="fi fi-sr-trash"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  contract: Object,
});

const showProducts = ref(false);

const toggleProducts = () => {
  showProducts.value = !showProducts.value;
};

const updateContract = () => {
  // Logic for updating a contract
  console.log("Update contract");
};

const deleteContract = () => {
  // Logic for deleting a contract
  console.log("Delete contract");
};
</script>

<style scoped>
/* TailwindCSS handles the main styling */
</style>
