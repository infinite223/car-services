<script setup lang="ts">
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "./../../services/firebase.config";
import { RouterLink } from "vue-router";

const handleClick = async () => {
  const data = await getDocs(collection(db, "cars"));

  data.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
};
</script>

<template>
  <div class="">
    <v-btn @click="handleClick" color="green">Pobierz dane</v-btn>
    <RouterLink to="/">go to login</RouterLink>
    <RouterLink to="/register">go to register</RouterLink>
  </div>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
