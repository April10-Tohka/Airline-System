<script setup>
import BaseLoginForm from "@/views/login/components/BaseLoginForm.vue";

import { emitter } from "@/utils/mitt.js";
import { ref } from "vue";
const captchaForm = ref({
  phone: "",
  captcha: "",
});

/**
 * BaseLoginForm 配置
 */
const formConfig = {
  title: "验证码登录",
  firstInput: {
    type: "text",
    placeholder: "注册或绑定手机号",
  },
  secondInput: {
    type: "text",
    placeholder: "短信验证码",
  },
  link: { text: "发送验证码", class: "send-captcha" },
  loginSetLinks: [
    { target: "_self", text: "账号登录", click: jumpToAccountLogin },
  ],
};

function jumpToAccountLogin(e) {
  console.log("跳转到账号登录");
  emitter.emit("render-component", 0);
}

function buttonClick(e) {
  console.log("验证码登录的登录按钮逻辑");
  console.log(captchaForm.value);
}
</script>

<template>
  <BaseLoginForm
    :form-config="formConfig"
    v-model:firstInput="captchaForm.phone"
    v-model:secondInput="captchaForm.captcha"
    :click-login="buttonClick"
  ></BaseLoginForm>
</template>

<style scoped></style>
