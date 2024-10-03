<script setup lang="ts">
import AppLogo from "../../components/app-logo.vue";
</script>

<template>
  <div class="flex w-full h-svh">
    <div class="flex flex-col gap-2 p-6 h-full w-[250px]">
      <AppLogo />
      <div class="flex flex-col text-md mt-2">
        <RouterLink class="p-1 hover:text-white" to="/car-services"
          >Usługi</RouterLink
        >
        <RouterLink class="p-1 hover:text-white" to="/orders"
          >Zamówienia</RouterLink
        >
        <RouterLink class="p-1 hover:text-white" to="/">Wyloguj</RouterLink>
      </div>
    </div>
    <div class="flex w-full p-2 px-4 bg-zinc-950">
      <!-- TODO - 
     
     - clients
     - usługi - dodawanie usług dla pojazdu  
     - faktury/podsumowanie - dla pojazdu lub na miesiąc, rozliczenia 
     - zamówienia - potwierdzanie ->  na magazyn 
     - magazyn - części samochodowe
    
    -->
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
