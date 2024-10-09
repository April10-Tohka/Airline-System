import Layout from "@/layout/index.vue";

export default {
  path: "/my",
  name: "my",
  component: Layout,
  children: [
    {
      path: "",
      name: "my",
      component: () => import("@/views/my/index.vue"),
    },
    {
      path: "order",
      name: "order",
      component: () => import("@/views/my/index.vue"),
      children: [
        {
          path: "",
          name: "order",
          component: () => import("@/views/my/order/index.vue"),
        },
      ],
    },
    {
      path: "profile",
      name: "myProfile",
      component: () => import("@/views/my/index.vue"),
      children: [
        {
          path: "",
          name: "myProfile",
          component: () => import("@/views/my/profile/index.vue"),
        },
      ],
    },
    {
      path: "avatar",
      name: "myAvatar",
      component: () => import("@/views/my/index.vue"),
      children: [
        {
          path: "",
          name: "myAvatar",
          component: () => import("@/views/my/avatar/index.vue"),
        },
      ],
    },
  ],
};
