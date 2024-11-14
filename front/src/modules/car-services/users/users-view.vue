<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { auth } from "../../../services/firebase.config";
import { useRouter } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { User } from "../models";
import AddUserDialog from "./add-user-dialog.vue";
import EditUserDialog from "./edit-user-dialog.vue";
import ConfirmDialog from "../../core/components/confirm-dialog.vue";
import { useToast } from "vue-toast-notification";

const toast = useToast();
const users = ref<User[]>([]);
const router = useRouter();
const showConfirmDialog = ref(false);
const isAdmin = ref(false);
const loggedUserId = ref("")

const selectedUsersIds = ref<string[]>([]);

const headers = [
  { title: "Uid", key: "uid" },
  { title: "Email", key: "email" },
  { title: "Nazwa", key: "displayName" },
  { title: "Zdjęcie", key: "photoURL" },
  { title: "Numer telefonu", key: "phoneNumber" },
];

async function fetchUsers() {
  try {
    const response = await axios.get("http://localhost:5005/api/users");
    users.value = response.data as User[];
  } catch (error) {
    console.error("Błąd podczas pobierania użytkowników:", error);
  }
}

async function checkUserRole(userId) {
  try {
    const response = await axios.get(`http://localhost:5005/api/check-admin/${userId}`);
    
    if (response.data.success) {
      isAdmin.value = response.data.isAdmin;
    } else {
      console.log('Użytkownik nie istnieje lub wystąpił błąd');
      isAdmin.value = false;
    }
  } catch (error) {
    console.error('Błąd podczas sprawdzania roli użytkownika:', error);
    isAdmin.value = false;
  }
}


const removeUsers = async () => {
  try {
    await axios.delete("http://localhost:5005/api/users", {
      data: { uids: selectedUsersIds.value },
    });
    showConfirmDialog.value = false;
    await fetchUsers();   
    toast.success(
      `Udało się usunąć ${
        selectedUsersIds.value.length > 1 ? "użytkoników." : "użytkonika."
      }`
    );
    selectedUsersIds.value = [];
  } catch (error) {
    toast.error(`Błąd podczas usuwania.`);
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

watch(loggedUserId, ()=> {
  checkUserRole(loggedUserId.value)
})

onMounted(() => { fetchUsers()});
</script>

<template>
  <div class="flex flex-col gap-4 p-2 w-full">
    <div class="flex justify-between w-full">
      <h2 class="font-semibold text-lg">Użytkonicy</h2>
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
        <edit-user-dialog
          v-if="isAdmin"
          @refresh-data="fetchUsers"
          :user="selectedUser"
          :disabled="selectedUsersIds.length !== 1"
        />
        <add-user-dialog @refresh-data="fetchUsers" />
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
    />
    <confirm-dialog
      title="Potwierdź usunięcie"
      :description="`Czy na pewno chcesz usunąć wybranych użytkowników? ${selectedUsersIds.length} użytkowników zostanie usuniętych.`"
      v-model:showDialog="showConfirmDialog"
      @confirm="removeUsers"
    />
  </div>
</template>
