<template>
  <!-- Product Details -->
  <div
    class="relative flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
    @click="openModal"
  >
    <img
      :src="data.img"
      alt="Item Image"
      class="w-32 h-32 object-cover rounded-md shadow-sm"
    />
    <div class="mt-2 text-center">
      <p class="text-gray-800 dark:text-gray-200 text-lg font-semibold">
        {{ data.kwt }} KWt
      </p>
      <p class="text-gray-600 dark:text-gray-400 text-sm">
        {{ data.turnover }} Turnover
      </p>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      @click="closeModal"
    >
      <div
        class="bg-white dark:bg-gray-900 p-6 rounded-lg relative shadow-lg flex flex-col justify-center items-center max-w-sm w-full"
        @click.stop
      >
        <img
          :src="data.img"
          alt="Item Image"
          class="w-64 h-64 object-cover rounded-md"
        />
        <button
          class="absolute top-4 right-4 bg-white dark:bg-gray-700 dark:text-white text-black p-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          @click="closeModal"
        >
          &times;
        </button>
        <div class="mt-4">
          <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Mahsulot Tafsilotlari
          </h4>
          <p class="text-gray-800 dark:text-gray-300 mt-2">
            Markasi: <span class="font-medium">{{ data.marka }}</span>
          </p>
          <p class="text-gray-800 dark:text-gray-300">
            Narxi: <span class="font-medium">{{ data.price }} UZS</span>
          </p>
          <p class="text-gray-800 dark:text-gray-300">
            Manzil: <span class="font-medium">{{ data.location }}</span>
          </p>
          <p class="text-gray-800 dark:text-gray-300">
            Miqdori: <span class="font-medium">{{ data.count }}</span>
          </p>
          <p class="text-gray-800 dark:text-gray-300">
            Turnover: <span class="font-medium">{{ data.turnover }}</span>
          </p>
          <p class="text-gray-800 dark:text-gray-300">
            KWt: <span class="font-medium">{{ data.kwt }}</span>
          </p>
        </div>
        <!-- Action Buttons -->
        <div class="mt-6 flex justify-end space-x-2">
          <button
            @click="addToCart"
            class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Savatga qo'shish
          </button>
          <button
            @click="editItem(data._id)"
            class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Tahrirlash
          </button>
          <button
            @click="deleteItem(data._id)"
            class="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            O'chirish
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { useProductStore } from "@/store/productStore";
import { useCartStore } from "@/store/cartStore";

const productStore = useProductStore();
const cartStore = useCartStore();
const router = useRouter();
const toast = useToast();
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const showModal = ref(false);

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const addToCart = () => {
  cartStore.addToCart(props.data);
};

const editItem = (id) => {
  router.push(`products/${id}`);
};

const deleteItem = async (id) => {
  await productStore.deleteProduct(id);
};
</script>

<style scoped>
/* Tailwind handles all the styling, no additional styles needed */
</style>
