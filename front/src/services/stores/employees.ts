import { defineStore } from "pinia";
import { ref, computed } from "vue";

export interface Employee {
  id: number;
  name: string;
  salary: number;
}

export const useEmployeeStore = defineStore("pracownicy", () => {
  const employees = ref<Employee[]>([]);

  const addEmployee = (employee: Employee) => {
    employees.value.push(employee);
  };

  const getEmployees = computed(() => employees.value);

  const updateEmployee = (updatedEmployee: Employee) => {
    const index = employees.value.findIndex(
      (emp) => emp.id === updatedEmployee.id
    );
    if (index !== -1) {
      employees.value[index] = { ...updatedEmployee };
    }
  };

  const removeEmployees = (ids: number[]) => {
    employees.value = employees.value.filter((emp) => !ids.includes(emp.id));
  };

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
