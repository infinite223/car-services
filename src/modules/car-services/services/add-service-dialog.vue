<script setup lang="ts">
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { reactive, ref } from "vue";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../services/firebase.config";
import { useRouter } from "vue-router";
import { ServiceDto } from "../models";

const initialState = {
  name: "",
  description: "",
  price: 0,
};

const state = reactive({
  ...initialState,
});

const rules = {
  name: { required },
  description: { required },
  price: { required },
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
  const newService: ServiceDto = {
    ...state,
    done: false,
  };
  await addDoc(collection(db, "services"), newService);

  close();
};
</script>

<template>
  <v-dialog max-width="500" v-model="showDialog">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" color="rgb(249 115 22)" height="30">
        <v-icon icon="mdi-plus" color="white" class="mr-2" />
        <span class="text-white text-xs">Dodaj</span>
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <template #title>
          <h2 class="font-semibold text-xl">Dodaj usługe</h2>
        </template>

        <v-card-text>
          <form>
            <v-text-field
              v-model="state.name"
              :error-messages="v$.name.$errors.map((e) => e.$message) as any"
              label="Nazwa"
              variant="underlined"
              required
              @blur="v$.name.$touch"
              @input="v$.name.$touch"
            ></v-text-field>

            <v-text-field
              v-model="state.description"
              :error-messages="v$.description.$errors.map((e) => e.$message) as any"
              label="Opis"
              variant="underlined"
              required
              @blur="v$.description.$touch"
              @input="v$.description.$touch"
            ></v-text-field>

            <v-text-field
              v-model="state.price"
              :error-messages="v$.price.$errors.map((e) => e.$message) as any"
              label="Cena usługi (bez części)"
              variant="underlined"
              required
              @blur="v$.price.$touch"
              @input="v$.price.$touch"
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
            ><span class="text-white text-xs">Dodaj</span></v-btn
          >
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
