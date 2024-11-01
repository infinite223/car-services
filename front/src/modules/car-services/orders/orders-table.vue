<script setup lang="ts">
import { ref } from "vue";
import { orders } from "../../../utils/mocked.data";
import addOrderDialog from "./add-order-dialog.vue";
const isLoading = ref(false);

const headers = [
  { title: "Id", key: "id" },
  { title: "Nazwa", key: "name" },
  { title: "Cena", key: "price" },
  { title: "Opis", key: "description" },
  { title: "Odebrane", key: "done" },
];
</script>

<template>
  <div class="flex flex-col gap-4 p-2 w-full">
    <div class="flex justify-between w-full">
      <h2 class="font-semibold text-lg">Aktualne zamówienia</h2>

      <add-order-dialog />
    </div>

    <v-data-table
      :loading="isLoading"
      class="overflow-auto"
      :items="orders"
      :headers="headers"
    />
  </div>
</template>

<style scoped></style>
