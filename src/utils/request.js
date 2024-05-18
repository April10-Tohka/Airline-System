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
},(err)=>{
    console.log("这里是axios的响应拦截器的处理错误的回调函数");
    console.log("查看错误是：",err);
    return Promise.reject({
        error:err.response.data.error,
        status:err.response.status
    });
})

export  default server;
