<script setup lang="ts">
import { ServiceDto } from "../models";

const services: ServiceDto[] = [
  {
    id: "1",
    name: "Wymiana oleju",
    price: 120,
    description: "",
    done: false,
  },
  {
    id: "2",
    name: "Wymiana rozrządu",
    price: 600,
    description: "Wymiana całego kąpletnego rozrządu",
    done: false,
  },
  {
    id: "3",
    name: "Zmiana opeon",
    price: 70,
    description: "",
    done: false,
  },
  {
    id: "4",
    name: "Podstawowa diagnostyka",
    price: 200,
    description: "",
    done: false,
  },
];
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
      <v-btn color="rgb(249 115 22)" height="30" prepend-icon="mdi-plus">
        <v-icon icon="mdi-plus"></v-icon>

        <spna class="text-white text-xs">Dodaj</spna>
      </v-btn>
    </div>
    <v-icon icon="mdi-home" color="white"/>

    <v-data-table theme="dark" :items="services" :headers="headers" </v-data-table>
  </div>
</template>

<style scoped></style>
