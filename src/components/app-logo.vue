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
  <h2 class="font-extrabold leading-6" :style="{ fontSize: fontSize + 'px' }">
    <span>Car</span>
    <span class="text-orange-500"> services </span>
  </h2>
</template>
