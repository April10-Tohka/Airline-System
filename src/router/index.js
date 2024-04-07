import { createRouter, createWebHistory } from 'vue-router'
import Layout from "@/layout/index.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
    {
      path:"/",
      component:Layout,
      redirect:"home",
      children:[
        {
          path:"home",
          name:"home",
          component:()=>import("@/views/Homepage.vue")
        },
        {
          path:"ticket",
          name:"ticket",
          component:()=>import("@/views/ticket/index.vue")
        },
        {
          path:"flightQuery",
          name:"flightQuery",
          component:()=>import("@/views/flightQuery/index.vue")
        },
        {
          path:"admin",
          component:()=>import("@/views/admin/index.vue"),//显示后台管理的layout组件
          children:[
            {
              path:'flightManage',
              component:()=>import("@/views/admin/flightManage/index.vue"),
              meta:{
                title:"航班管理"
              }
            },
            {
              path:'ticketManage',
              component:()=>import("@/views/admin/ticketManage/index.vue"),
              meta:{
                title:"机票管理"
              }
            }
          ],
          meta:{
            title:"后台管理"
          }
        },
        {
          path:"/order",
          component:()=>import("@/views/order/index.vue")
        }
      ]
    },
    {
      path:"/login",
      component:()=>import("@/views/login/index.vue")
    },
    {
      path:"/register",
      component:()=>import("@/views/register/index.vue")
    }
  ]
})

export default router
