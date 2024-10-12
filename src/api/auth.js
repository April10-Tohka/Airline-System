import request from "@/utils/request.js";

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
