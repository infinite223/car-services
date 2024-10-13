<script setup lang="ts">
import { ref, watch } from "vue";
import { db } from "../../../services/firebase.config";
import { collection, onSnapshot } from "firebase/firestore";
import { Service } from "../models";
import addServiceDialog from "./add-service-dialog.vue";

const headers = [
  { title: "Nazwa", key: "name" },
  { title: "Opis", key: "description" },
  { title: "Cena", key: "price" },
];

const isLoading = ref(true); 
const services = ref<Service[]>([]);

onSnapshot(collection(db, "services"), (snapshot) => {
  isLoading.value = true;
  services.value = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id } as Service;
  });
  isLoading.value = false;
});

watch(
  services,
  () => {
    console.log("documentsArray.value outside snapshot", services.value);
  },
  { deep: true }
);
</script>


<template>
  <div class="flex flex-col gap-4 p-2 w-full">
    <div class="flex justify-between w-full">
      <h2 class="font-bold text-lg">Dostępne usługi</h2>
      <add-service-dialog/>
    </div>

    <v-data-table :loading="isLoading" :items="services" :headers="headers" </v-data-table>
  </div>
</template>

<style scoped></style>
