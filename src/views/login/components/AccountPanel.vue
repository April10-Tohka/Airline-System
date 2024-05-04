<script setup>
const emit=defineEmits(['changeCurrentIndex']);
//点击验证码登录
const verifyCodeLogin=()=>{
    console.log("点击了验证码登录");
    emit('changeCurrentIndex',1);
}
</script>

<template>
<div class="account-panel">
    <form class="form-wrap">
        <dl>
            <dd>
                <input type="text" placeholder="国内手机号/用户名/邮箱/卡号" class="r-input">
            </dd>
        </dl>
        <dl>
            <dd class="r-input input-auth-code">
                <input type="password" placeholder="登录密码" class="p-input">
                <a href="#" class="forget-pwd">忘记密码</a>
            </dd>
        </dl>
        <dl>
            <dd>
                <button type="button" class="login-button">登录</button>
            </dd>
        </dl>
    </form>
    <div class="form-wrap">
        <div class="agreement-list">
            <div class="checkbox-agreement">
                <input type="checkbox" id="checkbox-agreement-input">
                <label for="checkbox-agreement-input"></label>
            </div>
            <div class="agreement-entry">
                阅读并同意携程的<a href="javascript:void(0)">服务协议</a>和<a href="javascript:void(0)">个人信息保护政策</a>
            </div>
        </div>
        <dl>
            <dd>
                <div class="login-set">
                    <a href="javascript:void(0)" @click="verifyCodeLogin">验证码登录</a>
                    <a href="/register"  target="_blank" >免费注册</a>
                </div>
            </dd>
        </dl>
        <div class="web-login">
            <div class="login-other">
                <a href="javascript:void(0)" class="icon-alipay">支付宝</a>
                <a href="javascript:void(0)" class="icon-qq">QQ</a>
                <a href="javascript:void(0)" class="icon-baidu">百度</a>
                <a href="javascript:void(0)" class="icon-sina">新浪微博</a>
                <a href="javascript:void(0)" class="icon-wechat">微信</a>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
/*设置表单样式*/
.form-wrap
{
    input::placeholder
    {
        color: #cccccc;
    }
    dl
    {
        padding: 8px 0;
        .r-input
        {
            width: 300px;
            height: 28px;
            padding: 5px 5px 5px 13px;
            line-height: 28px;
            border: 1px solid #cccccc;
            font-size: 14px;
            color: #333333;
            vertical-align: center;
            position: relative;
        }
        .p-input
        {
            border: none;
            width: 200px;
            height: 28px;
            line-height: 28px;
            font-size: 14px;
            background-color: #ffffff;
        }
        .input-auth-code
        {
            width: 225px;
            padding-right: 80px;
        }
        a.forget-pwd
        {
            width: 80px;
            height: 40px;
            line-height: 40px;
            position: absolute;
            font-size: 12px;
            text-align: center;
            top: 0;
            right: 0;
            display: inline-block;
        }
        a.forget-pwd:hover
        {
            text-decoration: underline;
        }
        button.login-button
        {
            background-color: #ff9a14;
            height: 42px;
            color: #ffffff;
            font-size: 16px;
            cursor: pointer;
            border: none;
            border-radius: 4px;
            width: 100%;
            letter-spacing: 10px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }
        button.login-button:hover
        {
            background-color: #cc7d10;
        }
    }
}
/*设置同意服务协议的样式*/
.agreement-list
{
    display: flex;
    flex-direction: row;
    align-items: center;
    .agreement-entry
    {
        color: rgb(153,153,153);
        font-size: 12px;
        a
        {
            padding: 0 3px;
            text-align: left;
            color: #0086f6;
        }
        a:hover
        {
            text-decoration: underline;
        }
    }
}
/*设置同意协议的复选框的样式*/
.checkbox-agreement
{
    /* 隐藏原始的复选框 */
    input[type="checkbox"] {
        display: none;
    }

    /* 创建圆形元素 */
    input[type="checkbox"] + label:before {
        content: '';
        display: inline-block;
        width: 14px;
        height: 14px;
        border: 1px solid #ccc;
        border-radius: 50%;
        margin-right: 5px;
        vertical-align: middle;
    }

    /* 设置选中时的样式 */
    input[type="checkbox"]:checked + label:before {
        content: '\2713'; /* Unicode 编码为√符号 */
        border: 1px solid #007aff;
        background-color: #007aff;
        color: #fff;
        text-align: center;
        line-height: 14px;
        font-size: 12px;
        transform: scale(1.2); /* 添加选中时的动画效果 */
    }
}
/*设置验证码登录，免费注册的样式*/
.login-set
{
    margin: 10px 0 18px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    a
    {
        color: #0086f6;
        font-size: 12px;
        line-height: 18px;
    }
    a:hover
    {
        text-decoration: underline;
    }
}
/*设置第三方登录的样式*/
.web-login
{
    .login-other
    {
        a
        {
            margin-right: 18px;
            width: 30px;
            height: 0;
            padding-top:30px;
            overflow: hidden;
            display: inline-block;
        }
        .icon-alipay
        {
            background: url('https://bd-s.tripcdn.cn/modules/basebiz/accountsresource/un_login_third.56ec085bcb99542fabafd4d7948e9927.png') 0 0 no-repeat;
        }
        .icon-qq
        {
            background: url('https://bd-s.tripcdn.cn/modules/basebiz/accountsresource/un_login_third.56ec085bcb99542fabafd4d7948e9927.png') no-repeat -35px 0;
        }
        .icon-baidu
        {
            background: url('https://bd-s.tripcdn.cn/modules/basebiz/accountsresource/un_login_third.56ec085bcb99542fabafd4d7948e9927.png') no-repeat -70px 0;
        }
        .icon-sina
        {
            background: url('https://bd-s.tripcdn.cn/modules/basebiz/accountsresource/un_login_third.56ec085bcb99542fabafd4d7948e9927.png') no-repeat -105px 0;
        }
        .icon-wechat
        {
            background: url('https://bd-s.tripcdn.cn/modules/basebiz/accountsresource/un_login_third.56ec085bcb99542fabafd4d7948e9927.png') no-repeat -140px 0;
        }
        .icon-alipay:hover,.icon-qq:hover,.icon-baidu:hover,.icon-sina:hover,.icon-wechat:hover
        {
            background-position-y:-35px ;
        }
    }
}
</style>
