<script setup>
import TopLayer from "@/components/TopLayer.vue";
import StepBar from "@/views/register/components/StepBar.vue";
import RegisterForm from "@/views/register/components/RegisterForm.vue";
import {computed, defineAsyncComponent, ref} from "vue";
//要渲染的组件
let renderComponents=[
    {component: RegisterForm},
    {component:defineAsyncComponent(()=>import("./components/SetPassword.vue"))},
    {component: defineAsyncComponent(()=>import("./components/RegisterSuccess.vue"))}
]
//当前为第几步
let currentStep=ref(0);
//当前渲染的组件
let currentComponent=computed(()=>renderComponents[currentStep.value].component)
function changeCurrentStep(step)
{
    console.log("触发next-step事件，调用该事件的回调函数");
    currentStep.value=step;
}
</script>

<template>
<div>
    <TopLayer></TopLayer>
    <div class="cui-bd">
        <div class="reg-wrap">
            <StepBar :current-step="currentStep"></StepBar>
            <component :is="currentComponent" @next-step="changeCurrentStep"></component>
        </div>
    </div>

</div>
</template>

<style scoped>
.cui-bd
{
    margin: 20px auto;
    width: 1000px;
    padding: 0 10px;
    min-height: 500px;
}
.reg-wrap
{
    min-height: 350px;
    z-index: 1;
}


</style>
