export default [
  {
    path: "test",
    name: "test",
    component: () => import("@/test/Main.vue"),
    meta: {
      title: "测试路由",
      requiresAuth: true,
    },
  },
];
