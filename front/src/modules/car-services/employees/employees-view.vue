<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import AddEmployeesDialog from "./add-employees-dialog.vue";
import EditEmployeesDialog from "./edit-employees-dialog.vue";
import ConfirmDialog from "../../core/components/confirm-dialog.vue";
import { useEmployeeStore } from "../../../services/stores/employees";

const store = useEmployeeStore();
const showConfirmDialog = ref(false);
const selectedEmployeesIds = ref<number[]>([]);

const headers = [
  { title: "ID", key: "id" },
  { title: "Nazwa", key: "name" },
  { title: "Pensja", key: "salary" },
];

const removeEmployees = () => {
  store.removeEmployees(selectedEmployeesIds.value);
  showConfirmDialog.value = false;
  selectedEmployeesIds.value = [];
};

const selectedEmployee = computed(() =>
  store.employees.find((emp) => emp.id === selectedEmployeesIds.value[0])
);
</script>

<template>
  <div class="flex flex-col gap-4 p-2 w-full">
    <div class="flex justify-between w-full">
      <h2 class="font-semibold text-lg">Pracownicy</h2>
      <div class="flex items-center gap-2">
        <spcn class="text-sm font-semibold"
          >Suma pensji: {{ store.totalSalary }}</spcn
        >
        <v-btn
          :disabled="selectedEmployeesIds.length === 0"
          icon="mdi-trash-can-outline"
          size="30"
          height="30"
          class="text-xs"
          @click="showConfirmDialog = true"
        />
        <edit-employees-dialog
          :employee="selectedEmployee"
          :disabled="selectedEmployeesIds.length !== 1"
        />
        <add-employees-dialog />
      </div>
    </div>
    <v-data-table
      item-value="id"
      :show-select="true"
      select-strategy="all"
      class="overflow-auto"
      :items="store.employees"
      :headers="headers"
      v-model="selectedEmployeesIds"
    />
    <confirm-dialog
      title="Potwierdź usunięcie"
      :description="`Czy na pewno chcesz usunąć wybranych pracowników? ${selectedEmployeesIds.length} zostanie usuniętych.`"
      v-model:showDialog="showConfirmDialog"
      @confirm="removeEmployees"
    />
  </div>
</template>
