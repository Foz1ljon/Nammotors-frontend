<!-- Create Client Modal -->
<Modal v-if="showCreateModal" @close="showCreateModal = false" class="z-50">
  <template #header>
    <h2 class="text-xl md:text-2xl font-semibold text-black dark:text-white">
      Mijoz yaratish
    </h2>
  </template>
  <template #body>
    <form @submit.prevent="createClient">
      <InputField
        v-model="newClient.fname"
        label="Ism"
        placeholder="Mijoz ismi"
      />
      <InputField
        v-model="newClient.phone_number"
        label="Telefon raqami"
        placeholder="Telefon raqami"
      />
      <SelectField
        v-model="newClient.type"
        label="Turi"
        :options="clientTypes"
      />
      <InputField
        v-model="newClient.admin"
        label="Taklif qilgan"
        placeholder="Admin ismi"
      />
    </form>
  </template>
  <template #footer>
    <button
      type="submit"
      class="bg-gray-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg mr-2 flex items-center gap-2"
      @click="createClient"
    >
      <i class="fi fi-ss-disk text-base md:text-lg"></i>
      <span>Saqlash</span>
    </button>
    <button
      @click="showCreateModal = false"
      class="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-3 py-2 md:px-4 md:py-2 rounded-lg flex items-center gap-2"
    >
      <i class="fi fi-rr-delete-document text-base md:text-lg"></i>
      <span>Bekor qilish</span>
    </button>
  </template>
</Modal>

<!-- Edit Client Modal -->
<Modal v-if="showEditModal" @close="showEditModal = false" class="z-50">
  <template #header>
    <h2 class="text-xl md:text-2xl font-semibold text-black dark:text-white">
      Mijozni tahrirlash
    </h2>
  </template>
  <template #body>
    <form @submit.prevent="saveEdit">
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
        v-model="editClient.admin"
        label="Taklif qilgan"
        placeholder="Admin ismi"
      />
    </form>
  </template>
  <template #footer>
    <button
      type="submit"
      class="bg-gray-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg mr-2 flex items-center gap-2"
      @click="saveEdit"
    >
      <i class="fi fi-ss-disk text-base md:text-lg"></i>
      <span>Saqlash</span>
    </button>
    <button
      @click="showEditModal = false"
      class="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-3 py-2 md:px-4 md:py-2 rounded-lg flex items-center gap-2"
    >
      <i class="fi fi-rr-delete-document text-base md:text-lg"></i>
      <span>Bekor qilish</span>
    </button>
  </template>
</Modal>
