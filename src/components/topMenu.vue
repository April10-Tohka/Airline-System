<template>
  <div>
    <el-menu
      class="top-menu"
      mode="horizontal"
      background-color="#0066b1"
      text-color="#ffffff"
      active-text-color="#ffffff"
      router
    >
      <el-menu-item index="">
        <h1  >
            <svg t="1710938553805" style="position: relative; top: -10px" viewBox="0 0 1121 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9354" width="32" height="32"><path d="M700.065799 373.027761q116.507301 104.243374 209.508743 189.068865 39.857761 35.769785 77.671534 71.028574t67.451595 63.36362 47.522715 47.011718 17.884893 21.972868l0 61.319632q0 4.087975-17.884893-1.532991t-47.522715-17.373896-67.451595-27.593834-77.671534-33.214801q-93.001442-40.879755-209.508743-95.04543l0 193.156841q26.571841 19.417883 50.077699 37.813773 20.439877 15.329908 40.879755 30.148819t31.68181 22.994862q13.28592 9.197945 15.329908 18.906887t2.043988 22.994862l0 34.747791q0 8.175951-16.862899 10.730936t-40.368758-8.686948q-11.241933-6.131963-40.879755-18.39589t-63.36362-26.571841-64.896611-26.571841-46.500721-18.39589q-2.043988 0-3.576979-0.510997t-3.576979-0.510997-3.576979 0.510997-3.576979 0.510997q-15.329908 6.131963-46.500721 18.39589t-64.896611 26.571841-63.36362 26.571841-40.879755 18.39589q-23.505859 11.241933-40.368758 8.686948t-16.862899-10.730936l0-34.747791q0-13.28592 2.043988-22.994862t15.329908-18.906887q11.241933-8.175951 31.68181-22.994862t40.879755-30.148819q23.505859-18.39589 50.077699-37.813773l0-193.156841q-117.529295 54.165675-210.530737 95.04543-39.857761 17.373896-77.160537 33.214801t-66.940598 27.593834-47.522715 17.373896-17.884893 1.532991l0-61.319632q0-3.065982 17.884893-21.972868t47.522715-47.011718 66.940598-63.36362 77.160537-71.028574q93.001442-84.825491 210.530737-189.068865l0-231.992608q0-34.747791 10.219939-58.764647t25.549847-39.346764 33.214801-23.505859 33.725798-12.263926 26.060844-4.598972 11.241933-0.510997l10.219939 0q11.241933 1.021994 27.082837 5.109969t33.725798 12.263926 33.214801 23.505859 25.549847 39.346764 10.219939 58.764647l0 231.992608z" p-id="9355" fill="#ffffff"></path></svg>
          飞机订票系统
        </h1>
      </el-menu-item>
      <el-menu-item index="/">首页</el-menu-item>
      <el-sub-menu index="1">
        <template #title>机票预订</template>
        <el-menu-item index="/ticket">国内机票</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>自助服务</template>
        <el-menu-item index="/flight">航班动态</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>会员服务</template>
        <el-menu-item index="/OrderInfo">我的订单</el-menu-item>
        <el-menu-item index="/userInfo">个人信息</el-menu-item>
      </el-sub-menu>
<!--        TODO: 调整登录注册的位置及显示图标-->
        <el-menu-item index="/register"   >
            <i class="el-icon-edit"></i>注册
        </el-menu-item>
        <el-menu-item index="/login" style="float: right">
            <i class="el-icon-s-custom"></i>登录
        </el-menu-item>
    </el-menu>
  </div>
</template>

<script>

</script>

<style scoped>
.ui.white{
  color:#ffffff;
  font-size: 20px;
}

</style>
