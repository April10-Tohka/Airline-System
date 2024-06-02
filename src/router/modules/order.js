import Layout from "@/layout/index.vue"
export default {
    path:"/order",
    name:"order",
    component:Layout,
    children:[
        {
            path:"",
            name:"order",
            component:()=>import("@/views/order/index.vue")
        }
    ]
}
