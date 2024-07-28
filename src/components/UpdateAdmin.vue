<template>
  <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
    <h2 class="text-2xl font-semibold mb-4">Update Admin</h2>
    <form @submit.prevent="updateAdmin">
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-gray-300">Image URL</label>
        <input
          v-model="admin.image"
          type="text"
          class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-gray-300">First Name</label>
        <input
          v-model="admin.fname"
          type="text"
          class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-gray-300">Last Name</label>
        <input
          v-model="admin.lname"
          type="text"
          class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-gray-300">Username</label>
        <input
          v-model="admin.username"
          type="text"
          class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-gray-300">Password</label>
        <input
          v-model="admin.password"
          type="password"
          class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2"
          required
        />
      </div>
      <div class="flex justify-end space-x-2">
        <button
          @click="$emit('close')"
          type="button"
          class="bg-gray-400 dark:bg-gray-600 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Update
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "@/api";
import { useToast } from "vue-toastification";

const toast = useToast();
const props = defineProps({
  adminData: Object,
});
const emit = defineEmits(["close", "refresh"]);

const admin = ref({ ...props.adminData });

const updateAdmin = () => {
  api
    .put(`/admins/${admin.value.username}`, admin.value)
    .then(() => {
      toast.success("Admin updated successfully!");
      emit("close");
      emit("refresh");
    })
    .catch(() => {
      toast.error("Failed to update admin.");
    });
};
</script>
