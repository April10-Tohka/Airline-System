import { defineStore } from "pinia";
import { phoneLogin } from "@/api/auth.js";

const ACCESS_TOKEN_KEY = "accessToken";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || null, // 初始化时从 localStorage 获取 token
    isLoggedIn: !!localStorage.getItem(ACCESS_TOKEN_KEY), // 检查是否已登录
  }),
  getters: {},
  actions: {
    /**
     * 使用手机号密码登录
     * @param loginForm
     * @returns {Promise<unknown>}
     */
    loginWithPhonePassword(loginForm) {
      console.log("接受到loginform：", loginForm);
      return new Promise((resolve, reject) => {
        // 调用手机号密码登录api接口
        console.log("=>(auth.js:18) 调用手机号密码登录api接口 ");
        phoneLogin(loginForm)
          .then(this.setToken)
          .then(() => {
            resolve();
          })
          .catch((err) => {
            console.log("phoneLogin 的catch", err);
            reject(err);
          });
      });
    },

    // 设置 accessToken 和登录状态，并存储到 localStorage
    setToken(response) {
      const {
        data: { accessToken },
      } = response;
      this.accessToken = accessToken;
      this.isLoggedIn = true;
      // 持久化存储 accessToken
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    },

    // 清除 token 和登录状态，并从 localStorage 移除
    logout() {
      console.log("=>(auth.js:47) 执行logout操作 ");
      this.accessToken = null;
      this.isLoggedIn = false;

      // 从 localStorage 移除 token
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    },
  },
});
