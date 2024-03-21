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
          path:"ticketResult",
          name:"ticketResult",
          component:()=>import("@/views/ticketResult.vue")
        },
        {
          path:"flightQuery",
          name:"flightQuery",
          component:()=>import("@/views/flightQuery/index.vue")
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
    },
    {
      path:"/myorder",
      component:()=>import("@/views/myorder/index.vue")
    }
  ]
})

export default router
