<script setup lang="ts">
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { PropType, reactive, ref } from "vue";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../services/firebase.config";
import { ServiceCreateDto } from "../api.models";
import { Service } from "../models";

const props = defineProps({
  selectedService: {
    required: true,
    type: Object as PropType<Service>,
  },
  disabled: {
    default: true,
    type: Boolean,
  },
});

const state = reactive({
  ...props.selectedService,
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
  Object.assign(state, props.selectedService);
  state;
  showDialog.value = false;
}

const submit = async () => {
  const result = await v$.value.$validate();

  if (!result) {
    return;
  }
  const newService: ServiceCreateDto = {
    ...state,
  };

  await updateDoc(
    doc(db, "services", props.selectedService.id ?? ""),
    newService
  );

  close();
};
</script>

<template>
  <v-dialog max-width="500" v-model="showDialog">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" height="30" :disabled="disabled">
        <v-icon icon="mdi-playlist-edit" class="mr-2" />
        <span class="text-xs">Edytuj</span>
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <template #title>
          <h2 class="font-semibold text-xl">Edytuj usługe</h2>
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
