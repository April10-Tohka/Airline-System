import request from "@/utils/request.js"


/**
 * 账号密码登录Api
 * @param data 表单数据  phone password
 * @returns {*}
 */
export function accountLoginApi(data)
{
    return request({
        url:"auth/login",
        method:"post",
        data
    })
}


/**
 * 获取注册验证码
 * @param phone 手机号
 * @returns {*}
 */
export function getRegisterCaptchaApi(phone)
{
    return request({
        url:"/auth/register/send-captcha",
        method:"post",
        data:{
            phone
        }
    })
}

/**
 * 注册时校验手机号验证码
 * @param data {{phone,captcha}}
 * @returns {*}
 */
export function verifyCaptchaApi(data)
{
    return request({
        url:"/auth/register/verify-captcha",
        method:"post",
        data
    })
}
