<script setup>
import QRCode from 'qrcode'
import {onMounted,ref} from "vue";

let qrcode=ref();
// 在组件的onMounted钩子函数中生成二维码数据：
onMounted(()=>{
    //使用Promise来代替回调函数
    QRCode.toDataURL('http://localhost:5173')
        .then(url => {
            console.log(url);
            qrcode.value=url;
        })
        .catch(err => {
            console.error(err)
        })
})
</script>

<template>
<div class="scancode-panel">
    <div class="login-box-qrcode">
        <div class="qrcode-box">
            <img :src="qrcode" alt="二维码">
        </div>
        <div class="refresh-qrcode">
            <p>二维码已失效</p>
            <a href="javascript:void(0)" class="refresh-btn">刷新</a>
        </div>
    </div>
    <p class="login-box-text">打开<span style="padding: 0 5px;color: #2577e3">手机</span>扫描二维码登录</p>
</div>
</template>

<style scoped>
.scancode-panel
{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

div.login-box-qrcode
{
    margin: 56px 0 40px;
    position: relative;
    width: 160px;
    height: 160px;
    div.qrcode-box
    {
        width: inherit;
        height: inherit;
        img
        {
            width: 100%;
            height: 100%;
        }
    }
    div.refresh-qrcode
    {
        position: absolute;
        top: 0;
        width: inherit;
        height: inherit;
        background-color: rgba(102,102,102,0.95);
        color: #ffffff;
        text-align: center;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        align-items: center;
        p
        {
            margin-top: 45px;
            padding: 0 10px;
        }
        .refresh-btn
        {
            display: block;
            box-sizing: border-box;
            padding: 0 20px;
            height: 32px;
            line-height: 32px;
            background-color: #ff9913;
            border-radius: 60px;
            margin-top: 16px;
            width: 68px;
            color: #ffffff;
        }
        .refresh-btn:hover
        {
            background-color: #f17605;
        }
    }
}

p.login-box-text
{
    font-size: 14px;
    color: #333333;
    text-align: center;
}
</style>
