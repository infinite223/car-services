<script setup lang="ts">
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "./../../services/firebase.config";
import { RouterLink } from "vue-router";
import AppLogo from "../../components/app-logo.vue";
const handleClick = async () => {
  const data = await getDocs(collection(db, "cars"));

  data.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-svh gap-2">
    <RouterLink to="/car-services"> <app-logo /></RouterLink>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
