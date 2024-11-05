<script setup>
import { computed } from "vue";

const props = defineProps(["modelValue", "label"]);
const emit = defineEmits(["update:modelValue"]);

const modelValueProxy = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<template>
  <v-text-field
    :label="label"
    variant="underlined"
    v-model="modelValueProxy"
  ></v-text-field>
</template>
