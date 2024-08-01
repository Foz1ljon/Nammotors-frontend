<template>
  <!-- Mahsulot Tafsilotlari -->
  <div
    class="relative flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
    @click="openModal"
  >
    <img
      :src="data.img"
      alt="Mahsulot Rasmi"
      class="w-32 h-32 object-cover rounded-lg shadow-sm"
    />
    <div class="mt-3 text-center">
      <p class="text-gray-900 dark:text-gray-100 text-xl font-semibold">
        {{ data.kwt }} KWt
      </p>
      <p class="text-gray-700 dark:text-gray-300 text-sm mt-1">
        {{ data.turnover }} Turnover
      </p>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      @click="closeModal"
    >
      <div
        class="bg-white dark:bg-gray-900 p-6 rounded-lg relative shadow-lg flex flex-col justify-center items-center max-w-md w-full"
        @click.stop
      >
        <img
          :src="data.img"
          alt="Mahsulot Rasmi"
          class="w-64 h-64 object-cover rounded-lg"
        />
        <button
          class="absolute top-4 right-4 bg-gray-100 dark:bg-gray-700 dark:text-white text-black p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          @click="closeModal"
        >
          &times;
        </button>
        <div class="mt-5 flex flex-col gap-2">
          <h4 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Mahsulot Tafsilotlari
          </h4>
          <p class="text-gray-900 dark:text-gray-300">
            Brendi: <span class="font-semibold">{{ data.marka }}</span>
          </p>
          <p class="text-gray-900 dark:text-gray-300">
            Narxi: <span class="font-medium">{{ data.price }} UZS</span>
          </p>
          <p class="text-gray-900 dark:text-gray-300">
            Manzil: <span class="font-medium">{{ data.location }}</span>
          </p>
          <p class="text-gray-900 dark:text-gray-300">
            Miqdori: <span class="font-medium">{{ data.count }}</span>
          </p>
          <p class="text-gray-900 dark:text-gray-300">
            Turnover: <span class="font-medium">{{ data.turnover }}</span>
          </p>
          <p class="text-gray-900 dark:text-gray-300">
            KWt: <span class="font-medium">{{ data.kwt }} KWt</span>
          </p>
        </div>
        <!-- Harakat Tugmalari -->
        <div class="mt-6 flex gap-4">
          <button
            @click="addToCart"
            class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center"
          >
            <i class="fi fi-br-shopping-cart-add mr-2"></i>
          </button>
          <button
            @click="editItem(data._id)"
            class="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 flex items-center"
          >
            <i class="fi fi-rr-user-pen mr-2"></i>
          </button>
          <button
            @click="deleteItem(data._id)"
            class="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center"
          >
            <i class="fi fi-br-trash mr-2"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/store/productStore";
import { useCartStore } from "@/store/cartStore";

const productStore = useProductStore();
const cartStore = useCartStore();
const router = useRouter();
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
