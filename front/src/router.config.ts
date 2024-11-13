import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import CarServicesView from "./modules/car-services/car-services-view.vue";
import HomeView from "./modules/home/home-view.vue";
import LoginView from "./modules/home/login-view.vue";
import RegisterView from "./modules/home/register.view.vue";
import ServicesTable from "./modules/car-services/services/services-table.vue";
import OrdersTable from "./modules/car-services/orders/orders-table.vue";
import CarsView from "./modules/car-services/cars/cars-view.vue";
import CarOrdersView from "./modules/car-services/car-oreders/car-orders-view.vue";
import UsersView from "./modules/car-services/users/users-view.vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase.config";
import NotFoundView from "./modules/car-services/not-found-view.vue";
import CarsDetailView from "./modules/car-services/cars/car/cars-detail-view.vue";

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
    meta: { requiresAuth: true },
    children: [
      {
        path: "/car-services",
        component: ServicesTable,
        alias: "/car-services",
      },
      {
        path: "/orders",
        component: OrdersTable,
      },
      {
        path: "/car-orders",
        component: CarOrdersView,
      },
      {
        path: "/cars",
        component: CarsView,
        children: [
          {
            path: "detail/:id",
            component: CarsDetailView,
            props: true,
          },
        ],
      },
      {
        path: "/users",
        component: UsersView,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundView,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        next();
      } else {
        next("/");
      }
    });
  } else {
    next();
  }
});

export default router;
