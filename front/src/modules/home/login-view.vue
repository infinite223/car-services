<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../services/firebase.config";
import { useTheme } from "../../composables/useTheme";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();
const { color } = useTheme();

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push("/car-services");
  } catch (error) {
    errorMessage.value = "Błąd podczas logowania: " + (error as Error).message;
  }
};

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    router.push("/car-services");
  } catch (error) {
    errorMessage.value = "Błąd podczas logowania: " + (error as Error).message;
  }
};
</script>

<template>
  <div class="w-[250px] flex flex-col items-center gap-2">
    <h2 class="w-full font-semibold mt-4">Login</h2>

    <form @submit.prevent="login" class="w-full">
      <v-text-field
        v-model="email"
        label="Email"
        type="email"
        variant="underlined"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="Hasło"
        type="password"
        variant="underlined"
        required
      ></v-text-field>

      <v-btn
        @click="login"
        :color="color"
        height="30"
        variant="elevated"
        class="text-white w-full"
        >Zaloguj się</v-btn
      >

      <v-btn
        height="30"
        variant="elevated"
        class="text-black w-full mt-4"
        @click="loginWithGoogle"
      >
        <v-icon icon="mdi-google" class="mr-2" size="15" />
        <span class="text-xs"> Zaloguj się przez Google </span>
      </v-btn>

      <p class="text-center text-sm my-1" v-if="errorMessage">
        {{ errorMessage }}
      </p>
    </form>

    <RouterLink class="opacity-55 text-sm" to="/register"
      >Nie masz konta? Zarejestruj się</RouterLink
    >
  </div>
</template>

<style scoped></style>
