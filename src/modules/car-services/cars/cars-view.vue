<script setup lang="ts">
import { ref, watch } from "vue";
import { db } from "../../../services/firebase.config";
import { collectionGroup, onSnapshot } from "firebase/firestore";
import { Car } from "../models";
import CarCard from "./car-card.vue";

const cars = ref<Car[]>([]);

onSnapshot(collectionGroup(db, "cars"), (doc) => {
  cars.value = doc.docs.map((doc) => {
    return { ...doc.data(), id: doc.id } as Car;
  });
});

watch(
  cars,
  () => {
    console.log("documentsArray.value outside snapshot", cars.value);
  },
  { deep: true }
);
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="flex justify-between w-full px-4 pt-2">
      <h2 class="font-bold text-lg">Przyjęte pojazdy</h2>

      <add-order-dialog />
    </div>

    <v-container>
      <v-row no-gutters>
        <v-col v-for="car in cars" :key="car.id" cols="12" sm="4">
          <car-card :car="car" />
        </v-col>
      </v-row>
    </v-container>
    <!-- <div class="flex flex-wrap gap-2 w-full">
      <car-card v-for="car in cars" :car="car" />
    </div> -->
  </div>
  <!-- 
    - lista pojazdów 
    - możliwość przejścia do historii pojazdu 
    - dodanie zlecenia na danym pojezdzie 
    - usunięcie pojazdu 
    - wygenerowanie raportu pojazdu 
   -->
</template>
