<script setup>
import BaseLoginForm from "@/views/login/components/BaseLoginForm.vue";

import { emitter } from "@/utils/mitt.js";
import Schema from "async-validator";
import { ref } from "vue";
import { sendCaptcha } from "@/api/auth.js";
import { useAuthStore } from "@/stores/modules/auth.js";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

//子组件BaseLoginForm
const baseLoginForm = ref(null);

//表单数据
const captchaForm = ref({
  phone: "13772487114",
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
    maxLength: 6,
  },
  link: { text: "发送验证码", class: "send-captcha", click: fetchCaptcha },
  loginSetLinks: [
    { target: "_self", text: "账号登录", click: jumpToAccountLogin },
  ],
};

//切换 账号密码登录
function jumpToAccountLogin(e) {
  console.log("跳转到账号登录");
  emitter.emit("render-component", 0);
}

//登录按钮逻辑
function buttonClick(e) {
  console.log("验证码登录的登录按钮逻辑", captchaForm.value);
  emitter.emit("show-loading");
  const { showNotification } = baseLoginForm.value; //获取子组件暴露的变量方法
  validateFormData(captchaForm.value)
    .then(authStore.loginWithPhoneCaptcha)
    .then(() => {
      router.push("/");
    })
    .catch((err) => {
      showNotification("alert", err);
    })
    .finally(() => {
      setTimeout(() => {
        emitter.emit("hide-loading");
      }, 500);
    });
}

//请求发送验证码
function fetchCaptcha(e) {
  console.log("请求发送验证码");
  emitter.emit("show-loading");
  const { showNotification, actionLinkIsDisabled } = baseLoginForm.value; //获取子组件暴露的变量方法
  if (actionLinkIsDisabled) {
    //如果禁用actionlink，返回
    return;
  }
  validatePhone(captchaForm.value.phone)
    .then(sendCaptcha)
    .then(() => {
      showNotification("success", "验证码已发送至您的手机，请注意查收!");
      emitter.emit("disableCaptcha");
    })
    .catch((err) => {
      console.log("=>(CaptchaLoginForm.vue:69) err", err);
      showNotification("alert", err);
    })
    .finally(() => {
      setTimeout(() => {
        emitter.emit("hide-loading");
      }, 500);
    });
}
//发送验证码前先校验手机号
function validatePhone(phone) {
  console.log("发送验证码前校验手机号", phone);
  const rules = {
    phone: [
      { required: true, message: "请输入手机号" },
      { pattern: /^1[3-9]\d{9}$/, message: "手机号码格式不正确" },
    ],
  };
  const validator = new Schema(rules);
  return new Promise((resolve, reject) => {
    validator
      .validate({ phone })
      .then(() => {
        resolve(phone);
      })
      .catch(({ errors, fields }) => {
        reject(errors.shift().message);
      });
  });
}

//校验表单
function validateFormData(formData) {
  console.log("校验表单", formData);
  const rules = {
    phone: [
      { required: true, message: "请输入手机号" },
      { pattern: /^1[3-9]\d{9}$/, message: "手机号码格式不正确" },
    ],
    captcha: [
      { required: true, message: "验证码不能为空" },
      { pattern: /^\d{6}$/, message: "验证码必须是6位数字" },
    ],
  };
  const validator = new Schema(rules);
  return new Promise((resolve, reject) => {
    validator
      .validate(formData)
      .then(() => {
        const { isAgreePolicy, showAgreementTip } = baseLoginForm.value;
        // 如果没有勾选同意政策协议
        if (!isAgreePolicy) {
          //调用子组件暴露出的显示提示框方法
          showAgreementTip();
          emitter.emit("hide-loading");
          return;
        }
        resolve(formData);
      })
      .catch(({ errors, fields }) => {
        console.log("校验失败", errors);
        reject(errors.shift().message);
      });
  });
}
</script>

<template>
  <BaseLoginForm
    :form-config="formConfig"
    :click-login="buttonClick"
    v-model:first-input="captchaForm.phone"
    v-model:second-input="captchaForm.captcha"
    ref="baseLoginForm"
  ></BaseLoginForm>
</template>

<style scoped></style>
