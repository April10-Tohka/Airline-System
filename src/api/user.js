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
