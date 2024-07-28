<template>
  <!-- Product Details -->
  <div
    class="relative flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
    @click="openModal"
  >
    <img
      :src="data.img"
      alt="Item Image"
      class="w-32 h-32 object-cover rounded-lg shadow-sm"
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
        class="bg-white dark:bg-gray-900 p-6 rounded-lg relative shadow-lg max-w-lg w-full"
        @click.stop
      >
        <img
          :src="data.img"
          alt="Item Image"
          class="w-full h-64 object-cover rounded-lg"
        />
        <button
          class="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          @click="closeModal"
        >
          &times;
        </button>
        <div class="mt-4">
          <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Product Details
          </h4>
          <p class="text-gray-800 dark:text-gray-300 mt-2">
            Markasi: <span class="font-medium">{{ data.marka }}</span>
          </p>
          <p class="text-gray-800 dark:text-gray-300">
            Price: <span class="font-medium">{{ data.price }} UZS</span>
          </p>
          <p class="text-gray-800 dark:text-gray-300">
            Location: <span class="font-medium">{{ data.location }}</span>
          </p>
          <p class="text-gray-800 dark:text-gray-300">
            Quantity: <span class="font-medium">{{ data.count }}</span>
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
            @click="editItem(data._id)"
            class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Edit
          </button>
          <button
            @click="deleteItem"
            class="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "@/api";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["delete", "edit"]);

const showModal = ref(false);
const token = localStorage.getItem("token");
const toast = useToast();

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const editItem = (index) => {
  router.push(`products/${index}`);
};

const deleteItem = async () => {
  try {
    await api.delete(`/product/${props.data._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Product deleted successfully");
    emit("delete"); // Notify parent to refetch products
  } catch (error) {
    toast.error("Failed to delete product");
    console.error("API error:", error);
  }
};
</script>

<style scoped>
/* Tailwind handles all the styling, no additional styles needed */
</style>
