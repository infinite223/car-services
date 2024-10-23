<script setup lang="ts">
import { ref, watch } from "vue";
import { db } from "../../../services/firebase.config";
import {
  collection,
  getDocs,
  doc,
  collectionGroup,
  getDoc,
} from "firebase/firestore";
import { Car, CarGet, CarService, CarServiceDto } from "../models";
import carCard from "./car/car-card/car-card.vue";
import AddCarDialog from "./add-car-dialog.vue";

const cars = ref<Car[]>([]);

async function getServicesForCar(carId: string): Promise<CarService[]> {
  const servicesRef = collection(db, `cars/${carId}/car-services`);
  const servicesSnapshot = await getDocs(servicesRef);
  const services: CarService[] = servicesSnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id } as CarService;
  });
  return services;
}

async function getCarsWithServices() {
  const carsRef = collection(db, "cars");
  const carSnapshot = await getDocs(carsRef);

  const carsData: CarGet[] = await Promise.all(
    carSnapshot.docs.map(async (doc) => {
      const carData = doc.data() as CarGet;
      const services = await getServicesForCar(doc.id);
      return { ...carData, services, id: doc.id };
    })
  );

  cars.value = carsData;
  console.log(cars.value, "cars");
}

getCarsWithServices();

watch(
  cars,
  () => {
    console.log("Zaktualizowane dane pojazdów:", cars.value);
  },
  { deep: true }
);
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <v-container>
      <div class="flex justify-between w-full px-4 pt-2 mb-4">
        <h2 class="font-bold text-lg">Przyjęte pojazdy</h2>

        <add-car-dialog />
      </div>

      <v-row no-gutters>
        <v-col v-for="car in cars" :key="car.id" cols="12" sm="4" xl="3">
          <car-card :car="car" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
