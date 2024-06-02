import { createRouter, createWebHistory } from 'vue-router'
import Layout from "@/layout/index.vue"
import flightQuery from "@/router/modules/flightQuery.js";
import order from "@/router/modules/order.js";
import ticket from "@/router/modules/ticket.js";
import login from "@/router/modules/login.js";
import register from "@/router/modules/register.js";
import {beforeEach,afterEach} from "./permission.js"

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
                    component:()=>import("@/views/home/index.vue")
                },
            ]
        },
        flightQuery,
        ticket,
        order,
        login,
        register
    ]
})

export default router
