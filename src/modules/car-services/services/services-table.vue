<script setup lang="ts">
import { ref, watch } from 'vue';
import { db } from '../../../services/firebase.config';
// import { services } from '../../../utils/mocked.data';
import { Service } from '../models';
import addServiceDialog from './add-service-dialog.vue';

const headers = [
  { title: "Nazwa", key: "name" },
  { title: "Cena", key: "price" },
  { title: "Opis", key: "description" },
  { title: "Wykonana", key: "done" },
];
import { collection, doc, onSnapshot } from "firebase/firestore";
const services = ref<Service[]>([])

const unsub = onSnapshot(collection(db, "services"), (doc) => {
    services.value = doc.docs.map((doc) => { return {...doc.data(), id: doc.id} as Service } );
});

watch(services, () => {
  console.log("documentsArray.value outside snapshot", services.value);
},{deep:true})
</script>

<template>
  <div class="flex flex-col gap-4 p-2 w-full">
    <div class="flex justify-between w-full">
      <h2 class="font-bold text-lg">Dostępne usługi</h2>
      <add-service-dialog/>
    </div>

    <v-data-table :items="services" :headers="headers" </v-data-table>
  </div>
</template>

<style scoped></style>
