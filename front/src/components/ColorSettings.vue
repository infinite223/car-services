<template>
  <div>
    <v-icon size="25" class="" @click="openColorPicker"> mdi-cog </v-icon>
    <input
      type="color"
      v-model="color"
      ref="colorInput"
      @change="updateColor"
      style="display: none"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTheme } from "../composables/useTheme";

const { color, setColor } = useTheme();
const colorInput = ref<HTMLInputElement | null>(null);

const updateColor = () => {
  setColor(color.value);
};

const openColorPicker = () => {
  colorInput.value?.click();
};
</script>
