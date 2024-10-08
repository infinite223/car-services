<script setup lang="ts">
import { ref, computed, watch } from "vue";

const counter = ref(0);
let timer = null;
const randomNumber = ref(0);
const keyDownEventValue = ref("");
const keyDownEventValueWithEnter = ref("");

const showAlert = () => {
  alert("alert");
};

const keyDownEvent = (event: KeyboardEvent) => {
  const target = event.target as HTMLInputElement;

  keyDownEventValue.value = target.value;
};

const keyDownEventWithEnter = (event: KeyboardEvent) => {
  const target = event.target as HTMLInputElement;

  if (event.key === "Enter") {
    keyDownEventValueWithEnter.value = target.value;
  }
};

const message = computed(() => {
  if (counter.value < 37) {
    return "Jeszcze nie";
  } else if (counter.value === 37) {
    return "Osiągnięto wartość";
  } else {
    return "Za dużo!";
  }
});

const addValue = (value) => {
  counter.value += value;
  resetAfter5Seconds();
};

const resetAfter5Seconds = () => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    counter.value = 0;
  }, 5000);
};

const generateRandomNumber = () => {
  randomNumber.value = Math.random();
};

watch(counter, () => {
  resetAfter5Seconds();
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <h2>Zadanie 2</h2>
    <v-btn @click="showAlert">ShowAlert</v-btn>
    <input type="text" @keydown="keyDownEvent" />
    <p>{{ keyDownEventValue }}</p>

    <input
      class="border-2 border-zinc-900"
      type="text"
      @keydown="keyDownEventWithEnter"
    />

    <p>{{ keyDownEventValueWithEnter }}</p>

    <h2>Zadanie 3</h2>
    <v-btn @click="addValue(5)">Dodaj 5</v-btn>
    <v-btn @click="addValue(1)">Dodaj 1</v-btn>

    <p>{{ message }}</p>
    <p>Result: {{ counter }}</p>
    <div class="flex items-center gap-2 mt-4">
      <v-btn variant="elevated" class="" @click="generateRandomNumber">
        <span>Generuj</span>
      </v-btn>
      <p>Random number 0 - 1: {{ randomNumber }}</p>
    </div>
  </div>
</template>

<style scoped>
button {
  margin-right: 10px;
}
</style>

<!-- 
    - lista zleceń
    - dodanie zlecenia dla nowego lub istniejącego pojazdu  
    - weyfikacja najbliższych zleceń
    - przypisywanie zleceń dla pracowników 
-->
