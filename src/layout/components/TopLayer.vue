<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useAuthStore } from "@/stores/modules/auth.js";
import { useUserStore } from "@/stores/modules/user.js";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const userStore = useUserStore();
/**
 * 跳转到登录页面
 */
function goToLogin() {
  router.push("/login");
}

/**
 * 跳转到注册页面
 */
function goToRegister() {
  router.push("/register");
}

function goToOrder() {
  router.push("/order");
}
//判断当前路由是否是登录或注册页面。
const isOnAuthPage = computed(() => {
  return route.path === "/login" || route.path === "/register";
});
//下拉菜单的父元素
const dropDownMenuParent = ref(null);
let timer;
//显示下拉菜单
function showDropDownMenu() {
  console.log("显示下拉菜单");
  console.log(dropDownMenuParent);
  dropDownMenuParent.value.classList.add("show-dropdown-menu");
  clearTimeout(timer);
}

//隐藏下拉菜单
function hideDropDownMenu() {
  console.log("隐藏下拉菜单");
  //检查鼠标是否移除了下拉菜单及其父元素
  timer = setTimeout(() => {
    dropDownMenuParent.value.classList.remove("show-dropdown-menu");
  }, 200);
}
</script>

<template>
  <div class="container">
    <div class="logo">
      <router-link to="/home"></router-link>
    </div>
    <div class="btn-wrap">
      <!--    在/login /register 路径下看到的 回到首页按钮-->
      <div class="btn-home" v-show="isOnAuthPage">
        <router-link to="/home">
          <svg
            t="1714272855561"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4309"
            width="20"
            height="30"
          >
            <path
              d="M422.63 891.821V623.712h178.74v268.109h223.424V534.342h134.054L512 132.179 65.152 534.342h134.054V891.82H422.63z"
              p-id="4310"
            ></path>
          </svg>
          <span>首页</span>
        </router-link>
      </div>

      <!--   其他路径下显示 登录注册按钮-->
      <ul class="account-bar" v-show="!isOnAuthPage">
        <!--    未登录状态显示登录注册按钮-->
        <li
          class="account-bar-item"
          v-show="!authStore.isLoggedIn"
          data-login-status="Not logged"
        >
          <div class="account-bar-item">
            <button class="login-button" @click="goToLogin">
              <svg
                x="1716867389541"
                class="login-icon"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2650"
                width="24"
                height="24"
              >
                <path
                  d="M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0zM213.333 832A298.667 298.667 0 0 1 512 533.333a170.667 170.667 0 1 1 170.667-170.666A170.667 170.667 0 0 1 512 533.333 298.667 298.667 0 0 1 810.667 832z"
                  p-id="2651"
                ></path>
              </svg>
              <span style="margin-left: 5px; margin-right: 2px; font-size: 14px"
                >请登录</span
              >
            </button>
          </div>
          <div class="account-bar-item">
            <button class="register-button" @click="goToRegister">注册</button>
          </div>
        </li>

        <!--    已登录状态下-->
        <li
          ref="dropDownMenuParent"
          class="account-bar-item dropdown"
          v-show="authStore.isLoggedIn"
          data-login-status="logged"
          @mouseenter="showDropDownMenu"
          @mouseleave="hideDropDownMenu"
        >
          <button class="login-button dropdown-toggle">
            <img :src="userStore.avatarUrl" class="avatar" />
            <span class="logged-title">{{ userStore.userName }}</span>
            <svg
              t="1716970048735"
              class="arrow"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6502"
              width="12"
              height="12"
            >
              <path
                d="M482.133333 738.133333L136.533333 392.533333c-17.066667-17.066667-17.066667-42.666667 0-59.733333 8.533333-8.533333 19.2-12.8 29.866667-12.8h689.066667c23.466667 0 42.666667 19.2 42.666666 42.666667 0 10.666667-4.266667 21.333333-12.8 29.866666L541.866667 738.133333c-17.066667 17.066667-42.666667 17.066667-59.733334 0z"
                fill="#666666"
                p-id="6503"
              ></path>
            </svg>
          </button>
          <!--    下拉菜单-->
          <!--携程是将下拉菜单渲染了，刚好看了一点相关的文档，我可以将下拉菜单封装为组件来渲染-->
          <ul class="dropdown-menu" id="dropdown-menu">
            <div class="dropdown-menu-panel">
              <div class="basic-info">
                <div class="user-avatar">
                  <img :src="userStore.avatarUrl" class="avatar" />
                </div>
                <div class="name-info">
                  <a
                    href="javascript:void(0)"
                    class="user-name"
                    aria-label="查看个人信息"
                  >
                    {{ userStore.userName }}
                    <svg
                      t="1716974888951"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="8719"
                      width="16"
                      height="16"
                    >
                      <path
                        d="M377.895 812.748c11.584 9.682 28.84 8.112 38.506-3.48l233.204-279.755c4.248-5.068 6.347-11.286 6.347-17.513 0-6.219-2.1-12.445-6.347-17.513L416.401 214.733c-9.665-11.593-26.93-13.163-38.506-3.48s-13.163 26.896-3.498 38.505L593.022 512 374.397 774.242c-9.682 11.626-8.113 28.807 3.498 38.506z"
                        p-id="8720"
                      ></path>
                    </svg>
                  </a>
                  <div class="vip-tag">
                    <img
                      src="https://webresource.c-ctrip.com/ares2/nfes/pc-home/1.0.58/default/image/ordinaryMember.png"
                      width="16"
                      height="16"
                    />
                    <span style="margin-left: 4px">普通会员</span>
                  </div>
                </div>
              </div>
              <div class="info-list">
                <a href="javascript:void(0)" class="info-list-item">我的钱包</a>
                <div class="info-list-divider"></div>
                <a href="javascript:void(0)" class="info-list-item">我的钱包</a>
                <div class="info-list-divider"></div>
                <a
                  href="javascript:void(0)"
                  class="info-list-item"
                  @click="authStore.logoutAndClearJWT"
                >
                  <svg
                    t="1716971870580"
                    class="logout"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="7673"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M985.555034 550.417767H550.374889a38.398248 38.398248 0 1 1 0-76.796496h435.180145a38.398248 38.398248 0 1 1 0 76.796496z"
                      fill="#5A607F"
                      p-id="7674"
                    ></path>
                    <path
                      d="M511.976641 1023.99616a511.976641 511.976641 0 1 1 415.34105-812.762918 38.398248 38.398248 0 1 1-63.99708 45.437927 435.180145 435.180145 0 1 0 0 511.976641 38.398248 38.398248 0 1 1 63.99708 45.437927A511.976641 511.976641 0 0 1 511.976641 1023.99616z"
                      p-id="7675"
                    ></path>
                  </svg>
                  <span>退出登录</span>
                </a>
              </div>
            </div>
          </ul>
        </li>
        <!--    我的订单按钮      -->
        <li class="account-bar-item">
          <button class="order-button" @click="goToOrder">
            <svg
              t="1716886927667"
              class="order-icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2924"
              width="24"
              height="24"
            >
              <path
                d="M626.57 198.4H396.09c-0.6 0-1.1-0.49-1.1-1.1V99.77c0-0.6 0.49-1.1 1.1-1.1h230.49c0.6 0 1.1 0.49 1.1 1.1v97.53c-0.01 0.6-0.5 1.1-1.11 1.1z"
                p-id="2925"
              ></path>
              <path
                d="M748.35 162.87h-90.58c-1.34 32.76-28.36 59.2-61.45 59.2h-170c-33.07 0-60.1-26.44-61.45-59.2h-90.56c-50.08 0-91.04 40.97-91.04 91.04v515.96c0 50.07 40.96 91.04 91.04 91.04h474.04c50.08 0 91.04-40.97 91.04-91.04V253.91c0-50.08-40.96-91.04-91.04-91.04zM682.1 672.79H340.56c-12.58 0-22.76-10.18-22.76-22.76s10.18-22.76 22.76-22.76H682.1c12.58 0 22.76 10.18 22.76 22.76s-10.18 22.76-22.76 22.76z m0-138.75H340.56c-12.58 0-22.76-10.18-22.76-22.76s10.18-22.76 22.76-22.76H682.1c12.58 0 22.76 10.18 22.76 22.76s-10.18 22.76-22.76 22.76z m0-138.74H340.56c-12.58 0-22.76-10.18-22.76-22.76 0-12.58 10.18-22.76 22.76-22.76H682.1c12.58 0 22.76 10.18 22.76 22.76 0 12.58-10.18 22.76-22.76 22.76z"
                p-id="2926"
              ></path>
            </svg>
            <span>我的订单</span>
          </button>
        </li>
      </ul>
      <div class="divider"></div>
      <button aria-label="无障碍阅读开关" class="">
        <svg
          t="1716887357701"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6120"
          width="24"
          height="24"
        >
          <path
            d="M512 435.842192A713.382406 713.382406 0 0 0 56.028893 247.176257a32.638411 32.638411 0 0 0-35.083449 33.207024v527.502676a32.922717 32.922717 0 0 0 31.558045 33.207025 691.604512 691.604512 0 0 1 438.457814 174.678044 34.514835 34.514835 0 0 0 43.840095 0 716.452918 716.452918 0 0 1 436.695113-174.678044 32.922717 32.922717 0 0 0 31.558045-33.207025V282.316567a32.638411 32.638411 0 0 0-35.083449-33.207025A702.749335 702.749335 0 0 0 512 435.842192z"
            p-id="6121"
          ></path>
          <path
            d="M726.992737 119.181374A122.536194 122.536194 0 0 0 602.63698 0.170584a125.094954 125.094954 0 0 0-88.817417 35.538339 125.77729 125.77729 0 0 0-213.173174 83.529313 117.191227 117.191227 0 0 0 33.775638 81.709749 1.762702 1.762702 0 0 0 1.762701 1.762702l1.762702 1.762701L496.078824 350.152149a26.724831 26.724831 0 0 0 19.560302 7.107667 37.244179 37.244179 0 0 0 19.560302-7.107667c5.344966-3.525403 129.700723-117.248089 158.131394-145.678761l1.762702-1.762701a125.094954 125.094954 0 0 0 31.899213-83.529313zM423.182583 60.55733a63.343536 63.343536 0 0 0-63.969011 62.206309 9.495844 9.495844 0 0 1-8.870369 8.870369 8.415479 8.415479 0 0 1-8.87037-8.870369A81.596027 81.596027 0 0 1 425.002146 42.816591a8.415479 8.415479 0 0 1 8.870369 8.87037c-1.876424 3.525403-5.401828 8.870369-10.746794 8.870369z"
            p-id="6122"
          ></path>
        </svg>
      </button>
      <button aria-label="关怀版" class="">
        <svg
          t="1716887215458"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5092"
          width="24"
          height="24"
        >
          <path
            d="M884.457 96.535l8.564 7.122a254.464 254.464 0 0 1 83.41 166.307c5.957 64.651-14.895 129.35-53.62 178.595L716.147 702.697c4.98-2.328 7.913-2.607 13.266-5.4 17.92-9.216 35.793-12.288 53.667-9.216 14.894 3.119 23.831 15.407 29.789 30.814 9.914 27.275 7.726 57.67-5.958 83.13l-3.584 5.12c-11.264 13.684-34.444 27.415-53.015 41.053l-11.916 6.19c-17.873 15.36-38.772 24.623-56.646 36.957l-32.768 18.479c-47.709 27.648-89.46 52.317-143.127 64.605-11.916 3.072-20.852 3.072-29.79 3.072a461.777 461.777 0 0 1-89.413-18.432l-8.937-3.118c-14.894-3.072-26.81-9.216-41.704-12.288-50.688-15.454-101.376-33.839-166.912-33.839H93.277c-20.48-0.14-46.406-1.676-46.406-24.67 0-6.143 2.98-15.406 5.958-18.524 8.983-9.216 23.878-9.216 41.751-9.216h71.54a640.93 640.93 0 0 1 169.892 33.931l14.103 3.864c9.076 2.979 17.687 6.376 27.601 8.424l8.937 3.072c29.79 9.263 68.515 18.479 101.376 15.407 26.764-3.119 53.62-15.407 77.452-27.741l8.936-9.216a1593.39 1593.39 0 0 0 154.997-92.393l4.654-2.094c14.29-7.168 31.419-21.318 34.072-37.888 0-3.119 0-9.31-2.933-15.407-42.496 13.08-85.224 25.414-128.14 36.91l-89.46 24.67c-5.958 0-11.915 3.072-20.852 6.144-17.874 6.144-38.772 12.334-56.646 12.334-8.937 0-20.899-3.072-29.789-9.216a22.156 22.156 0 0 0-11.962-6.19c-11.916-3.072-26.764-9.263-38.726-12.288a215.878 215.878 0 0 1-41.705-12.335 38.167 38.167 0 0 1-26.81-21.55c-3.025-6.19 0-12.335 2.932-21.55 8.984-15.407 38.82-6.145 71.587 6.143l8.89 3.072c7.308 0.605 14.43 2.7 20.9 6.144l3.537 1.862c4.654 2.327 8.983 4.329 11.404 4.329 2.932 0 5.91 3.072 8.89 3.072 8.936 3.072 14.94 6.097 23.878 6.097a16.384 16.384 0 0 0 14.894-9.17l1.722-4.654c1.257-4.608 1.257-9.216 1.257-13.824 0-12.334-20.899-24.669-32.815-30.813l-8.936-3.072-5.958-3.072c-35.747-21.55-65.583-40.03-101.33-61.626l-11.915-9.17c-32.768-21.597-68.562-46.173-119.25-30.813-32.768 9.263-77.451 33.885-107.333 55.39-2.933 0-5.912 3.071-8.89 6.19a36.352 36.352 0 0 1-29.79 15.36c-8.983-3.072-14.894-12.288-17.92-21.504-2.979-18.479 14.895-27.695 26.857-33.839 2.932-3.118 5.958-6.19 8.937-6.19 12.195-9.31 25.18-17.548 38.772-24.67l8.146-5.352c5.12-3.212 9.774-5.911 15.685-10.007 23.832-15.36 47.663-27.695 77.452-30.813 21.876-3.538 44.125-2.467 65.583 3.118l11.17 5.12c11.171 5.632 22.342 12.567 33.56 19.503 5.958 3.072 11.915 6.144 20.852 15.406l119.25 70.796 11.915 9.216c29.79 15.453 62.557 36.957 59.578 86.249 25.926-7.308 55.576-16.57 84.527-24.67a20.48 20.48 0 0 1 1.536-2.466l250.414-307.899a186.415 186.415 0 0 0 41.705-141.637c-6.004-52.364-26.81-98.537-65.536-129.304a181.341 181.341 0 0 0-262.33 24.623l-92.393 113.897c-8.936 12.334-23.831 12.334-35.793 3.072-11.916-9.216-11.916-24.67-2.933-36.957l57.577-70.75c-67.211-68.887-177.99-76.52-251.345-12.38-77.452 67.77-89.368 190.882-23.832 270.94l38.726 46.22c8.937 12.335 8.937 27.695-2.932 36.957a28.486 28.486 0 0 1-14.336 8.844l-3.538 0.372a31.697 31.697 0 0 1-20.945-9.216l-38.68-46.22C121.019 371.48 132.98 217.6 234.31 131.352c94.953-80.803 231.89-75.031 317.393 12.242l7.448-9.123a231.61 231.61 0 0 1 325.352-37.935z m-68.934 93.324c29.789 21.55 44.684 52.364 44.684 86.202 0 16.617-7.215 25.786-19.55 27.462l-4.282 0.28a27.23 27.23 0 0 1-26.81-27.602v-0.14c0-18.432-5.958-30.766-23.831-43.101-17.92-12.335-32.815-18.432-50.735-15.36-14.894 3.025-26.81-6.19-29.742-21.597-3.026-15.36 5.911-27.695 20.852-30.813 29.79-6.144 59.578 3.118 89.414 24.669z"
            p-id="5093"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 0 18px;
  background-color: #ffffff;
  max-width: 1180px;
  min-width: 1080px;
  font-family:
    Pingfang SC,
    Helvetica,
    Helvetica Neue,
    Microsoft YaHei,
    Arial,
    Heiti SC,
    sans-serif;
  margin: auto;
  height: 72px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.divider {
  width: 1px;
  height: 20px;
  background-color: #dadfe6;
  margin-left: 20px;
}
div.logo {
  a {
    background: url("https://webresource.c-ctrip.com/ares2/nfes/pc-home/1.0.65/default/image/logo.png")
      no-repeat;
    background-size: 100% 100%;
    display: block;
    width: 194px;
    height: 32px;
  }
}
div.btn-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  button[aria-label] {
    margin-left: 20px;
    background-color: transparent;
    .icon {
      fill: #5678a8;
    }
  }
  button[aria-label]:hover {
    color: #0086f6;
    .icon {
      fill: #0086f6;
    }
  }
}
/**
下拉菜单栏样式
 */
#dropdown-menu {
  display: none;
  position: absolute;
  top: calc(100% + 8px);
  left: calc(50% - 114px);
  background-color: #ffffff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  min-width: 160px;
  z-index: 9;
  border-radius: 10px;
  border: 1px solid #e6f3fe;
  filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.1));
  box-sizing: border-box;
}
#dropdown-menu::before,
#dropdown-menu::after {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  left: 100px;
  top: -12px;
  border: 6px solid transparent;
  border-bottom-color: #ffffff;
}
/**
下拉菜单内面板样式
 */
.dropdown-menu-panel {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px 8px 11px 8px;
  box-sizing: border-box;
  .basic-info {
    margin-bottom: 18px;
    margin-right: 19px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    .user-avatar {
      padding-right: 8px;
      padding-left: 20px;
      .avatar {
        width: 40px !important;
        height: 40px !important;
      }
    }
    .name-info {
      display: flex;
      flex-direction: column;
      .user-name {
        display: inline-flex;
        align-items: center;
        flex-direction: row;
        font-weight: 600;
        color: #333333;
        .icon {
          fill: #333333;
        }
      }
      .user-name:hover {
        color: #0086f6;
        .icon {
          fill: #0086f6;
        }
      }
      .vip-tag {
        background-color: #e9f6ff;
        display: inline-flex;
        align-items: center;
        border-radius: 9px;
        font-size: 12px;
        margin-top: 5px;
        width: fit-content;
      }
    }
  }
  .info-list {
    width: 212px;
    .info-list-item {
      width: 100%;
      box-sizing: border-box;
      display: inline-flex;
      padding: 11px 12px;
      align-items: center;
      justify-content: flex-start;
      color: #333333;
      font-size: 14px;
      font-weight: normal;
      line-height: 18px;
      .logout {
        fill: #5a607f;
        margin-right: 6px;
      }
    }
    .info-list-item:hover {
      background-color: #f2f8fe;
      border-radius: 20px;
      color: #0086f6;
      cursor: pointer;
      .logout {
        fill: #0086f6;
      }
    }
    .info-list-divider {
      margin: 0 12px 8px;
      height: 1px;
      width: calc(100% - 24px);
      background-color: #dadfe6;
    }
  }
}
ul.account-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  .account-bar-item {
    margin-left: 20px;
  }
  li.account-bar-item:first-child {
    margin-left: 0;
  }
  /*未登录状态下按钮的样式*/
  .account-bar-item[data-login-status="Not logged"] {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  /*登录状态下按钮的样式*/
  .account-bar-item[data-login-status="logged"] {
    position: relative;
    .avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
    .logged-title {
      margin-left: 5px;
      margin-right: 2px;
      font-size: 14px;
      max-width: 56px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1.2;
      display: block;
      color: #333333;
    }
    .arrow {
      margin-left: 5px;
      transition: transform 0.3s ease;
    }
  }
  /**
      鼠标移入下拉菜单时，显示下拉菜单及相应样式
       */
  .account-bar-item[data-login-status="logged"].show-dropdown-menu {
    .logged-title {
      color: #0086f6;
    }
    .arrow {
      transform: rotate(180deg);
    }
    .dropdown-menu {
      display: block !important;
    }
  }
}
/**
回到首页的样式
 */
div.btn-home {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  a {
    width: 52px;
    height: 30px;
    display: block;
    text-decoration: none;
    outline: none;
  }
  span {
    position: relative;
    top: -9px;
    line-height: 18px;
    font-size: 14px;
    color: #333333;
    padding-left: 4px;
  }
  .icon {
    fill: #5678a8;
  }
}
div.btn-home:hover {
  span {
    color: #0086f6;
  }
  .icon {
    fill: #0086f6;
  }
}
/**
登录按钮样式
 */
.login-button {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  background-color: #f2f8fe;
  padding: 4px 8px 4px 4px;
  border-radius: 16px;
  .login-icon {
    fill: #5678a8;
  }
}
.login-button:hover,
.order-button:hover {
  span {
    color: #0086f6;
  }
  .login-icon {
    fill: #0086f6;
  }
}
/**
注册按钮样式
 */
.register-button {
  background-color: transparent;
  font-size: 14px;
}
.register-button:hover {
  color: #0086f6;
}
/**
我的订单按钮样式
 */
.order-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: transparent;
  padding: 6px 0;
  .order-icon {
    fill: #5678a8;
  }
}
.order-button:hover {
  span {
    color: #0086f6;
  }
  .order-icon {
    fill: #0086f6;
  }
}
</style>
