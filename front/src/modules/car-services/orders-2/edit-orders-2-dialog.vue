<script setup lang="ts">
import { ref, reactive, watch, PropType } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import axios from "axios";
import { useToast } from "vue-toast-notification";
import { useTheme } from "../../../composables/useTheme";

const emit = defineEmits(["refreshData"]);
const { color } = useTheme();

const props = defineProps({
  order: {
    type: Object as PropType<any>,
    required: true,
  },
  disabled: {
    default: true,
    type: Boolean,
  },
});
const toast = useToast();

const state = reactive({
  product: "",
  quantity: 1,
  customerName: "",
  address: "",
});
const showDialog = ref(false);

const rules = {
  product: { required },
  quantity: { required },
  customerName: { required },
  address: { required },
};

const v$ = useVuelidate(rules, state);

watch(
  () => props.order,
  (newOrder) => {
    if (newOrder) {
      state.product = newOrder.product || "";
      state.quantity = newOrder.quantity || 1;
      state.customerName = newOrder.customerName || "";
      state.address = newOrder.address || "";
    }
  }
);

async function save() {
  const result = await v$.value.$validate();
  if (!result) return;

  try {
    await axios.put(`http://localhost:3002/api/orders/${props.order!.id}`, {
      product: state.product,
      quantity: state.quantity,
      customerName: state.customerName,
      address: state.address,
    });
    toast.success(`Zamówienie zostało zaktualizowane pomyślnie.`);
    emit("refreshData");
    close();
  } catch (error) {
    console.error("Błąd podczas edycji zamówienia:", error);
    toast.error("Nie udało się zaktualizować zamówienia.");
  }
}

function close() {
  v$.value.$reset();
  showDialog.value = false;
}
</script>

<template>
  <v-dialog max-width="500" v-model="showDialog">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" height="30" :disabled="disabled">
        <v-icon icon="mdi-playlist-edit" class="mr-2" />
        <span class="text-xs">Edytuj Zamówienie</span>
      </v-btn>
    </template>
    <template v-slot:default="{}">
      <v-card>
        <v-card-title>Edytuj Zamówienie</v-card-title>
        <v-card-text>
          <v-text-field
            label="Produkt"
            v-model="state.product"
            variant="underlined"
            :error-messages="v$.product.$errors.map(e => e.$message) as any"
          />
          <v-text-field
            label="Ilość"
            v-model="state.quantity"
            type="number"
            variant="underlined"
            :error-messages="v$.quantity.$errors.map(e => e.$message) as any"
          />
          <v-text-field
            label="Imię i nazwisko klienta"
            v-model="state.customerName"
            variant="underlined"
            :error-messages="v$.customerName.$errors.map(e => e.$message) as any"
          />
          <v-textarea
            label="Adres"
            v-model="state.address"
            variant="underlined"
            :error-messages="v$.address.$errors.map(e => e.$message) as any"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn @click="close">Anuluj</v-btn>
          <v-btn
            :color="color"
            height="30"
            @click="save"
            variant="elevated"
            class="px-4"
          >
            <span class="text-white text-xs">Zapisz</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
