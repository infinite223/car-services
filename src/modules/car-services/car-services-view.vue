<script setup lang="ts">
import AppLogo from "../../components/app-logo.vue";
const navigationItems = [
  { path: "/car-services", name: "Usługi", icon: "mdi-car-cog" },
  {
    path: "/orders",
    name: "Zamówienia",
    icon: "mdi-order-bool-descending-variant",
  },
  { path: "/", name: "Wyloguj", icon: "mdi-logout" },
];
</script>

<template>
  <div class="flex w-full h-svh">
    <div class="flex flex-col gap-2 p-6 h-full w-[250px]">
      <AppLogo />
      <div class="flex flex-col text-md mt-2 gap-2">
        <RouterLink
          v-for="item in navigationItems"
          class="p-2 hover:text-zinc-500 flex items-center bg-zinc-50 shadow-sm rounded-md font-semibold"
          :to="item.path"
        >
          <v-icon :icon="item.icon" class="mr-4" size="20" />
          <span>
            {{ item.name }}
          </span>
        </RouterLink>
      </div>
    </div>
    <div class="flex w-full p-2 px-4 bg-zinc-100">
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
