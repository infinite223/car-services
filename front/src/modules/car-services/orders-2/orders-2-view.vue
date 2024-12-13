<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { auth } from "../../../services/firebase.config";
import { useRouter } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { User } from "../models";
import AddOrders2Dialog from "./add-orders-2-dialog.vue";
import EditOrders2Dialog from "./edit-orders-2-dialog.vue";

import ConfirmDialog from "../../core/components/confirm-dialog.vue";
import { useToast } from "vue-toast-notification";

const toast = useToast();
const users = ref<any[]>([]);
const router = useRouter();
const showConfirmDialog = ref(false);
const isAdmin = ref(true);
const loggedUserId = ref("");

const selectedUsersIds = ref<string[]>([]);

const headers = [
  { title: "produkt", key: "produkt" },
  { title: "klient_id", key: "klient_id" },
  { title: "ilosc", key: "ilosc" },
];

async function fetchOrders() {
  try {
    const response = await axios.get("http://localhost:3002/api/zamowienia");
    users.value = response.data.map((order) => ({
      orderId: order.orderId,
      klient_id: order.klient_id,
      produkt: order.produkt,
      ilosc: order.ilosc,
    }));
  } catch (error) {
    console.error("Błąd podczas pobierania zamówień:", error);
  }
}

const removeOrders = async () => {
  try {
    await axios.delete(
      `http://localhost:3002/api/zamowienia/${selectedUsersIds.value[0]}`
    );
    showConfirmDialog.value = false;
    await fetchOrders();
    toast.success(
      `Udało się usunąć ${
        selectedUsersIds.value.length > 1 ? "zamówienia." : "zamówienie."
      }`
    );
    selectedUsersIds.value = [];
  } catch (error) {
    toast.error(`Błąd podczas usuwania zamówień.`);
  }
};

const selectedUser = computed(() => {
  return users.value.find((s) => s.uid === selectedUsersIds.value[0]);
});

onAuthStateChanged(auth, (user) => {
  if (!user) {
    router.push("/");
  }

  loggedUserId.value = user.uid;
});

onMounted(() => {
  fetchOrders();
});
</script>

<template>
  <div class="flex flex-col gap-4 p-2 w-full">
    <div class="flex justify-between w-full">
      <h2 class="font-semibold text-lg">Zamowienia</h2>
      <div class="flex items-center gap-2">
        <v-btn
          v-if="isAdmin"
          :disabled="selectedUsersIds.length === 0"
          icon="mdi-trash-can-outline"
          size="30"
          height="30"
          class="text-xs"
          @click="showConfirmDialog = true"
        />
        <edit-orders-2-dialog
          v-if="isAdmin"
          @refresh-data="fetchOrders"
          :order="selectedUser"
          :disabled="selectedUsersIds.length !== 1"
        />
        <add-orders-2-dialog @refresh-data="fetchOrders" />
      </div>
    </div>
    <v-data-table
      item-value="uid"
      :show-select="isAdmin"
      select-strategy="all"
      class="overflow-auto"
      :items="users"
      :headers="headers"
      v-model="selectedUsersIds"
    >
    </v-data-table>
    <confirm-dialog
      title="Potwierdź usunięcie"
      :description="`Czy na pewno chcesz usunąć wybranych użytkowników? ${selectedUsersIds.length} użytkowników zostanie usuniętych.`"
      v-model:showDialog="showConfirmDialog"
      @confirm="removeOrders"
    />
  </div>
</template>
