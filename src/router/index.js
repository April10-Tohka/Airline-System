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
        }
      ]
    }
  ]
})

export default router
