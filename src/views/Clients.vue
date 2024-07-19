<template>
  <div class="my-6">
    <h1 class="text-2xl text-black font-semibold">Mijozlar</h1>

    <div class="flex flex-col my-2">
      <div
        class="w-full flex justify-between items-center h-[12vh] bg-slate-50 shadow-md p-3"
      >
        <p class="text-2xl font-medium p-2" v-for="(item, i) in menu" :key="i">
          {{ item }}
        </p>
      </div>
    </div>
    
  </div>
</template>

<script setup>
const menu = ["Ismi", "Telefon raqami", "Kompaniyasi", "Turi", "Taklif qilgan"];

const clients = [
  {
    fname: "Shokirjon",
    phone_number: "+998902234567",
    firma: "Abc Group",
    type: "b2b",
    location: "Toshkent, chilonzor 8, 55-uy",
    admin: "Sobirjon",
  },
  {
    fname: "Shokirjon",
    phone_number: "+998902234567",
    firma: "Abc Group",
    type: "b2b",
    location: "Toshkent, chilonzor 8, 55-uy",
    admin: "Sobirjon",
  },
  {
    fname: "Shokirjon",
    phone_number: "+998902234567",
    firma: "Abc Group",
    type: "b2b",
    location: "Toshkent, chilonzor 8, 55-uy",
    admin: "Sobirjon",
  },
  {
    fname: "Shokirjon",
    phone_number: "+998902234567",
    firma: "Abc Group",
    type: "b2b",
    location: "Toshkent, chilonzor 8, 55-uy",
    admin: "Sobirjon",
  },
  {
    fname: "Shokirjon",
    phone_number: "+998902234567",
    firma: "Abc Group",
    type: "b2b",
    location: "Toshkent, chilonzor 8, 55-uy",
    admin: "Sobirjon",
  },
];
</script>
