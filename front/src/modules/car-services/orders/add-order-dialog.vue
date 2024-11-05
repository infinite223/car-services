<script setup lang="ts">
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { reactive, ref } from "vue";
import { useTheme } from "../../../composables/useTheme";
import CustomInput from "../../../components/custom-input.vue";

const initialState = {
  name: "",
  description: "",
  engineNumber: "",
  make: "",
  year: null,
  hasWarranty: false,
  fuelType: "",
  services: [],
  additionalNotes: "",
};

const state = reactive({
  ...initialState,
});

const rules = {
  name: { required },
  description: { required },
  engineNumber: { required },
  make: { required },
  year: { required },
  fuelType: { required },
};

const v$ = useVuelidate(rules, state);
const showDialog = ref(false);
const { color } = useTheme();

function close() {
  reset();
  showDialog.value = false;
}

function reset() {
  v$.value.$reset();
  Object.assign(state, initialState);
}

function submitForm() {
  if (v$.value.$validate()) {
    console.log("Form data:", { ...state });
    close();
  }
}
</script>

<template>
  <v-dialog max-width="500" v-model="showDialog">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" :color="color" height="30">
        <v-icon icon="mdi-plus" color="white" class="mr-2" />
        <span class="text-white text-xs">Zamów</span>
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <template #title>
          <h2 class="font-semibold text-xl">Złóż zamówienie</h2>
        </template>

        <v-card-text>
          <form>
            <v-text-field
              v-model="state.name"
              :error-messages="v$.name.$errors.map((e) => e.$message) as any"
              label="Nazwa"
              variant="underlined"
              required
              @blur="v$.name.$touch"
              @input="v$.name.$touch"
            ></v-text-field>

            <v-text-field
              v-model="state.description"
              :error-messages="v$.description.$errors.map((e) => e.$message) as any"
              label="Opis"
              variant="underlined"
              required
              @blur="v$.description.$touch"
              @input="v$.description.$touch"
            ></v-text-field>

            <v-text-field
              v-model="state.engineNumber"
              :error-messages="v$.engineNumber.$errors.map((e) => e.$message) as any"
              label="Numer silnika"
              variant="underlined"
              required
              @blur="v$.engineNumber.$touch"
              @input="v$.engineNumber.$touch"
            ></v-text-field>

            <v-text-field
              v-model="state.year"
              type="number"
              :error-messages="v$.year.$errors.map((e) => e.$message) as any"
              label="Rok produkcji"
              variant="underlined"
              required
              @blur="v$.year.$touch"
              @input="v$.year.$touch"
            ></v-text-field>

            <v-checkbox
              v-model="state.hasWarranty"
              label="Posiada gwarancję"
            ></v-checkbox>

            <v-radio-group
              v-model="state.fuelType"
              :error-messages="v$.fuelType.$errors.map((e) => e.$message) as any"
              label="Rodzaj paliwa"
              required
            >
              <v-radio label="Benzyna" value="Benzyna"></v-radio>
              <v-radio label="Diesel" value="Diesel"></v-radio>
              <v-radio label="Elektryczny" value="Elektryczny"></v-radio>
            </v-radio-group>

            <div>
              <label class="ml-2 mb-2 font-thin text-sm"
                >Usługi dodatkowe</label
              >
              <v-checkbox
                v-model="state.services"
                label="Przegląd techniczny"
                value="Przegląd techniczny"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="state.services"
                label="Wymiana opon"
                value="Wymiana opon"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="state.services"
                label="Wymiana oleju"
                value="Wymiana oleju"
                hide-details
              ></v-checkbox>
            </div>

            <v-select
              v-model="state.make"
              :items="['Toyota', 'Ford', 'BMW', 'Audi']"
              label="Marka"
              variant="underlined"
              required
            ></v-select>

            <custom-input
              label="Dodatkowe informacje"
              :modelValue="state.additionalNotes"
              @update:modelValue="($event) => (state.additionalNotes = $event)"
            ></custom-input>
          </form>
        </v-card-text>

        <v-card-actions class="flex items-center gap-5">
          <v-btn @click="reset()">
            <span class="text-xs">Czyść</span>
          </v-btn>
          <v-btn @click="close()">
            <span class="text-xs">Anuluj</span>
          </v-btn>
          <v-btn
            :color="color"
            height="30"
            variant="elevated"
            class="px-4"
            @click="submitForm"
          >
            <span class="text-white text-xs">Wyślij</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
