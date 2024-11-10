export default [
  {
    path: "my",
    name: "my",
    component: () => import("@/views/my/index.vue"),
    meta: {
      title: "我的路由",
      requiresAuth: true,
    },
    children: [
      {
        path: "order",
        name: "order",
        component: () => import("@/views/my/order/index.vue"),
        meta: {
          title: "订单路由",
          requiresAuth: true,
        },
      },
      {
        path: "profile",
        name: "myProfile",
        component: () => import("@/views/my/profile/index.vue"),
        meta: {
          title: "个人信息路由",
          requiresAuth: true,
        },
      },
      {
        path: "avatar",
        name: "myAvatar",
        component: () => import("@/views/my/avatar/index.vue"),
        meta: {
          title: "头像路由",
          requiresAuth: true,
        },
      },
    ],
  },
];
