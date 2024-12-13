<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { auth } from "../../../services/firebase.config";
import { useRouter } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { User } from "../models";
import AddClientDialog from "./add-client-dialog.vue";
import EditClientDialog from "./edit-client-dialog.vue";
import ConfirmDialog from "../../core/components/confirm-dialog.vue";
import { useToast } from "vue-toast-notification";

const toast = useToast();
const users = ref<User[]>([]);
const router = useRouter();
const showConfirmDialog = ref(false);
const isAdmin = ref(true);
const loggedUserId = ref("");

const selectedUsersIds = ref<string[]>([]);

const headers = [
  { title: "ID Klienta", key: "id" },
  { title: "Nazwa", key: "imie" },
  { title: "Nazwisko", key: "nazwisko" },
  { title: "Email", key: "email" },
];

async function fetchClients() {
  try {
    const response = await axios.get("http://localhost:3002/api/klienci");
    users.value = response.data.map((client) => ({
      id: client.id,
      imie: client.imie,
      nazwisko: client.nazwisko,
      email: client.email,
    }));
  } catch (error) {
    console.error("Błąd podczas pobierania klientów:", error);
  }
}

const removeClients = async () => {
  try {
    await axios.delete(
      `http://localhost:3002/api/klienci/${selectedUsersIds.value[0]}`
    );
    showConfirmDialog.value = false;
    await fetchClients();
    toast.success(
      `Udało się usunąć ${
        selectedUsersIds.value.length > 1 ? "klientów." : "klienta."
      }`
    );
    selectedUsersIds.value = [];
  } catch (error) {
    toast.error(`Błąd podczas usuwania klientów.`);
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
  fetchClients();
});
</script>

<template>
  <div class="flex flex-col gap-4 p-2 w-full">
    <div class="flex justify-between w-full">
      <h2 class="font-semibold text-lg">Klienci</h2>
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
        <edit-client-dialog
          v-if="isAdmin"
          @refresh-data="fetchClients"
          :user="selectedUser"
          :disabled="selectedUsersIds.length !== 1"
        />
        <add-client-dialog @refresh-data="fetchClients" />
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
      @confirm="removeClients"
    />
  </div>
</template>
