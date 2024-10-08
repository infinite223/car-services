import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
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

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(vuetify)
  .use(router)
  .use(VueFire, {
    firebaseApp: app,
    modules: [VueFireAuth()],
  })
  .mount("#app");
