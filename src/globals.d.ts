// src/globals.d.ts
export {};

declare global {
  interface Window {
    $htmlToPaper: (element: HTMLElement, options?: object) => void;
  }
}
