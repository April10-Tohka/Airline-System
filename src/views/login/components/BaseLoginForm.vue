<script setup>
import Notification from "@/views/login/components/Notification.vue";
import { ref, createVNode, render } from "vue";
import { emitter } from "@/utils/mitt.js";

const props = defineProps({
  formConfig: { type: Object, required: true },
  clickLogin: Function,
});
//   监听 disableCaptcha 禁止发送验证码 事件
emitter.on("disableCaptcha", (a) => {
  const actionLink = document.getElementById("action-link"); //发送验证码按钮的DOM元素
  actionLinkIsDisabled.value = true; //禁用actionlink
  const timer = setInterval(() => {
    countdown.value--;

    if (countdown.value <= 0) {
      clearInterval(timer);
      actionLink.innerText = "重发验证码";
      actionLinkIsDisabled.value = false;
      countdown.value = 60; // 重置倒计时
    } else {
      actionLink.innerText = `${countdown.value}s`;
    }
  }, 1000);
});
const countdown = ref(60); //倒计时
const actionLinkIsDisabled = ref(false); // 控制actionlink 标签的禁用状态

// 渲染Notification组件
const showNotification = (type, message) => {
  const container = document.getElementById("Notification");
  const notificationVNode = createVNode(Notification, { type, message });
  render(notificationVNode, container);
};
//
const firstInputValue = defineModel("firstInput");
const secondInputValue = defineModel("secondInput");

//是否同意政策协议
const isAgreePolicy = ref(false);

// 显示同意政策提示框
const showAgreementTip = () => {
  const agreementTip = document.getElementById("agreement-tip");
  agreementTip.style.display = "block";
};
// checkbox点击后，隐藏同意政策提示框
const handleCheckboxClick = () => {
  const agreementTip = document.getElementById("agreement-tip");
  agreementTip.style.display = "none";
};
defineExpose({
  showNotification,
  actionLinkIsDisabled,
  isAgreePolicy,
  showAgreementTip,
});
</script>

<template>
  <h2 class="login-box-title">{{ formConfig.title }}</h2>
  <form class="form-wrap" @submit.prevent="clickLogin">
    <dl>
      <dd>
        <input
          class="r-input"
          :type="props.formConfig.firstInput.type"
          :placeholder="props.formConfig.firstInput.placeholder"
          v-model="firstInputValue"
        />
      </dd>
    </dl>
    <dl>
      <dd class="r-input input-auth-code">
        <input
          class="p-input"
          :type="props.formConfig.secondInput.type"
          :placeholder="props.formConfig.secondInput.placeholder"
          :maxlength="props.formConfig.secondInput.maxLength"
          v-model="secondInputValue"
        />
        <a
          id="action-link"
          href="javascript:void(0)"
          :disabled="actionLinkIsDisabled"
          :class="formConfig.link.class"
          @click="formConfig.link.click"
          >{{ formConfig.link.text }}</a
        >
      </dd>
    </dl>
    <div id="Notification"></div>
    <dl>
      <dd>
        <button type="submit" class="login-button">登录</button>
      </dd>
    </dl>
  </form>

  <div class="agreement-list">
    <div class="agreement-tip" id="agreement-tip">
      <div class="agreement-tip-arrow"></div>
      请先阅读并勾选协议
    </div>
    <div class="checkbox-agreement">
      <input
        type="checkbox"
        id="checkbox-agreement-input"
        v-model="isAgreePolicy"
        @click="handleCheckboxClick"
      />
      <label for="checkbox-agreement-input"></label>
    </div>
    <div class="agreement-entry">
      阅读并同意携程的<a href="javascript:void(0)">服务协议</a>和<a
        href="javascript:void(0)"
        >个人信息保护政策</a
      >
    </div>
  </div>
  <dl>
    <dd>
      <div class="login-set">
        <a
          href="javascript:void(0)"
          v-for="item in formConfig.loginSetLinks"
          :target="item.target"
          @click="item.click"
          >{{ item.text }}</a
        >
      </div>
    </dd>
  </dl>
</template>

<style scoped>
.login-box-title {
  padding-bottom: 16px;
  font-size: 18px;
  color: #111111;
  line-height: 1;
  font-family:
    PingFangSC-Medium,
    Microsoft YaHei,
    SimSun,
    Tahoma,
    Verdana,
    Arial,
    sans-serif;
}
/*设置表单样式*/
.form-wrap {
  input::placeholder {
    color: #cccccc;
  }
  dl {
    padding: 8px 0;
    .r-input {
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
    .p-input {
      border: none;
      width: 200px;
      height: 28px;
      line-height: 28px;
      font-size: 14px;
      background-color: #ffffff;
    }
    .input-auth-code {
      width: 225px;
      padding-right: 80px;
      a {
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
      a:hover {
        text-decoration: underline;
      }
      a.send-captcha {
        color: #0086f6;
      }
      /*禁用发送验证码样式*/
      a[disabled="true"] {
        cursor: not-allowed;
        color: gray;
        text-decoration: none;
      }
    }
    button.login-button {
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
    button.login-button:hover {
      background-color: #cc7d10;
    }
  }
}
/*设置同意服务协议的样式*/
.agreement-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  .agreement-entry {
    color: rgb(153, 153, 153);
    font-size: 12px;
    a {
      padding: 0 3px;
      text-align: left;
      color: #0086f6;
    }
    a:hover {
      text-decoration: underline;
    }
  }
}
/*设置同意协议的复选框的样式*/
.checkbox-agreement {
  /* 隐藏原始的复选框 */
  input[type="checkbox"] {
    display: none;
  }

  /* 创建圆形元素 */
  input[type="checkbox"] + label:before {
    content: "";
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
    content: "\2713"; /* Unicode 编码为√符号 */
    border: 1px solid #007aff;
    background-color: #007aff;
    color: #fff;
    text-align: center;
    line-height: 14px;
    font-size: 12px;
    transform: scale(1.2); /* 添加选中时的动画效果 */
  }
}
/*设置未确认同意协议的样式*/
.agreement-tip {
  display: none;
  height: 22px;
  background-color: #102247;
  color: #ffffff;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  padding: 5px 8px;
  border-radius: 3px;
  position: absolute;
  margin-bottom: 5px;
  bottom: 100%;
  left: -8px;
  .agreement-tip-arrow {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top-color: #102247;
    position: absolute;
    top: 100%;
    left: 10px;
  }
}

/*设置验证码登录，免费注册的样式*/
.login-set {
  margin: 10px 0 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  a {
    color: #0086f6;
    font-size: 12px;
    line-height: 18px;
  }
  a:hover {
    text-decoration: underline;
  }
}
</style>
