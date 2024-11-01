// src/composables/useTheme.ts
import { ref, watch, onMounted } from "vue";

// Zdefiniowanie reaktywnego stanu dla koloru i motywu
const color = ref<string>("#ff0000"); // Domyślny kolor
const theme = ref<string>("light"); // Domyślny motyw

// Funkcja ustawiająca kolor i zapisująca go do localStorage
function setColor(newColor: string) {
  color.value = newColor;
  localStorage.setItem("userColor", newColor);
}

// Funkcja ustawiająca motyw i zapisująca go do localStorage
function setTheme(newTheme: string) {
  theme.value = newTheme;
  localStorage.setItem("userTheme", newTheme);
}

// Funkcja inicjalizująca stan z wartości zapisanych w localStorage
function initializeTheme() {
  const savedColor = localStorage.getItem("userColor");
  const savedTheme = localStorage.getItem("userTheme");
  if (savedColor) color.value = savedColor;
  if (savedTheme) theme.value = savedTheme;
}

// Wywołanie initializeTheme przy załadowaniu composable
onMounted(initializeTheme);

// Export funkcji i stanu, które będą dostępne globalnie
export function useTheme() {
  return {
    color,
    theme,
    setColor,
    setTheme,
  };
}
