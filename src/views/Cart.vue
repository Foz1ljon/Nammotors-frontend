<template>
  <div class="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
      Korzinka
    </h1>
    <div v-if="cartItems.length" class="mb-6">
      <div
        v-for="item in cartItems"
        :key="item._id"
        class="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm mb-4"
      >
        <div class="flex items-center">
          <img
            :src="item.img"
            alt="Item Image"
            class="w-16 h-16 object-cover rounded-md mr-4"
          />
          <div>
            <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {{ item.name }}
            </h2>
            <p class="text-gray-600 dark:text-gray-400">{{ item.price }} UZS</p>
            <p class="text-gray-600 dark:text-gray-400">
              Miqdori: {{ item.quantity }}
            </p>
          </div>
        </div>
        <button
          @click="decreaseQuantity(item._id)"
          class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors dark:bg-red-400 dark:hover:bg-red-500"
        >
          O'chirish
        </button>
      </div>
    </div>
    <div v-else class="text-center text-gray-600 dark:text-gray-400">
      Korzinka bo'sh.
    </div>
    <div class="flex justify-between mt-6">
      <p class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Umumiy mahsulotlar soni: {{ totalItems }}
      </p>
      <button
        class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors dark:bg-blue-400 dark:hover:bg-blue-500"
        @click="proceedToCheckout"
      >
        To'lovga O'tish
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "vue-router";

const cartStore = useCartStore();
const router = useRouter();

const cartItems = computed(() => cartStore.cart);
const totalItems = computed(() => cartStore.getTotalItems());

const decreaseQuantity = (productId) => {
  const product = cartStore.cart.find((item) => item._id === productId);
  if (product) {
    if (product.quantity > 1) {
      // Agar miqdor 1 dan katta bo'lsa, miqdorni kamaytir
      cartStore.updateQuantity(productId, product.quantity - 1);
    } else {
      // Agar miqdor 1 ga teng bo'lsa, mahsulotni o'chir
      cartStore.removeFromCart(productId);
    }
  } else {
    console.error("Product not found in cart.");
  }
};

const proceedToCheckout = () => {
  router.push("/checkout"); // To'lov sahifasiga yo'naltir
};
</script>

<style scoped>
/* Custom styles if needed */
</style>
