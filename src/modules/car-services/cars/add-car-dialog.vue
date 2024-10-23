<script setup lang="ts">
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { reactive, ref } from "vue";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../../services/firebase.config";
import { CarCreateDto } from "../api.models";

const initialState: CarCreateDto = {
  make: "",
  model: "",
  vin: "",
  services: [],
  admissionDate: Timestamp.now(),
};

const state = reactive({
  ...initialState,
});

const rules = {
  make: { required },
  model: { required },
  vin: { required },
};

const v$ = useVuelidate(rules, state);
const showDialog = ref(false);
function close() {
  v$.value.$reset();
  Object.assign(state, initialState);
  state;
  showDialog.value = false;
}

const submit = async () => {
  const result = await v$.value.$validate();

  if (!result) {
    return;
  }
  const newCar: CarCreateDto = {
    ...state,
  };
  await addDoc(collection(db, "cars"), newCar);

  close();
};
</script>

<template>
  <v-dialog max-width="500" v-model="showDialog">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" color="rgb(249 115 22)" height="30">
        <v-icon icon="mdi-plus" color="white" class="mr-2" />
        <span class="text-white text-xs">Przyjmij samochód</span>
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <template #title>
          <h2 class="font-semibold text-xl">Dane samochodu</h2>
        </template>

        <v-card-text>
          <form>
            <v-text-field
              v-model="state.make"
              :error-messages="v$.make.$errors.map((e) => e.$message) as any"
              label="Marka pojazdu"
              variant="underlined"
              required
              @blur="v$.make.$touch"
              @input="v$.make.$touch"
            ></v-text-field>

            <v-text-field
              v-model="state.model"
              :error-messages="v$.model.$errors.map((e) => e.$message) as any"
              label="Model"
              variant="underlined"
              required
              @blur="v$.model.$touch"
              @input="v$.model.$touch"
            ></v-text-field>

            <v-text-field
              v-model="state.vin"
              :error-messages="v$.vin.$errors.map((e) => e.$message) as any"
              label="Vin pojazdu"
              variant="underlined"
              required
              @blur="v$.vin.$touch"
              @input="v$.vin.$touch"
            ></v-text-field>
          </form>
        </v-card-text>

        <v-card-actions class="flex items-center gap-5">
          <v-btn @click="close">
            <span class="text-xs">Anuluj</span>
          </v-btn>
          <v-btn
            color="rgb(249 115 22)"
            height="30"
            variant="elevated"
            class="px-4"
            @click="submit"
            ><span class="text-white text-xs">Przyjmij</span></v-btn
          >
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
