import { createMemoryHistory, createRouter, RouteRecordRaw } from "vue-router";

import AboutView from "./AboutView.vue";
import App from "./App.vue";
import CarServicesView from "./modules/car-services/car-services-view.vue";
import HomeView from "./modules/home/home-view.vue";
import LoginView from "./modules/home/login-view.vue";
import RegisterView from "./modules/home/register.view.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: HomeView,
    children: [
      {
        path: "/",
        component: LoginView,
      },
      {
        path: "/register",
        component: RegisterView,
      },
    ],
  },
  { path: "/car-services", component: CarServicesView },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
