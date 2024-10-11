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
