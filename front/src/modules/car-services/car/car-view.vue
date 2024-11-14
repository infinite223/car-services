<script setup lang="ts">
import { defineProps, ref } from "vue";
import { Car, CarService } from "../models";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../services/firebase.config";

const props = defineProps<{
  id: string;
}>();

const car = ref<Car | null>(null);

async function getServicesForCar(carId: string): Promise<CarService[]> {
  const servicesRef = collection(db, `cars/${carId}/car-services`);
  const servicesSnapshot = await getDocs(servicesRef);
  const services: CarService[] = servicesSnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id } as CarService;
  });
  return services;
}

async function getCarWithServices() {
  const carRef = doc(db, "cars", props.id);
  const carDoc = await getDoc(carRef);
  const carData = carDoc.data() as Car;
  const services = await getServicesForCar(props.id);

  car.value = { ...carData, services, id: props.id };
}

getCarWithServices();
</script>

<template>
    <main class="flex flex-col w-full h-full">
        <nav class="flex w-full h-[200px] relative items-center justify-center flex-col bg-zinc-50">
        <h1 class="flex text-5xl font-extrabold">
            {{car.model.toUpperCase()}}
        </h1>
        <h1 class="flex text-2xl">
            {{car.make}}
        </h1>

        <span class="absolute right-2 top-1 opacity-55 text-xs font-thin">
            ID: {{car.id}}
        </span>
    </nav>

    <div>
        <!-- inprogress -->
        <div v-for="service in car.services">
            {{service.name}}
        </div>
    </div>
    </main>
</template>
