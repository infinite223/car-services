<script setup lang="ts">
import { reactive, ref } from "vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useEmployeeStore } from "../../../services/stores/employees";
import { useTheme } from "../../../composables/useTheme";

const emit = defineEmits(["refreshData"]);
const store = useEmployeeStore();
const initialState = {
  name: "",
  salary: null,
};
const state = reactive({ ...initialState });
const { color } = useTheme();
const rules = {
  name: { required },
  salary: { required },
};

const v$ = useVuelidate(rules, state);
const showDialog = ref(false);

function close() {
  Object.assign(state, initialState);
  v$.value.$reset();
  showDialog.value = false;
}

function addEmployee() {
  const isValid = v$.value.$validate();
  if (!isValid) return;

  store.addEmployee({
    id: Date.now(),
    name: state.name,
    salary: Number(state.salary),
  });

  emit("refreshData");
  close();
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

    <v-card>
      <template #title>
        <h2 class="font-semibold text-xl">Dodaj pracownika</h2>
      </template>

      <v-card-text>
        <v-text-field
          v-model="state.name"
          :error-messages="v$.name.$errors.map((e) => e.$message) as any"
          label="Nazwa"
          variant="underlined"
          required
        />
        <v-text-field
          v-model="state.salary"
          :error-messages="v$.salary.$errors.map((e) => e.$message) as any"
          label="Pensja"
          type="number"
          variant="underlined"
          required
        />
      </v-card-text>

      <v-card-actions>
        <v-btn @click="close">Anuluj</v-btn>
        <v-btn
          :color="color"
          @click="addEmployee"
          class="px-4"
          variant="elevated"
          >Dodaj</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
