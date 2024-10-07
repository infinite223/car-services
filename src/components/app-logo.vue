<script lang="ts" setup>
defineProps({
  fontSize: {
    type: Number,
    required: false,
    default: 25,
  },
});
</script>

<template>
  <h2
    class="font-extrabold leading-6 relative pt-2"
    :style="{ fontSize: fontSize + 'px' }"
  >
    <span>Car</span>
    <span class="text-orange-500 h-10">Service </span>
    <v-icon
      size="30"
      class="translate-y-[-10px] translate-x-[-2px] rotate-[30deg]"
      >mdi-car-wrench
    </v-icon>
  </h2>
</template>
