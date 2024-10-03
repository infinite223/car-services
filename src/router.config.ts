import { createMemoryHistory, createRouter, RouteRecordRaw } from "vue-router";

import CarServicesView from "./modules/car-services/car-services-view.vue";
import HomeView from "./modules/home/home-view.vue";
import LoginView from "./modules/home/login-view.vue";
import RegisterView from "./modules/home/register.view.vue";
import ServicesTable from "./modules/car-services/services/services-table.vue";
import OrdersTable from "./modules/car-services/orders/orders-table.vue";

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
  {
    path: "/car-services",
    component: CarServicesView,
    children: [
      { path: "/car-services", component: ServicesTable },
      {
        path: "/orders",
        component: OrdersTable,
      },
    ],
  },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
