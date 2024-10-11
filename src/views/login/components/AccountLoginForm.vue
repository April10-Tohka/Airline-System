<script setup>
// 导入组件
import BaseLoginForm from "@/views/login/components/BaseLoginForm.vue";

//导入api
import { useRouter } from "vue-router";
import Schema from "async-validator";
import { emitter } from "@/utils/mitt.js";
import { ref } from "vue";
import CryptoJS from "crypto-js";
import { useAuthStore } from "@/stores/modules/auth.js";

//
const authStore = useAuthStore();
const router = useRouter();

//子组件BaseLoginForm
const baseLoginForm = ref(null);
// 输入框数据模型
const accountForm = {
  phone: "13712341234",
  password: "123456abcABC!",
};
/**
 * BaseLoginForm 配置
 */
const formConfig = {
  title: "账号密码登录",
  firstInput: {
    type: "text",
    placeholder: "国内手机号/用户名/邮箱/卡号",
  },
  secondInput: {
    type: "password",
    placeholder: "登录密码",
  },
  link: {
    text: "忘记密码",
    class: "",
  },
  loginSetLinks: [
    { target: "_self", text: "验证码登录", click: jumpToCaptchaLogin },
    { target: "_self", text: "免费注册", click: jumpToRegister },
  ],
};
//是否登录失败
const isLoginFailure = ref(false);
//登录失败错误信息
const errorMessage = ref("");

//切换 验证码登录
function jumpToCaptchaLogin(e) {
  console.log("验证码登录的click");
  emitter.emit("render-component", 1);
}

//跳转到 注册页面
function jumpToRegister(e) {
  router.push("/register");
}

// 表单登录按钮交互逻辑
function buttonClick(e) {
  console.log("账号密码登录的登录逻辑");
  console.log(accountForm);
  validateAccountForm(accountForm)
    .then(hashPassword)
    .then(authStore.loginWithPhonePassword)
    .then((result) => {
      console.log("=>(AccountLoginForm.vue:61) ", result);
      router.push("/");
    })
    .catch((err) => {
      console.log("=>(AccountLoginForm.vue:64) ", err);
      isLoginFailure.value = true;
      errorMessage.value = err;
    });
}

//表单校验
function validateAccountForm(accountForm) {
  const rules = {
    phone: [
      { required: true, message: "请输入手机号" },
      { pattern: /^1[3-9]\d{9}$/, message: "手机号码格式不正确" },
    ],
    password: [{ required: true, message: "请输入登录密码" }],
  };
  const validator = new Schema(rules);
  return new Promise((resolve, reject) => {
    validator
      .validate(accountForm)
      .then(() => {
        const { isAgreePolicy, showAgreementTip } = baseLoginForm.value;
        if (!isAgreePolicy) {
          //调用子组件暴露出的显示提示框方法
          showAgreementTip();
          return;
        }
        console.log("=>(AccountLoginForm.vue:96) 表单校验成功，那就加密密码");
        resolve(accountForm);
      })
      .catch(({ errors, fields }) => {
        isLoginFailure.value = true;
        errorMessage.value = errors.shift().message;
      });
  });
}

// 加密密码
function hashPassword(accountForm) {
  console.log("收到的accountform", accountForm);
  // 对密码进行加密（这里使用的是 SHA-256 算法）
  const hashedPassword = CryptoJS.SHA256(accountForm.password).toString();
  console.log("加密后的密码", hashedPassword);
  return Promise.resolve({ phone: accountForm.phone, hashedPassword });
}
</script>

<template>
  <BaseLoginForm
    :form-config="formConfig"
    :click-login="buttonClick"
    :is-login-failure="isLoginFailure"
    :error-message="errorMessage"
    v-model:firstInput="accountForm.phone"
    v-model:secondInput="accountForm.password"
    ref="baseLoginForm"
  >
  </BaseLoginForm>
  <div class="web-login">
    <div class="login-other">
      <a href="javascript:void(0)" class="icon-alipay">支付宝</a>
      <a href="javascript:void(0)" class="icon-qq">QQ</a>
      <a href="javascript:void(0)" class="icon-baidu">百度</a>
      <a href="javascript:void(0)" class="icon-sina">新浪微博</a>
      <a href="javascript:void(0)" class="icon-wechat">微信</a>
    </div>
  </div>
</template>

<style scoped>
/*设置第三方登录的样式*/
.web-login {
  .login-other {
    a {
      margin-right: 18px;
      width: 30px;
      height: 0;
      padding-top: 30px;
      overflow: hidden;
      display: inline-block;
    }
    .icon-alipay {
      background: url("https://bd-s.tripcdn.cn/modules/basebiz/accountsresource/un_login_third.56ec085bcb99542fabafd4d7948e9927.png")
        0 0 no-repeat;
    }
    .icon-qq {
      background: url("https://bd-s.tripcdn.cn/modules/basebiz/accountsresource/un_login_third.56ec085bcb99542fabafd4d7948e9927.png")
        no-repeat -35px 0;
    }
    .icon-baidu {
      background: url("https://bd-s.tripcdn.cn/modules/basebiz/accountsresource/un_login_third.56ec085bcb99542fabafd4d7948e9927.png")
        no-repeat -70px 0;
    }
    .icon-sina {
      background: url("https://bd-s.tripcdn.cn/modules/basebiz/accountsresource/un_login_third.56ec085bcb99542fabafd4d7948e9927.png")
        no-repeat -105px 0;
    }
    .icon-wechat {
      background: url("https://bd-s.tripcdn.cn/modules/basebiz/accountsresource/un_login_third.56ec085bcb99542fabafd4d7948e9927.png")
        no-repeat -140px 0;
    }
    .icon-alipay:hover,
    .icon-qq:hover,
    .icon-baidu:hover,
    .icon-sina:hover,
    .icon-wechat:hover {
      background-position-y: -35px;
    }
  }
}
</style>
