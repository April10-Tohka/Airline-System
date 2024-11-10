export default [
  {
    path: "order111",
    name: "order",
    component: () => import("@/views/order/index.vue"),
    meta: {
      title: "订单路由",
      requiresAuth: true,
    },
  },
];
