import { defineStore } from "pinia";
import { phoneLogin, captchaLogin, refreshToken, logout } from "@/api/auth.js";
import { useUserStore } from "@/stores/modules/user1.js";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || null, // 初始化时从 localStorage 获取 token
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY) || null,
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
          .then(useUserStore().setUserProfile)
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
      const { accessToken, refreshToken, user } = response;
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.isLoggedIn = true;
      // 持久化存储 accessToken
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      return Promise.resolve(user);
    },

    // 清除 token 和登录状态，并从 localStorage 移除
    logoutAndClearJWT() {
      console.log("=>(auth.js:47) 执行logout操作 ");
      this.accessToken = null;
      this.refreshToken = null;
      this.isLoggedIn = false;

      // 从 localStorage 移除 token
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      logout(useUserStore().phone);
    },

    /**
     * 使用手机验证码登录
     */
    loginWithPhoneCaptcha(captchaForm) {
      console.log("=>(auth.js:60) captchaForm", captchaForm);
      return new Promise((resolve, reject) => {
        // 调用手机号验证码登录api接口
        captchaLogin(captchaForm)
          .then(this.setToken)
          .then(useUserStore().setUserProfile)
          .then(() => {
            resolve();
          })
          .catch((err) => {
            console.log("=>(auth.js:68) err", err);
            reject(err);
          });
      });
    },

    //刷新 accessToken 和 refreshtoken
    refreshAccessTokenAndRefreshToken() {
      return new Promise((resolve, reject) => {
        //调用刷新双token api
        console.log("//调用刷新双token api");
        refreshToken()
          .then(this.setToken)
          .then((message) => {
            console.log("=>(auth.js:89) message", message);
            console.log("刷新双token的操作成功后，resolve！");
            resolve();
          })
          .catch((err) => {
            console.log("=>(auth.js:94) 刷新双token失败", err);
            reject(err);
          });
      });
    },
  },
});
