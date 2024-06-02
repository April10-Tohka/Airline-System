import Layout from "@/layout/index.vue"
export default {
    path:"/flightQuery",
    name:"flightQuery",
    component:Layout,
    children:[
        {
            path:"",
            name:"flightQuery",
            component:()=>import("@/views/flightQuery/index.vue")
        }
    ]
}
