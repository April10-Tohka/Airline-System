<script setup>
function selectSecondaryMenu(e) {
  console.log(e);
  //给父元素二级菜单添加移除selected类名
  e.target.parentNode.classList.toggle("selected");
}

const leftNavItems = [
  {
    path: "/my",
    text: "我的携程首页",
    isSecondaryMenu: false,
  },
  {
    path: "/my/order",
    text: "订单",
    isSecondaryMenu: false,
  },
  {
    path: "/my/order1",
    text: "订单",
    isSecondaryMenu: false,
  },
  {
    path: "/my/order2",
    text: "订单",
    isSecondaryMenu: false,
  },
  {
    path: "/my/order3",
    text: "订单",
    isSecondaryMenu: false,
  },
  {
    text: "个人中心",
    isSecondaryMenu: true,
    children: [
      {
        path: "/my/profile",
        text: "我的信息",
      },
      {
        path: "/my/avatar",
        text: "我的头像",
      },
    ],
  },
];
</script>

<template>
  <div class="my-container">
    <div class="left-nav">
      <ul
        v-for="(item, index) in leftNavItems"
        :key="index"
        :class="{
          'left-nav-item': true,
          'secondary-menu': item.isSecondaryMenu,
        }"
      >
        <template v-if="item.isSecondaryMenu">
          <a href="javascript:void (0)" @click="selectSecondaryMenu">
            {{ item.text }}---{{ index }}
          </a>
          <i class="icon-arrow"></i>
          <li>
            <router-link
              :to="child.path"
              v-for="(child, index) in item.children"
              :key="index"
              active-class="test"
              >{{ child.text }}---{{ index }}</router-link
            >
          </li>
        </template>
        <template v-else>
          <router-link
            :to="item.path"
            active-class="test"
            inactive-class="ceshi"
            >{{ item.text }}---{{ index }}</router-link
          >
        </template>
      </ul>

      <!--      <ul class="left-nav-item">-->
      <!--        <router-link to="/my"> 我的携程首页 </router-link>-->
      <!--      </ul>-->
      <!--      <ul class="left-nav-item">-->
      <!--        <router-link to="/my/order" active-class="test"> 订单 </router-link>-->
      <!--      </ul>-->
      <!--      <ul class="left-nav-item secondary-menu">-->
      <!--        <a href="javascript:void (0)" @click="selectSecondaryMenu">-->
      <!--          个人中心-->
      <!--        </a>-->
      <!--        <i class="icon-arrow"></i>-->
      <!--        <li>-->
      <!--          <router-link to="/my/profile">我的信息</router-link>-->
      <!--          <router-link to="/my/avatar">我的头像</router-link>-->
      <!--          <a href="#">绑定和关联</a>-->
      <!--          <a href="#">账户安全</a>-->
      <!--        </li>-->
      <!--      </ul>-->
      <!--      <ul class="left-nav-item secondary-menu">-->
      <!--        <a href="javascript:void (0)" @click="selectSecondaryMenu">-->
      <!--          个人中心-->
      <!--        </a>-->
      <!--        <i class="icon-arrow"></i>-->
      <!--        <li>-->
      <!--          <a href="#">我的信息</a>-->
      <!--          <a href="#">绑定和关联</a>-->
      <!--          <a href="#">账户安全</a>-->
      <!--        </li>-->
      <!--      </ul>-->
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
$left-nav-width: 148px;
.my-container {
  width: 1180px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
}
//左侧边栏样式
.left-nav {
  width: $left-nav-width;
  border: 1px solid #bed3ee;
  background-color: #f7fbff;
}
.left-nav-item {
  font-family: "PingFang SC", "Microsoft YaHei", serif;
  display: block;
  position: relative;
  a {
    font-size: 14px;
    line-height: 1;
    display: block;
    padding: 13px 10px 13px 16px;
    color: #333333;
  }
  a:hover {
    color: #2477e3;
    background-color: #ffffff;
  }
}
//二级菜单样式
.secondary-menu {
  //二级菜单箭头的样式
  .icon-arrow {
    position: absolute;
    top: 19px;
    right: 10px;
    border: 5px solid transparent;
    border-top-color: #2577e3;
    border-bottom: 0 none;
  }
  //二级菜单下的子项样式
  li {
    display: none;
    padding-bottom: 10px;
    a {
      padding-left: 32px;
    }
  }
}
.secondary-menu.selected {
  .icon-arrow {
    border: 5px solid transparent;
    border-bottom-color: #2577e3;
    border-top: 0 none;
  }
  li {
    display: block;
  }
}

//main样式
.main {
  margin-left: calc(170px - $left-nav-width);
  flex: 1;
}

.test {
  color: #a2d214 !important;
  background-color: #2477e3 !important;
}
.ceshi {
  color: #333333;
}
</style>
