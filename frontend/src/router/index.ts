import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import HomeView from "../views/HomeView.vue";
import { getUser } from "../stores/session";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      beforeEnter: () => {
        return getUser() ? true : "/";
      }
    }
  ]
});

export default router;
