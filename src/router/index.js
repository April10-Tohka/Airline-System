import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/index.vue";
import flightQuery from "@/router/modules/flightQuery.js";
import order from "@/router/modules/order.js";
import ticket from "@/router/modules/ticket.js";
import login from "@/router/modules/login.js";
import register from "@/router/modules/register.js";
import my from "@/router/modules/my.js";
import { beforeEach, afterEach } from "./permission.js";
import homeRoute from "@/router/homeRoute.js";
import testRoute from "@/router/testRoute.js";
import authRoute from "@/router/authRoute.js";
import ticketRoute from "@/router/ticketRoute.js";
import flightQueryRoute from "@/router/flightQueryRoute.js";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      redirect: "home",
      children: [
        ...homeRoute,
        ...testRoute,
        ...ticketRoute,
        ...flightQueryRoute,
      ],
    },
    ...authRoute,
    my,
  ],
});

export default router;
