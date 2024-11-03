<script setup lang="ts">
import { ref, reactive, watch, PropType } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import axios from "axios";
import { User } from "../models";
import { useToast } from "vue-toast-notification";
import { useTheme } from "../../../composables/useTheme";

const emit = defineEmits(["refreshData"]);
const { color } = useTheme();

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
  disabled: {
    default: true,
    type: Boolean,
  },
});
const toast = useToast();

const state = reactive({
  displayName: "",
  phoneNumber: "",
});
const showDialog = ref(false);

const rules = {
  displayName: { required },
  phoneNumber: {},
};

const v$ = useVuelidate(rules, state);

watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      state.displayName = newUser.displayName || "";
      state.phoneNumber = newUser.phoneNumber || "";
    }
  }
);

async function save() {
  try {
    await axios.put(`http://localhost:5000/api/users/${props.user!.uid}`, {
      displayName: state.displayName,
      phoneNumber: state.phoneNumber,
    });
    toast.success(`Użytkonik został zaaktualizowany pomyślnie.`);
    emit("refreshData");
    close();
  } catch (error) {
    console.error("Błąd podczas edycji użytkownika:", error);
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
        <span class="text-xs">Edytuj</span>
      </v-btn>
    </template>
    <template v-slot:default="{}">
      <v-card>
        <v-card-title>Edytuj użytkownika</v-card-title>
        <v-card-text>
          <v-text-field
            label="Nazwa"
            v-model="state.displayName"
            variant="underlined"
            :error-messages="v$.displayName.$errors.map(e => e.$message) as any"
          />
          <v-text-field
            label="Numer telefonu"
            v-model="state.phoneNumber"
            variant="underlined"
            :error-messages="v$.phoneNumber.$errors.map(e => e.$message) as any"
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
            <span class="text-white text-xs">Zapisz</span></v-btn
          >
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
