<script lang="ts" setup>
import { useTheme } from "../composables/useTheme";

defineProps({
  fontSize: {
    type: Number,
    required: false,
    default: 25,
  },
});
const { color } = useTheme();
</script>

<template>
  <h2
    class="font-extrabold leading-6 relative pt-2"
    :style="{ fontSize: fontSize + 'px' }"
  >
    <span>Car</span>
    <span class="h-10" :style="{ color: color }">Service </span>
    <v-icon
      size="30"
      class="translate-y-[-10px] translate-x-[-2px] rotate-[30deg]"
      >mdi-car-wrench
    </v-icon>
  </h2>
</template>
