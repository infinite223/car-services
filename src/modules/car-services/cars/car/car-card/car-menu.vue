<script setup lang="ts">
import { PropType } from "vue";
import { Car } from "../../../models";
import ConfirmDialog from "../../../../core/components/confirm-dialog.vue";
import { ref } from "vue";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../../services/firebase.config";
const showDialog = ref(false);

const props = defineProps({
  car: {
    type: Object as PropType<Car>,
    required: true,
  },
});

const handlePrint = () => {
  const printableElement = document.getElementById("printable-content");
  if (printableElement) {
    const printContents = printableElement.innerHTML;

    const printWindow = window.open("", "", "width=800,height=600");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Drukowanie Raportu</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #333; }
              p { font-size: 14px; }
            </style>
          </head>
          <body>
            ${printContents}
          </body>
        </html>
      `);

      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  }
};

const handleRemoveCar = () => {
  showDialog.value = true;
};

const removeCar = async () => {
  await deleteDoc(doc(db, "cars", props.car.id));
  showDialog.value = false;
};

const items = [
  { title: "Drukuj raport", onClick: handlePrint },
  { title: "Edytuj" },
  { title: "Usuń pojazd", onClick: handleRemoveCar },
];
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn
        icon="mdi-dots-vertical"
        variant="text"
        height="20"
        width="20"
        v-bind="props"
      ></v-btn>
    </template>

    <v-list>
      <v-list-item
        class="p-0 m-0"
        min-height="10"
        v-for="(item, i) in items"
        :key="i"
        @click="item.onClick"
      >
        <v-list-item-title class="cursor-pointer">
          <span class="text-sm">{{ item.title }}</span></v-list-item-title
        >
      </v-list-item>
    </v-list>
  </v-menu>
  <confirm-dialog
    title="Potwierdź usunięcie"
    :description="
      'Czy na pewno chcesz usunąć pojazd:' +
      ' ' +
      car.make +
      ' ' +
      car.model.toUpperCase()
    "
    v-model:showDialog="showDialog"
    @confirm="removeCar"
  />

  <div id="printable-content" class="hidden w-full h-full">
    <v-card>
      <template #title>
        <span style="font-size: 20px; font-weight: 700">RAPORT POJAZDU</span>
      </template>
      <template #subtitle>
        <div style="margin: 2px 0px; margin-top: 20px">
          <span>Marka: </span>
          <span>{{ props.car.make }}</span>
        </div>
        <div style="margin: 2px 0px">
          <span>Model: </span>
          <span>{{ props.car.model.toUpperCase() }}</span>
        </div>
        <div style="margin: 2px 0px">
          <span>Vin: </span>
          <span>{{ props.car.vin }}</span>
        </div>
      </template>
    </v-card>
  </div>
</template>
