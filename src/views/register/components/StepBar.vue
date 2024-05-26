<script setup>
const props=defineProps({
    currentStep:{
        type:Number,
        default:0
    }
});
</script>

<template>
<div class="reg-step">
    <el-steps  :active="currentStep" finish-status="success" align-center >
        <el-step title="验证手机" />
        <el-step title="设置密码" />
        <el-step title="注册成功" />
    </el-steps>
</div>
</template>

<style scoped>
.reg-step
{
    margin-bottom: 30px;
}
</style>
