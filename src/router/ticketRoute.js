export default [
  {
    path: "ticket/:departureCity/:arriveCity/:departDate/:departureCityCode/:arriveCityCode",
    name: "ticket",
    component: () => import("@/views/ticket/index.vue"),
    props: true,
    meta: {
      title: "飞机票路由",
      requiresAuth: false,
    },
  },
];
