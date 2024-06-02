import Layout from "@/layout/index.vue"
export default {
    path:"/ticket",
    name:"ticket",
    component:Layout,
    children:[
        {
            path:"",
            name:"ticket",
            component:()=>import("@/views/ticket/index.vue")
        }
    ]
}
