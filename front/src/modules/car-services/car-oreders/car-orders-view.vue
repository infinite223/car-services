<script setup lang="ts">
import { ref, watch } from 'vue';
import { db } from '../../../services/firebase.config';
import { collectionGroup, onSnapshot } from "firebase/firestore";
import { Service } from '../models';
import AddServiceDialog from '../services/add-service-dialog.vue';

const headers = [
  { title: "Nazwa", key: "name" },
  { title: "Opis", key: "description" },
  { title: "Cena", key: "price" },
  { title: "Wykonana", key: "done" },
];

const services = ref<Service[]>([])

onSnapshot(collectionGroup(db, "car-orders"), (doc) => {
    services.value = doc.docs.map((doc) => { return {...doc.data(), id: doc.id} as Service } );
});

watch(services, () => {
  console.log("documentsArray.value outside snapshot", services.value);
},{deep:true})
</script>

<template>
  <div class="flex flex-col gap-4 p-2 w-full">
    <div class="flex justify-between w-full">
      <h2 class="font-bold text-lg">Zlecenia</h2>
      <add-service-dialog/>
    </div>

    <v-data-table :items="services" :headers="headers" </v-data-table>
  </div>
</template>

<style scoped></style>
