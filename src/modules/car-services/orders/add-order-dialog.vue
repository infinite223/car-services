<script setup lang="ts">
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { reactive } from "vue";

const initialState = {
  name: "",
  description: "",
  engineNumber: "",
  make: "",
  model: "",
};

const state = reactive({
  ...initialState,
});

const rules = {
  name: { required },
  description: { required },
  engineNumber: { required },
  make: { required },
  model: { required },
};

const v$ = useVuelidate(rules, state);

function close() {
  v$.value.$reset();
  Object.assign(state, initialState);
  state;
}
</script>

<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" color="rgb(249 115 22)" height="30">
        <v-icon icon="mdi-plus" color="white" class="mr-2" />
        <span class="text-white text-xs">Dodaj</span>
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
              :error-messages="v$.name.$errors.map((e) => e.$message)"
              label="Nazwa"
              variant="underlined"
              required
              @blur="v$.name.$touch"
              @input="v$.name.$touch"
            ></v-text-field>

            <v-text-field
              v-model="state.description"
              :error-messages="v$.description.$errors.map((e) => e.$message)"
              label="Opis"
              variant="underlined"
              required
              @blur="v$.description.$touch"
              @input="v$.description.$touch"
            ></v-text-field>

            <v-text-field
              v-model="state.engineNumber"
              :error-messages="v$.engineNumber.$errors.map((e) => e.$message)"
              label="Numer silnika"
              variant="underlined"
              required
              @blur="v$.engineNumber.$touch"
              @input="v$.engineNumber.$touch"
            ></v-text-field>

            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="state.make"
                  :error-messages="v$.make.$errors.map((e) => e.$message)"
                  label="Marka"
                  variant="underlined"
                  required
                  @blur="v$.make.$touch"
                  @input="v$.make.$touch"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="state.model"
                  :error-messages="v$.model.$errors.map((e) => e.$message)"
                  label="Model"
                  variant="underlined"
                  required
                  @blur="v$.model.$touch"
                  @input="v$.model.$touch"
                ></v-text-field>
              </v-col>
            </v-row>
          </form>
        </v-card-text>

        <v-card-actions class="flex items-center gap-5">
          <v-btn
            @click="
              () => {
                close();
                isActive.value = false;
              }
            "
          >
            <span class="text-xs">Anuluj</span>
          </v-btn>
          <v-btn
            color="rgb(249 115 22)"
            height="30"
            variant="elevated"
            class="px-4"
            @click="v$.$validate"
            ><span class="text-white text-xs">Zamów</span></v-btn
          >
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
