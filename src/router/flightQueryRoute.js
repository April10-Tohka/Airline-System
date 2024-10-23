export default [
  {
    path: "flightQuery",
    name: "flightQuery",
    component: () => import("@/views/flightQuery/index.vue"),
    meta: {
      title: "查询航班动态路由",
      requiresAuth: false,
    },
  },
];
