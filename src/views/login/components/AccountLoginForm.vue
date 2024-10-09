<script setup>
// 导入组件
import BaseLoginForm from "@/views/login/components/BaseLoginForm.vue";

//导入api
import { useRouter } from "vue-router";
import { emitter } from "@/utils/mitt.js";
const router = useRouter();

/**
 * BaseLoginForm 配置
 */
const title = "账号密码登录";
const inputConfig = [
  { type: "text", placeholder: "国内手机号/用户名/邮箱/卡号" },
  { type: "password", placeholder: "登录密码" },
];
const linkConfig = { text: "忘记密码", class: "" };
const loginSetLinks = [
  { target: "_self", text: "验证码登录", click: jumpToCaptchaLogin },
  { target: "_blank", text: "免费注册", click: jumpToRegister },
];
function jumpToCaptchaLogin(e) {
  console.log("验证码登录的click");
  emitter.emit("render-component", 1);
}
function jumpToRegister(e) {
  router.push("/register");
}
</script>

<template>
  <BaseLoginForm
    :title
    :input-config="inputConfig"
    :link-config="linkConfig"
    :login-set-links="loginSetLinks"
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
