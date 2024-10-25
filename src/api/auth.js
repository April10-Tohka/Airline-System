import request from "@/utils/request.js";
import { useAuthStore } from "@/stores/modules/auth.js";

/**
 * 手机号密码登录接口
 * @param form phone,password
 * @returns {*}
 */
export function phoneLogin(form) {
  return request({
    url: "/auth/login/phone-password",
    method: "post",
    data: form,
  });
}

/**
 * 发送验证码接口
 * @param phone 手机号
 * @returns {*}
 */
export function sendCaptcha(phone) {
  return request({
    url: "/auth/send-captcha",
    method: "post",
    data: { phone },
  });
}

/**
 * 手机号验证码登录接口
 * @returns {*}
 * @param form
 */
export function captchaLogin(form) {
  return request({
    url: "/auth/login/phone-captcha",
    method: "post",
    data: form,
  });
}

/**
 * 调用刷新双token接口
 * @returns {*}
 */
export function refreshToken() {
  return request({
    url: "/auth/refresh-access-token",
    method: "post",
    headers: {
      RefreshToken: `Bearer ${useAuthStore().refreshToken}`,
    },
  });
}
