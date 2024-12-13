<script setup lang="ts">
import { ref, reactive, watch, PropType } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email as emailValidator } from "@vuelidate/validators";
import axios from "axios";
import { useToast } from "vue-toast-notification";
import { useTheme } from "../../../composables/useTheme";

const emit = defineEmits(["refreshData"]);
const { color } = useTheme();

const props = defineProps({
  user: {
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
  name: "",
  surname: "",
  email: "",
  phoneNumber: "",
});
const showDialog = ref(false);

const rules = {
  name: { required },
  surname: { required },
  email: { required, email: emailValidator },
  phoneNumber: {},
};

const v$ = useVuelidate(rules, state);

watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      state.name = newUser.name || "";
      state.surname = newUser.surname || "";
      state.email = newUser.email || "";
    }
  }
);

async function save() {
  const result = await v$.value.$validate();
  if (!result) return;

  try {
    await axios.put(`http://localhost:3002/api/klienci/${props.user!.id}`, {
      imie: state.name,
      nazwisko: state.surname,
      email: state.email,
    });
    toast.success(`Klient został zaktualizowany pomyślnie.`);
    emit("refreshData");
    close();
  } catch (error) {
    console.error("Błąd podczas edycji klienta:", error);
    if (error.response) {
      toast.error(error.response.data);
    } else {
      toast.error("Nieoczekiwany błąd:", error.message);
    }
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
            label="Imię"
            v-model="state.name"
            variant="underlined"
            :error-messages="v$.name.$errors.map((e) => e.$message) as any"
            required
            @blur="v$.name.$touch"
            @input="v$.name.$touch"
          />
          <v-text-field
            label="Nazwisko"
            v-model="state.surname"
            variant="underlined"
            :error-messages="v$.surname.$errors.map((e) => e.$message) as any"
            required
            @blur="v$.surname.$touch"
            @input="v$.surname.$touch"
          />
          <v-text-field
            label="Email"
            v-model="state.email"
            variant="underlined"
            :error-messages="v$.email.$errors.map((e) => e.$message) as any"
            required
            @blur="v$.email.$touch"
            @input="v$.email.$touch"
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
