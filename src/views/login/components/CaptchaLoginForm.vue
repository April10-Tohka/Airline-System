<script setup>
import BaseLoginForm from "@/views/login/components/BaseLoginForm.vue";

import { emitter } from "@/utils/mitt.js";

/**
 * BaseLoginForm 配置
 */
const title = "验证码登录";
const inputConfig = [
  { type: "text", placeholder: "注册或绑定手机号" },
  { type: "text", placeholder: "短信验证码" },
];
const linkConfig = { text: "发送验证码", class: "send-captcha" };
const loginSetLinks = [
  { target: "_self", text: "账号登录", click: jumpToAccountLogin },
];
function jumpToAccountLogin(e) {
  console.log("跳转到账号登录");
  emitter.emit("render-component", 0);
}
</script>

<template>
  <BaseLoginForm
    :title
    :input-config="inputConfig"
    :link-config="linkConfig"
    :login-set-links="loginSetLinks"
  ></BaseLoginForm>
</template>

<style scoped></style>
