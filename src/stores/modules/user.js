import { defineStore } from 'pinia'
import {ref} from "vue";
import {accountLoginApi} from "@/api/user.js"
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
                console.log(" accountLoginApi返回的",res);
                //设置token
                setToken(res.data.token);
                token.value=res.data.token;
            })
    }

    return {token,accountLogin}
})
