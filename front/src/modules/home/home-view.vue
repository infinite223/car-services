<script setup lang="ts">
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "./../../services/firebase.config";
import { RouterLink } from "vue-router";
import AppLogo from "../../components/app-logo.vue";
import { onMounted, ref } from "vue";

const message = ref("");

const handleClick = async () => {
  const data = await getDocs(collection(db, "cars"));

  data.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
};

onMounted(async () => {
  try {
    const response = await fetch(
      "http://127.0.0.1:5001/car-service-c65d7/us-central1/sayHello"
    );
    if (!response.ok) {
      throw new Error("Błąd podczas pobierania danych");
    }
    const data = await response.json();
    message.value = data.message;
  } catch (error) {
    console.error("Wystąpił błąd:", error);
  }
});
</script>

<template>
  <div class="flex flex-col items-center justify-center h-svh gap-4">
    <RouterLink to="/car-services"> <app-logo /></RouterLink>

    <main>
      <RouterView />
    </main>

    {{ message }}
  </div>
</template>

<style scoped></style>
