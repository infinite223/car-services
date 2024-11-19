<script setup lang="ts">
import { reactive, watch, ref } from "vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useEmployeeStore } from "../../../services/stores/employees";
import { useTheme } from "../../../composables/useTheme";

const emit = defineEmits(["refreshData"]);
const props = defineProps({
  employee: {
    type: Object,
    required: false,
  },
  disabled: {
    type: Boolean,
    default: true,
  },
});
const store = useEmployeeStore();
const { color } = useTheme();

const showDialog = ref(false);
const state = reactive({
  id: null,
  name: "",
  salary: null,
});

const rules = {
  name: { required },
  salary: { required },
};

const v$ = useVuelidate(rules, state);

watch(
  () => props.employee,
  (newEmployee) => {
    if (newEmployee) {
      state.id = newEmployee.id;
      state.name = newEmployee.name;
      state.salary = newEmployee.salary;
    }
  }
);

function close() {
  showDialog.value = false;
}

function save() {
  const isValid = v$.value.$validate();
  if (!isValid) return;

  store.updateEmployee({ ...state });
  emit("refreshData");
  close();
}
</script>

<template>
  <v-dialog max-width="500" v-model="showDialog">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" :disabled="disabled">
        <v-icon icon="mdi-playlist-edit" class="mr-2" />
        <span class="text-xs">Edytuj</span>
      </v-btn>
    </template>

    <v-card>
      <template #title>
        <h2 class="font-semibold text-xl">Edytuj pracownika</h2>
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
        <v-btn @click="save" :color="color" variant="elevated" class="px-4"
          >Zapisz</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
