<script setup lang="ts">
import { services } from '../../../utils/mocked.data';

const headers = [
  { title: "Id", key: "id" },
  { title: "Nazwa", key: "name" },
  { title: "Cena", key: "price" },
  { title: "Opis", key: "description" },
  { title: "Wykonana", key: "done" },
];
</script>

<template>
  <div class="flex flex-col gap-4 p-2 w-full">
    <div class="flex justify-between w-full">
      <h2 class="font-bold text-lg">Dostępne usługi</h2>
      <v-btn color="rgb(249 115 22)" height="30">
        <v-icon icon="mdi-plus" color="white" class="mr-2"/>

        <spna class="text-white text-xs">Dodaj</spna>
      </v-btn>
    </div>

    <v-data-table :items="services" :headers="headers" </v-data-table>
  </div>
</template>

<style scoped></style>
