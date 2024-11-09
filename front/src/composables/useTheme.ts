import { ref, watch, onMounted } from "vue";

const color = ref<string>("#ff0000"); 
const theme = ref<string>("light"); 

function setColor(newColor: string) {
  color.value = newColor;
  localStorage.setItem("userColor", newColor);
}

function setTheme(newTheme: string) {
  theme.value = newTheme;
  localStorage.setItem("userTheme", newTheme);
}

function initializeTheme() {
  const savedColor = localStorage.getItem("userColor");
  const savedTheme = localStorage.getItem("userTheme");
  if (savedColor) color.value = savedColor;
  if (savedTheme) theme.value = savedTheme;
}

onMounted(initializeTheme);

export function useTheme() {
  return {
    color,
    theme,
    setColor,
    setTheme,
  };
}
