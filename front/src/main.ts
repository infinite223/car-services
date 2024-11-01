import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "vue-toast-notification/dist/theme-bootstrap.css";
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router.config";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VueFire, VueFireAuth } from "vuefire";
import { app } from "./services/firebase.config";
import { VueHtmlToPaper } from "vue-html-to-paper";
import { VDateInput } from "vuetify/lib/labs/components.mjs";
import ToastPlugin from "vue-toast-notification";

const options = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css",
  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
};

const vuetify = createVuetify({
  components: {
    ...components,
    VDateInput,
  },
  directives,
});

createApp(App)
  .use(vuetify)
  .use(router)
  .use(ToastPlugin)
  .use(VueFire, {
    firebaseApp: app,
    modules: [VueFireAuth()],
  })
  .use(VueHtmlToPaper, options)
  .mount("#app");
