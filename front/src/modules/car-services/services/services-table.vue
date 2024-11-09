<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { db } from "../../../services/firebase.config";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { Service } from "../models";
import addServiceDialog from "./add-service-dialog.vue";
import editServiceDialog from "./edit-service-dialog.vue";
import confirmDialog from "../../core/components/confirm-dialog.vue";

const headers = [
  { title: "Nazwa", key: "name" },
  { title: "Opis", key: "description" },
  { title: "Cena", key: "price" },
];

const showConfirmDialog = ref(false);
const isLoading = ref(true);
const services = ref<Service[]>([]);
const selectedServicesIds = ref<string[]>([]);

onSnapshot(collection(db, "services"), (snapshot) => {
  isLoading.value = true;
  services.value = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id } as Service;
  });
  isLoading.value = false;
});

const removeServices = async () => {
  selectedServicesIds.value.forEach(async (id) => {
    await deleteDoc(doc(db, "services", id));
  });
};

const selectedService = computed(() => {
  return services.value.find((s) => s.id === selectedServicesIds.value[0]);
});
</script>

<template>
  <div class="flex flex-col gap-4 p-2 w-full">
    <div class="flex justify-between w-full">
      <h2 class="font-bold text-lg">Dostępne stałe usługi</h2>

      <div class="flex items-center gap-2">
        <div class="flex items-center gap-2">
          <v-btn
            :disabled="isLoading || selectedServicesIds.length === 0"
            icon="mdi-trash-can-outline"
            size="30"
            height="30"
            class="text-xs"
            @click="showConfirmDialog = true"
          />
          <edit-service-dialog
            :selected-service="selectedService"
            :disabled="isLoading || selectedServicesIds.length !== 1"
          />
        </div>
        <add-service-dialog />
      </div>
    </div>

    <v-data-table
      :loading="isLoading"
      :items="services"
      :headers="headers"
      :show-select="true"
      select-strategy="all"
      v-model="selectedServicesIds"
    >
    </v-data-table>

    <confirm-dialog
      title="Potwierdź usunięcie"
      :description="
        'Czy na pewno chcesz usunąć wybrane usługi? ' +
        services.map((s) => {
          if (selectedServicesIds.find((sS) => sS === s.id)) {
            return s.name + ' ';
          }
        })
      "
      v-model:showDialog="showConfirmDialog"
      @confirm="removeServices"
    />
  </div>
</template>

<style scoped></style>
