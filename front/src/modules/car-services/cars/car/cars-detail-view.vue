<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  id: string;
}>();
</script>

<template>
  <div>
    <h1>Detail for Car ID: {{ props.id }}</h1>
  </div>
</template>
