import { defineStore } from "pinia";
import { ref, computed } from "vue";

export interface Employee {
  id: number;
  name: string;
  salary: number;
}

export const useEmployeeStore = defineStore("pracownicy", () => {
  const employees = ref<Employee[]>([]);

  // Dodawanie pracownika
  const addEmployee = (employee: Employee) => {
    employees.value.push(employee);
  };

  // Pobranie listy pracowników
  const getEmployees = computed(() => employees.value);

  // Edycja pracownika
  const updateEmployee = (updatedEmployee: Employee) => {
    const index = employees.value.findIndex(
      (emp) => emp.id === updatedEmployee.id
    );
    if (index !== -1) {
      employees.value[index] = { ...updatedEmployee };
    }
  };

  // Usuwanie pracownika/ów
  const removeEmployees = (ids: number[]) => {
    employees.value = employees.value.filter((emp) => !ids.includes(emp.id));
  };

  // Całkowita suma pensji
  const totalSalary = computed(() =>
    employees.value.reduce((sum, emp) => sum + emp.salary, 0)
  );

  return {
    employees,
    addEmployee,
    updateEmployee,
    removeEmployees,
    getEmployees,
    totalSalary,
  };
});
