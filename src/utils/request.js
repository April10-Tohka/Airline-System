import axios from "axios";
import { useAuthStore } from "@/stores/modules/auth.js";
const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://8.138.9.94:3000"
    : "http://8.138.9.94:8080";
const server = axios.create({
  baseURL,
  timeout: 5000,
});
// 添加请求拦截器
server.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    console.log("=>(request.js:14) 发送请求前", config);
    config.headers.setAuthorization(`Bearer ${useAuthStore().accessToken}`);
    return config;
  },
  function (err) {
    // 对请求错误做些什么
    console.log("=>(request.js:20) 发送请求错误");
    return Promise.reject(err);
  },
);

// 添加响应拦截器
server.interceptors.response.use(
  function (res) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log("=>(request.js:30) 响应成功", res);
    return res.data.data;
  },
  function (err) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log("=>(request.js:38) 响应失败", err);
    const authStore = useAuthStore();
    const status = err.response.status; //获取http状态码
    const config = err.config; //获取请求配置config
    switch (status) {
      case 401:
        console.error("Unauthorized 未授权", err.response.data.error.message);
        //使用refreshToken 去刷新token
        //todo:防止多次点击由于过期而都去刷新token，解决重复请求刷新token问题
        return authStore.refreshAccessTokenAndRefreshToken().then(() => {
          // 刷新token成功后继续原来的操作
          console.log("通知了刷新双token成功，所以我去继续原来的操作");
          return server(config);
        });
      case 403:
        console.error("403情况下，refreshToken 不可信，要重新登录");
        //执行退出登录
        return authStore.logoutAndClearJWT().then(() => {
          // 跳转到登录页
          window.location.href = "/login";
          return Promise.reject("跳转到login重新登录");
        });
      default:
        console.log("status状态码不再在以上情况");
        return Promise.reject(err.response.data.message);
    }
  },
);

export default server;
