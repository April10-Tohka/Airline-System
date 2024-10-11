import axios from "axios";
const baseURL = "http://localhost:3000";
const server = axios.create({
  baseURL,
  timeout: 5000,
});
// 添加请求拦截器
server.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    console.log("=>(request.js:14) 发送请求前");
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    console.log("=>(request.js:20) 发送请求错误");
    return Promise.reject(error);
  },
);

// 添加响应拦截器
server.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log("=>(request.js:30) 响应成功", response);
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log("=>(request.js:38) 响应失败", error);
    return Promise.reject(error.response.data.message);

    if (!error.response) {
      console.error("Network Error:", error.message);
      alert("网络错误，请稍后再试");
      return;
    }
    const status = error.response.status; //获取http状态码
    switch (status) {
      case 400:
        console.error(
          "Bad Request:",
          error.response.data.message || "请求错误",
        );
        alert("请求错误，请检查输入");
        break;
      case 401:
        console.error("Unauthorized:", error.response.data.message || "未授权");
        alert("未授权，请登录");
        // 重定向到登录页，或者触发退出登录逻辑
        break;
      case 403:
        console.error("Forbidden:", error.response.data.message || "禁止访问");
        alert("禁止访问，您没有权限");
        break;
      case 404:
        console.error(
          "Not Found:",
          error.response.data.message || "资源未找到",
        );
        alert("资源未找到，请检查 URL");
        break;
      case 500:
        console.error(
          "Server Error:",
          error.response.data.message || "服务器错误",
        );
        alert("服务器错误，请稍后再试");
        break;
      default:
        console.error(
          "Unexpected Error:",
          error.response.data.message || "未知错误",
        );
        alert("未知错误，请稍后再试");
    }
  },
);

export default server;
