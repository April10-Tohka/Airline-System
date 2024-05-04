<script setup>
import TopLayer from "@/views/login/components/TopLayer.vue";
import TipSecurity from "@/views/login/components/TipSecurity.vue";
import BannerPic from "@/views/login/components/BannerPic.vue";
import LoginBox from "@/views/login/components/LoginBox.vue";
import {defineAsyncComponent,  ref} from "vue";
//要渲染的组件
let renderComponents=[
    {title:"账号密码登录",component:defineAsyncComponent(()=>import('./components/AccountPanel.vue'))},
    {title:"验证码登录",component:defineAsyncComponent(()=>import('./components/DynamicPanel.vue'))},
    {title:"扫码登录",component:defineAsyncComponent(()=>import('./components/ScanCodePanel.vue'))},
]
//渲染组件的索引
let currentIndex=ref(0);

/**
 * 事件changeCurrentIndex的回调函数
 * @param index 传递的索引
 */
const updateCurrentIndex=(index)=>{
    currentIndex.value=index;
}
</script>

<template>
<div class="container">
    <TopLayer></TopLayer>
    <TipSecurity></TipSecurity>
    <BannerPic></BannerPic>
    <LoginBox @changeCurrentIndex="updateCurrentIndex">
        <template v-slot:title>{{ renderComponents[currentIndex].title }}</template>
        <template v-slot:panel>
            <keep-alive exclude="ScanCodePanel">
                <component :is="renderComponents[currentIndex].component" @changeCurrentIndex="updateCurrentIndex"></component>
            </keep-alive>
        </template>
    </LoginBox>
</div>

</template>

<style scoped>

</style>
