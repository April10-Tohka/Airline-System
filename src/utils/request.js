import axios from "axios";
const baseURL="http://localhost:3000";
const server=axios.create({
    baseURL,
    timeout:5000
})

// 请求拦截器
server.interceptors.request.use((config)=>{
    return config
},(error)=>{
    return Promise.reject(error);
})

//响应拦截器
server.interceptors.response.use((response)=>{
    return response;
},(error)=>{
    return Promise.reject(error);
})

export  default server;
