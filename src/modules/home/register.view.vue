<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase.config";

// Stan dla email, hasła i powtórzenia hasła
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const router = useRouter();

// Funkcja do rejestracji
const register = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Hasła nie są takie same";
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    router.push("/car-services"); // Przekierowanie po rejestracji
  } catch (error) {
    errorMessage.value =
      "Błąd podczas rejestracji: " + (error as Error).message;
  }
};
</script>

<template>
  <div class="w-[250px] flex flex-col items-center gap-2">
    <h2 class="w-full font-semibold mt-4">Rejestracja</h2>

    <form @submit.prevent="register" class="w-full">
      <v-text-field
        v-model="email"
        label="Email"
        type="email"
        required
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="Hasło"
        type="password"
        required
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="confirmPassword"
        label="Powtórz hasło"
        type="password"
        variant="underlined"
        required
      ></v-text-field>

      <v-btn
        @click="register"
        color="rgb(249 115 22)"
        height="30"
        variant="elevated"
        class="text-white w-full"
        >Zarejestruj się</v-btn
      >

      <p class="text-center text-sm my-1" v-if="errorMessage">
        {{ errorMessage }}
      </p>
    </form>

    <RouterLink class="opacity-55 text-sm" to="/"
      >Masz już konto? Zaloguj się</RouterLink
    >
  </div>
</template>

<style scoped></style>
