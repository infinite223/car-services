<script setup lang="ts">
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { reactive, ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toast-notification";
import { useTheme } from "../../../composables/useTheme";

const emit = defineEmits(["refreshData"]);
const toast = useToast();
const { color } = useTheme();
const initialState = {
  product: "",
  klient_id: 1,
  ilosc: 1,
};

const state = reactive({
  ...initialState,
});

const rules = {
  product: { required },
  klient_id: { required },
  ilosc: { required },
};

const v$ = useVuelidate(rules, state);
const showDialog = ref(false);

function close() {
  v$.value.$reset();
  Object.assign(state, initialState);
  showDialog.value = false;
}

async function CreateOrder() {
  const result = await v$.value.$validate();

  if (!result) return;

  try {
    await axios.post("http://localhost:3002/api/zamowienia", {
      produkt: state.product,
      ilosc: state.ilosc,
      klient_id: state.klient_id,
    });

    toast.success(`Zamówienie zostało pomyślnie dodane.`);
    emit("refreshData");
    close();
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data);
    } else {
      toast.error("Nieoczekiwany błąd:", error.message);
    }
  }
}
</script>

<template>
  <v-dialog max-width="500" v-model="showDialog">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" :color="color" height="30">
        <v-icon icon="mdi-plus" color="white" class="mr-2" />
        <span class="text-white text-xs">Dodaj Zamówienie</span>
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <template #title>
          <h2 class="font-semibold text-xl">Dodaj Zamówienie</h2>
        </template>

        <v-card-text>
          <form autocomplete="off">
            <v-text-field
              v-model="state.product"
              :error-messages="v$.product.$errors.map((e) => e.$message) as any"
              label="Produkt"
              variant="underlined"
              required
              @blur="v$.product.$touch"
              @input="v$.product.$touch"
            ></v-text-field>

            <v-text-field
              v-model="state.klient_id"
              :error-messages="v$.klient_id.$errors.map((e) => e.$message) as any"
              label="Ilość"
              type="number"
              variant="underlined"
              required
              @blur="v$.klient_id.$touch"
              @input="v$.klient_id.$touch"
            ></v-text-field>

            <v-text-field
              v-model="state.ilosc"
              :error-messages="v$.ilosc.$errors.map((e) => e.$message) as any"
              label="Id klienta"
              variant="underlined"
              required
              @blur="v$.ilosc.$touch"
              @input="v$.ilosc.$touch"
            ></v-text-field>
          </form>
        </v-card-text>

        <v-card-actions class="flex items-center gap-5">
          <v-btn @click="close">
            <span class="text-xs">Anuluj</span>
          </v-btn>
          <v-btn
            :color="color"
            height="30"
            variant="elevated"
            class="px-4"
            @click="CreateOrder"
            ><span class="text-white text-xs">Dodaj</span></v-btn
          >
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
