<script setup>
import {reactive, ref,onUnmounted} from "vue";
import Schema from "async-validator";
import {phoneReg,captchaReg} from "@/utils/RegExp.js";
import { ElLoading } from 'element-plus'
import {getRegisterCaptchaApi,verifyCaptchaApi} from "@/api/user.js"
import {useEventBusStore} from "@/stores/modules/eventBus.js";
const emit=defineEmits(['next-step'])
//注册表单数据
const registerForm={
    phone:"13712345678",//手机号
    captcha:"123456"//验证码
}
//注册表单数据校验规则
const registerRules={
    phone: {
        type:"string",
        required:true,
        validator:(rule,value)=>{
            const errors=[];
            console.log("输入的手机号:",value);
            if(value==="")
            {
                errors.push(new Error("手机号不能为空"));
            }
            else if(!phoneReg(value))
            {
                errors.push(new Error("手机号格式不正确，请重新输入"));
            }
            return errors;
        }
    },
    captcha: {
        type:"string",
        required: true,
        validator:(rule,value)=>{
            const errors=[];
            console.log("输入的验证码:",value);
            if (value==="")
            {
                errors.push(new Error("请输入验证码"));
            }
            else if (!captchaReg(value))
            {
                errors.push(new Error("请输入正确的6位数字验证码"));
            }
            return errors;
        }
    }
}
//手机号校验规则
const phoneRules={
    phone:{
        type: "string",
        required: true,
        validator: (rule, value) => {
            const errors = [];
            console.log("输入的手机号:", value);
            if (value === "") {
                errors.push(new Error("手机号不能为空"));
            } else if (!phoneReg(value)) {
                errors.push(new Error("手机号格式不正确，请重新输入"));
            }
            return errors;
        }
    }
}
const validator = new Schema(registerRules);//校验注册表单
const verifyPhone=new Schema(phoneRules);//校验手机号
//是否注册失败
const registerFailure=reactive({})
onUnmounted(()=>{
    console.log("registerForm组件已卸载了！！！！");
})
/**
 * 处理下一步，设置密码逻辑
 */
function handleNextStep()
{
    console.log("点击了下一步设置密码按钮");
    const loadingInstance = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)'
    })
    validator.validate(registerForm)
        .then(()=>{
            console.log("校验通过了");
            verifyCaptchaApi(registerForm)
                .then(value => {
                    console.log("verifyCaptchaApi通过",value);
                    useEventBusStore().emitEvent("set-password",registerForm.phone);
                    emit("next-step",1);
                })
                .catch(err=>{
                    console.log("verifyCaptchaApi不通过！！！",err);
                    registerFailure.captcha=err.error;
                    if(err.to)
                    {
                        console.log("存在to");
                        setTimeout(()=>{
                            document.getElementById("error-captcha-message").innerHTML=
                                `该手机号已注册,请
                            <a href="/login" style="color: #007aff">直接登录</a>
                            `
                        },0)
                    }
                })
        })
        .catch(({errors,fields})=>{
            console.log("查看校验的错误:",errors,fields);
            //清空错误信息
            Object.keys(registerFailure).forEach(field=>{
                registerFailure[field]="";
            })
            //更新错误信息
            for(let i=0;i<errors.length;i++)
            {
                console.log(errors[i].field);
                registerFailure[errors[i].field]=errors[i].message;
            }
            console.log("registerFailure:",registerFailure);
            errors.map(item=>{console.log("错误信息：",item.message)});
            document.getElementById("send-captcha-tip").style.display="none";
        })
        .finally(()=>{
            setTimeout(()=>{
                loadingInstance.close();
            },500)
        })
}

let isSendCaptcha=ref(false);//是否成功发送验证码
let countdown=ref(60);//倒计时
let timer=null;//计时器
let aText="发送验证码";//发送验证码的标签文本
/**
 * 发送验证码
 */
function sendCaptcha()
{
    console.log("发送验证码");
    //校验手机号
    verifyPhone.validate({phone:registerForm.phone})
        .then(isValid=>{
            console.log("验证手机号通过",isValid);
            //获取验证码
            getRegisterCaptchaApi(registerForm.phone)
                .then(value => {
                    console.log("获取验证码成功",value);
                })
                .catch(err=>{
                    console.log("获取验证码失败",err);
                })
            //清空错误信息
            registerFailure.phone="";
            registerFailure.captcha="";
            //发送验证码成功
            isSendCaptcha.value=true;
            countdown.value=5;
            //设置样式
            document.getElementById("mobile-phone").style.borderColor="#cccccc";
            document.getElementById("send-captcha-tip").style.display="block";
            timer = setInterval(() => {
                if (countdown.value > 0)
                {
                    countdown.value--;
                }
                else
                {
                    clearInterval(timer);
                    isSendCaptcha.value = false;
                    aText="重发验证码";
                }
            }, 1000);
        })
        .catch(({errors,fields})=>{
            console.log("验证手机号不通过!!",errors);
            //清空错误信息
            registerFailure.phone="";
            registerFailure.captcha="";
            //更新错误信息
            registerFailure.phone=errors[0].message;
            console.log("registerFailure:",registerFailure);
            document.getElementById("mobile-phone").style.borderColor="#d80000";
            /** TRACK
             * 直接更改样式：如果样式的更改不依赖于最新的 DOM 状态，可以直接更改样式。
             * 使用 nextTick：如果样式的更改依赖于最新的 DOM 状态（例如，样式的更改需要依赖于更新后的响应式数据），应使用 nextTick 确保在 DOM 更新完成后再执行这些样式更改。
             */



        })
}
</script>

<template>
    <div class="reg-form">
        <form>
            <dl>
                <dt>手机号</dt>
                <dd>
                    <input type="text" placeholder="有效手机号" class="r-input " id="mobile-phone" v-model="registerForm.phone">
                </dd>
            </dl>
            <div class="error-phone" v-show="registerFailure.phone">
                <i class="icon-warn">
                    <svg t="1714274136236" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7148" width="16" height="16">
                        <path d="M513.9 106.5C290 106.5 108.4 288 108.4 512c0 223.9 181.5 405.5 405.5 405.5 223.9 0 405.5-181.5 405.5-405.5-0.1-224-181.6-405.5-405.5-405.5z m0 772.3C311.3 878.8 147 714.5 147 511.9 147 309.3 311.2 145 513.9 145c202.6 0 366.8 164.2 366.8 366.9 0 202.6-164.2 366.9-366.8 366.9z m0 0" fill="#DC630C" p-id="7149"></path><path d="M455.9 743.6c0 32 25.9 57.9 57.9 57.9s57.9-25.9 57.9-57.9c0-20.7-11-39.8-29-50.2-17.9-10.3-40-10.3-57.9 0-17.8 10.4-28.9 29.5-28.9 50.2z m0 0M513.9 222.3c-20.5 0-40.1 8.1-54.6 22.6-14.5 14.5-22.6 34.1-22.6 54.6s57.9 326.9 57.9 328.2c0 5.1 2 10 5.7 13.7 3.6 3.6 8.5 5.7 13.7 5.7 10.4-0.6 18.7-8.9 19.3-19.3l57.9-328.2c0-20.5-8.1-40.1-22.6-54.6-14.6-14.6-34.3-22.7-54.7-22.7z m0 0" fill="#DC630C" p-id="7150"></path>
                    </svg>
                </i>&nbsp;
                <span>{{registerFailure.phone}}</span>
            </div>
            <dl>
                <dt>短信验证码</dt>
                <dd>
                    <div class="input-auth-code">
                        <input type="text" class="r-input" placeholder="6位数字" v-model="registerForm.captcha">
                        <a href="javascript:void(0)" class="send-auth-code" id="send-captcha" @click="sendCaptcha"
                        :class="{disabled:isSendCaptcha}">
                            {{isSendCaptcha?countdown+"s" : aText}}
                        </a>
                    </div>
                </dd>
            </dl>
            <div class="error-auth-code" v-show="registerFailure.captcha">
                <i class="icon-warn">
                    <svg t="1714274136236" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7148" width="16" height="16">
                        <path d="M513.9 106.5C290 106.5 108.4 288 108.4 512c0 223.9 181.5 405.5 405.5 405.5 223.9 0 405.5-181.5 405.5-405.5-0.1-224-181.6-405.5-405.5-405.5z m0 772.3C311.3 878.8 147 714.5 147 511.9 147 309.3 311.2 145 513.9 145c202.6 0 366.8 164.2 366.8 366.9 0 202.6-164.2 366.9-366.8 366.9z m0 0" fill="#DC630C" p-id="7149"></path><path d="M455.9 743.6c0 32 25.9 57.9 57.9 57.9s57.9-25.9 57.9-57.9c0-20.7-11-39.8-29-50.2-17.9-10.3-40-10.3-57.9 0-17.8 10.4-28.9 29.5-28.9 50.2z m0 0M513.9 222.3c-20.5 0-40.1 8.1-54.6 22.6-14.5 14.5-22.6 34.1-22.6 54.6s57.9 326.9 57.9 328.2c0 5.1 2 10 5.7 13.7 3.6 3.6 8.5 5.7 13.7 5.7 10.4-0.6 18.7-8.9 19.3-19.3l57.9-328.2c0-20.5-8.1-40.1-22.6-54.6-14.6-14.6-34.3-22.7-54.7-22.7z m0 0" fill="#DC630C" p-id="7150"></path>
                    </svg>
                </i>&nbsp;
                <span id="error-captcha-message">
                    {{registerFailure.captcha}}
                </span>
            </div>
            <div class="success-auth-code" id="send-captcha-tip">
                <i class="icon-success">
                    <svg t="1716453972273" class="icon-success" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3275" width="16" height="16">
                        <path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m238.933333 349.866666l-2.133333 2.133334-277.333333 277.333333c-10.666667 10.666667-29.866667 12.8-42.666667 2.133333L426.666667 704l-149.333334-149.333333c-12.8-12.8-12.8-32 0-44.8 10.666667-10.666667 29.866667-12.8 42.666667-2.133334l2.133333 2.133334 125.866667 125.866666 253.866667-253.866666c10.666667-10.666667 29.866667-12.8 42.666666-2.133334l2.133334 2.133334c12.8 12.8 12.8 32 4.266666 42.666666z" fill="#1afa29" p-id="3276"></path>
                    </svg>
                </i>&nbsp;
                <span>
                    验证码已发送，请注意查收
                </span>
            </div>

            <dl>
                <dt></dt>
                <dd>
                    同意<a href="javascript:void(0)">《服务协议》</a>和<a href="javascript:void(0)">《隐私政策》</a>
                </dd>
            </dl>
            <dl>
                <dt></dt>
                <dd>
                    <button type="button" class="reg-btn" @click="handleNextStep">下一步，设置密码</button>
                </dd>
            </dl>
        </form>
    </div>
</template>

<style scoped>
.reg-form
{
    dl
    {
        padding: 10px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        dt
        {
            margin-right: 10px;
            width: 130px;
            line-height: 36px;
            font-size: 14px;
            text-align: right;
        }
    }
    .r-input
    {
        height: 36px;
        line-height: 36px;
        padding-left: 10px;
        font-size: 14px;
        color: #333333;
        border: 1px solid #cccccc;
        vertical-align: middle;
    }
    #mobile-phone:focus
    {
        outline: 2px solid black;
    }
    div.input-auth-code
    {
        width: 300px;
        height: 40px;
        padding: 5px;
        border: 1px solid #dddddd;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        position: relative;
        a.send-auth-code
        {
            width: 100px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 12px;
            color: #3882e5;
            text-decoration: none;
            position: relative;
            right: -15px;
        }
        a.send-auth-code:hover
        {
            text-decoration: underline;
        }
        /*发送验证码成功，进入倒计时的样式*/
        a.disabled
        {
            cursor: no-drop;
            color: #999999;
        }
        a.disabled:hover
        {
            text-decoration: none;
        }

    }
    button.reg-btn
    {
        width: 220px;
        height: 42px;
        color: #ffffff;
        font-size: 16px;
        cursor: pointer;
        text-align: center;
        margin-bottom: 8px;
        border: none;
        border-radius: 4px;
        background-color: #ff9a14;
        outline: none;
    }
    button.reg-btn:hover
    {
        background-color: #CC7B10;
    }

    .error-phone,.error-auth-code,.success-auth-code
    {
        border: 1px solid #dca;
        color: #666666;
        max-width: 300px;
        margin-left: 140px;
        padding-right: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 12px;
    }
    .error-phone,.error-auth-code
    {
        border-color: #dca;
        background-color: #fffadc;
    }
    .success-auth-code
    {
        background-color: #ebf9e5;
        border-color:#b7d6aa ;
        display: none;
    }
    .icon-warn,.icon-success
    {
        position: relative;
        top: 2px;
    }
}
</style>
