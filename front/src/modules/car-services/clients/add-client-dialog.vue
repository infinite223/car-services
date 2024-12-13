<script setup lang="ts">
import { required, email as emailValidator } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { reactive, ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toast-notification";
import { useTheme } from "../../../composables/useTheme";

const emit = defineEmits(["refreshData"]);
const toast = useToast();
const { color } = useTheme();

const initialState = {
  name: "",
  surname: "",
  email: "",
  phoneNumber: "",
};

const state = reactive({
  ...initialState,
});

const rules = {
  name: { required },
  surname: { required },
  email: { required, email: emailValidator },
  phoneNumber: {},
};

const v$ = useVuelidate(rules, state);
const showDialog = ref(false);

function close() {
  v$.value.$reset();
  Object.assign(state, initialState);
  showDialog.value = false;
}

async function CreateUser() {
  const result = await v$.value.$validate();

  if (!result) return;

  try {
    await axios.post("http://localhost:3002/api/klienci", {
      imie: state.name,
      nazwisko: state.surname,
      email: state.email,
    });

    toast.success(`Klient został dodany pomyślnie.`);
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
        <span class="text-white text-xs">Dodaj</span>
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <template #title>
          <h2 class="font-semibold text-xl">Dodaj klienta</h2>
        </template>

        <v-card-text>
          <form autocomplete="off">
            <v-text-field
              v-model="state.name"
              :error-messages="v$.name.$errors.map((e) => e.$message) as any"
              label="Imię"
              variant="underlined"
              required
              @blur="v$.name.$touch"
              @input="v$.name.$touch"
            ></v-text-field>

            <v-text-field
              v-model="state.surname"
              :error-messages="v$.surname.$errors.map((e) => e.$message) as any"
              label="Nazwisko"
              variant="underlined"
              required
              @blur="v$.surname.$touch"
              @input="v$.surname.$touch"
            ></v-text-field>

            <v-text-field
              v-model="state.email"
              :error-messages="v$.email.$errors.map((e) => e.$message) as any"
              label="Email"
              variant="underlined"
              required
              @blur="v$.email.$touch"
              @input="v$.email.$touch"
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
            @click="CreateUser"
          >
            <span class="text-white text-xs">Dodaj</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
