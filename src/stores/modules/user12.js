import { defineStore } from 'pinia'
import {ref} from "vue";
import {accountLoginApi,setPasswordApi} from "@/api/user.js"
import {getToken,setToken,removeToken} from "@/utils/auth.js"

export const useUserStore=defineStore("user",()=>{
    const token=ref(getToken() || "");

    /**
     * 账号密码登录
     * @param accountForm 账号密码表单数据
     * @returns {*} Promise
     */
    function accountLogin(accountForm)
    {
        console.log("调用了UserStore里的accountLogin函数")
        return accountLoginApi(accountForm)
            .then(res=>{
                console.log(" accountLoginApi返回成功！！",res);
                //设置token
                setToken(res.data.token);
                token.value=res.data.token;
                return {
                    status:res.status,
                    message:res.data.message
                }
            })
            .catch(err=>{
                console.log("accountLoginApi返回失败！！！",err);
                throw err;
            })
    }


    /**
     * 注册
     * @param regForm 注册表单数据 {phone,password}
     */
    function register(regForm)
    {
        console.log("调用了UserStore里的register函数");
        return setPasswordApi(regForm)
            .then(res=>{
                console.log("setPasswordApi成功！",res);
                //设置token
                setToken(res.data.token);
                token.value=res.data.token;
                return {
                    status:res.status,
                    message:res.data.message
                }
            })
            .catch(err=>{
                console.log("setPasswordApi失败！！！！",err);
                throw err;
            })
    }

    /**
     * 退出登录
     * @returns {Promise<Awaited<string>>} 返回fulfilled状态的Promise
     */
    function logout()
    {
        console.log("调用了UserStore里的logout函数");
        token.value="";
        removeToken();
        return Promise.resolve("OK");
    }

    return {token,accountLogin,register,logout}
})
