<script setup lang="ts">
import { PropType, ref } from "vue";
import { Car } from "../../../models";
import AddCarServiceDialog from "./add-car-service-dialog.vue";
import CarMenu from "./car-menu.vue";

const showExpandedDetails = ref(false);
const props = defineProps({
  car: {
    type: Object as PropType<Car>,
    required: true,
  },
});
</script>

<template>
  <v-card
    max-width="300"
    min-width="250"
    :subtitle="props.car.make"
    :text="props.car.vin"
  >
    <template #title>
      <div class="w-full flex items-center justify-between">
        <span>{{ props.car.model?.toUpperCase() }}</span>
        <car-menu :car="props.car" />
      </div>
    </template>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        :icon="showExpandedDetails ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="showExpandedDetails = !showExpandedDetails"
      ></v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="showExpandedDetails">
        <v-divider></v-divider>

        <v-card-text>
          <div class="font-weight-bold ms-1 mb-2">Usługi:</div>

          <v-timeline align="start" density="compact">
            <v-timeline-item
              v-for="(service, id) in props.car.services"
              :key="id"
              :dot-color="service.done ? 'green' : 'gray'"
              size="x-small"
            >
              <div class="mb-4">
                <div class="font-weight-normal">
                  <strong>{{ service.name }}</strong>
                </div>

                <div class="line-clamp-2">{{ service.description }}</div>
                <div class="line-clamp-2 text-xs">
                  {{ new Date(service.startDate?.toDate()) }}
                </div>
              </div>
            </v-timeline-item>
          </v-timeline>

          <div class="flex flex-col gap-2 mt-2">
            <div class="ml-1" v-if="!props.car.services">
              Aktualnie nie ma usług
            </div>
            <add-car-service-dialog :car-id="car.id" />
          </div>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>
