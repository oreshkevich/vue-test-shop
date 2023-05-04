import { createRouter, createWebHashHistory } from "vue-router";
import CardViews from "../views/CardViews.vue";

const routes = [
  {
    path: "/",
    name: "shop",
    component: CardViews,
  },
  {
    path: "/basket",
    name: "basket",

    component: () => import("../views/BasketViews.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
