<script setup lang="ts">
import { required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { reactive, ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toast-notification";

const emit = defineEmits(["refreshData"]);
const toast = useToast();
const initialState = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

const state = reactive({
  ...initialState,
});

const rules = {
  name: { required },
  email: { required },
  phoneNumber: {},
  password: { required, minLength: minLength(8) },
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
    await axios.post("http://localhost:5000/api/users", {
      displayName: state.name,
      email: state.email,
      phoneNumber: state.phoneNumber,
      password: state.password,
    });

    toast.success(`Udało się dodać użytkonika.`);
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
      <v-btn v-bind="activatorProps" color="rgb(249 115 22)" height="30">
        <v-icon icon="mdi-plus" color="white" class="mr-2" />
        <span class="text-white text-xs">Dodaj</span>
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <template #title>
          <h2 class="font-semibold text-xl">Dodaj użytkownika</h2>
        </template>

        <v-card-text>
          <form autocomplete="off">
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
              v-model="state.email"
              :error-messages="v$.email.$errors.map((e) => e.$message) as any"
              label="Email"
              variant="underlined"
              required
              @blur="v$.email.$touch"
              @input="v$.email.$touch"
            ></v-text-field>

            <v-text-field
              v-model="state.phoneNumber"
              :error-messages="v$.phoneNumber.$errors.map((e) => e.$message) as any"
              label="Numer telefonu (+48 732 324 432)"
              variant="underlined"
              @blur="v$.phoneNumber.$touch"
              @input="v$.phoneNumber.$touch"
            ></v-text-field>

            <v-text-field
              v-model="state.password"
              :error-messages="v$.password.$errors.map((e) => e.$message) as any"
              label="Hasło"
              autocomplete="off"
              type="password"
              variant="underlined"
              required
              @blur="v$.password.$touch"
              @input="v$.password.$touch"
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
            @click="CreateUser"
            ><span class="text-white text-xs">Dodaj</span></v-btn
          >
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
