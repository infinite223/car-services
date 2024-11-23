<script setup lang="ts">
import { ref, watch } from "vue";
import { db } from "../../../services/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { Car, CarService } from "../models";
import carCard from "./car/car-card/car-card.vue";
import AddCarDialog from "./add-car-dialog.vue";
import { RouterView } from "vue-router";
import { useToast } from "vue-toast-notification";

const cars = ref<Car[]>([]);
const toast = useToast();

async function getServicesForCar(carId: string): Promise<CarService[]> {
  const servicesRef = collection(db, `cars/${carId}/car-services`);
  const servicesSnapshot = await getDocs(servicesRef);
  const services: CarService[] = servicesSnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id } as CarService;
  });
  return services;
}

async function getCarsWithServices() {
  try {
    const carsRef = collection(db, "cars");
    const carSnapshot = await getDocs(carsRef);

    const carsData: Car[] = await Promise.all(
      carSnapshot.docs.map(async (doc) => {
        const carData = doc.data() as Car;
        const services = await getServicesForCar(doc.id);
        return { ...carData, services, id: doc.id };
      })
    );

    cars.value = carsData;
  } catch (error: any) {
    toast.error(
      `Nieoczekiwany błąd podczas pobierania samochodów: ${error.message}`
    );
  }
}

getCarsWithServices();
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <v-container>
      <RouterView />
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
