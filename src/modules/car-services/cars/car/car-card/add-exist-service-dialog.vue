<script setup lang="ts">
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { onMounted, reactive, ref } from "vue";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { Service } from "../../../models";
import { db } from "../../../../../services/firebase.config";

const props = defineProps({
  carId: {
    required: true,
    type: String,
  },
});

const headers = [
  { title: "Nazwa", key: "name" },
  { title: "Opis", key: "description" },
  { title: "Cena", key: "price" },
];

const isLoading = ref(true);
const services = ref<Service[]>([]);
const selectedServiceId = ref<string[]>([]);
const showDialog = ref(false);

function close() {
  showDialog.value = false;
}

const submit = async () => {
  const findServiceRef = services.value.find(
    (s) => s.id === selectedServiceId.value[0]
  ).ref;
  if (!findServiceRef) {
    return;
  }

  const newcarService = {
    ref: findServiceRef,
    done: false,
    startDate: Timestamp.now(),
    executeDate: Timestamp.now(),
  };
  console.log(newcarService);
  await addDoc(
    collection(db, "cars", props.carId, "car-services"),
    newcarService
  );

  close();
};

onMounted(async () => {
  const res = await getDocs(collection(db, "services"));
  services.value = res.docs.map((doc) => {
    return { ...doc.data(), id: doc.id, ref: doc.ref } as Service;
  });
  isLoading.value = false;
});
</script>

<template>
  <v-dialog max-width="500" v-model="showDialog">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" height="30" variant="elevated" class="px-4"
        ><span class="text-xs">Wybierz istniejącą</span></v-btn
      >
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <template #title>
          <h2 class="font-semibold text-xl">Dodaj istniejącą usługe</h2>
        </template>
        <v-card-text>
          <v-data-table
            :hide-default-footer="true"
            :loading="isLoading"
            :items="services"
            :headers="headers"
            :show-select="true"
            select-strategy="single"
            v-model="selectedServiceId"
          ></v-data-table>
        </v-card-text>

        <v-card-actions class="flex items-center gap-5">
          <v-btn @click="close">
            <span class="text-xs">Anuluj</span>
          </v-btn>

          <v-btn
            :disabled="selectedServiceId.length === 0"
            :color="selectedServiceId.length !== 0 ? 'rgb(249 115 22)' : 'gray'"
            height="30"
            variant="elevated"
            class="px-4"
            @click="submit"
            ><span
              class="text-xs"
              :class="selectedServiceId.length !== 0 && 'text-white'"
              >Dodaj</span
            ></v-btn
          >
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
