<template>
  <Modal @close="handleClose">
    <template #header>
      <h2 class="text-xl md:text-2xl font-semibold text-black dark:text-white">
        Mijozni tahrirlash
      </h2>
    </template>
    <template #body>
      <form @submit.prevent="handleSaveEdit">
        <InputField
          v-model="editClient.fname"
          label="Ism"
          placeholder="Mijoz ismi"
        />
        <InputField
          v-model="editClient.phone_number"
          label="Telefon raqami"
          placeholder="Telefon raqami"
        />
        <SelectField
          v-model="editClient.type"
          label="Turi"
          :options="clientTypes"
        />
        <InputField
          v-model="editClient.location"
          label="Mijoz manzili"
          placeholder="Manzilni kiriting"
        />
        <InputField
          v-model="editClient.firma"
          label="Firma"
          placeholder="Firma ismi"
        />
        <button
          type="submit"
          class="bg-gray-700 text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2"
        >
          <i class="fi fi-ss-disk text-lg"></i>
          <span>Saqlash</span>
        </button>
      </form>
    </template>
    <template #footer>
      <button
        @click="handleClose"
        class="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded-lg flex items-center gap-2"
      >
        <i class="fi fi-rr-delete-document text-lg"></i>
        <span>Bekor qilish</span>
      </button>
    </template>
  </Modal>
</template>

<script setup>
import { defineProps } from "vue";
import InputField from "@/components/InputField.vue";
import SelectField from "@/components/SelectField.vue";
import Modal from "@/components/Modal.vue";

const props = defineProps(["show", "editClient", "clientTypes", "saveEdit"]);
const handleClose = () => {
  props.close();
};
const handleSaveEdit = () => {
  props.saveEdit();
  handleClose();
};
</script>
