<script setup lang="ts">
defineProps({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: false,
    type: String,
  },
  showDialog: {
    required: true,
    type: Boolean,
  },
});

const emit = defineEmits(["confirm", "update:showDialog"]);

function closeDialog() {
  emit("update:showDialog", false);
}
</script>

<template>
  <v-dialog
    :model-value="showDialog"
    @update:model-value="(value) => emit('update:showDialog', value)"
    max-width="500"
  >
    <template v-slot:default="{ isActive }">
      <v-card>
        <template #title>
          <h2 class="font-semibold text-xl">{{ title }}</h2>
        </template>

        <!-- <template #subtitle v-if="description"> </template> -->

        <h2 class="text-md mt-2 px-6 font-thin" v-if="description">
          {{ description }}
        </h2>
        <v-card-actions class="flex items-center gap-5">
          <v-btn @click="closeDialog">
            <span class="text-xs">Anuluj</span>
          </v-btn>
          <v-btn
            color="rgb(249 115 22)"
            height="30"
            variant="elevated"
            class="px-4"
            @click="emit('confirm')"
          >
            <span class="text-white text-xs">Potwierdź</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
