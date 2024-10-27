<script setup>
import { onMounted, onUnmounted } from "vue";
import { useEventBusStore } from "@/stores/modules/eventBus.js";
import { useUserStore } from "@/stores/modules/user12.js";
const userStore = useUserStore();
const eventBusStore = useEventBusStore();
const emit = defineEmits(["next-step"]);
onMounted(() => {
  console.log("setpassword组件已挂载");
  eventBusStore
    .getEvent("set-password")
    .then((event) => {
      console.log("获取事件成功", event);
      regForm.phone = event[0].value;
    })
    .catch((err) => {
      console.log("获取事件失败", err);
    });
});
onUnmounted(() => {
  console.log("setpassword组件已卸载");
  eventBusStore.removeEvent("set-password");
});
//表单数据
const regForm = {
  phone: "", //手机号
  password: "", //密码
  passwordCheck: "", //确认密码
};

function handleRegister() {
  console.log("点击了立即注册按钮");
  console.log(regForm);
  userStore
    .register(regForm)
    .then((res) => {
      console.log("userStore.register成功！", res);
      emit("next-step", 2);
    })
    .catch((err) => {
      console.log("userStore.register失败！！！", err);
    });
}
</script>

<template>
  <div>
    <form class="password-form">
      <dl>
        <dt>密码</dt>
        <dd>
          <input
            type="password"
            placeholder="密码"
            class="r-input"
            v-model="regForm.password"
          />
        </dd>
      </dl>
      <!--        TODO:检查密码强度 仿QQ注册-->
      <dl>
        <dt>确认密码</dt>
        <dd>
          <input
            type="password"
            placeholder="密码"
            class="r-input"
            v-model="regForm.passwordCheck"
          />
        </dd>
      </dl>
      <dl>
        <dt></dt>
        <dd>
          <button type="button" class="reg-btn" @click="handleRegister">
            立即注册
          </button>
        </dd>
      </dl>
    </form>
  </div>
</template>

<style scoped>
.password-form {
  dl {
    padding: 10px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    dt {
      margin-right: 10px;
      width: 130px;
      line-height: 36px;
      font-size: 14px;
      text-align: right;
    }
  }
  .r-input {
    height: 36px;
    line-height: 36px;
    padding-left: 10px;
    font-size: 14px;
    color: #333333;
    border-color: #cccccc;
    vertical-align: middle;
  }
  button.reg-btn {
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
  }
  button.reg-btn:hover {
    background-color: #cc7b10;
  }
}
</style>
