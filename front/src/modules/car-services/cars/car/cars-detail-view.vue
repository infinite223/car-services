<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  id: string;
}>();
</script>

<template>
  <div class="flex p-2">
    <h1>Detail for Car ID: {{ props.id }}</h1>
  </div>
</template>
