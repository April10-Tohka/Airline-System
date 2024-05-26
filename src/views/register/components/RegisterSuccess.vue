<script setup>
import {useRouter} from "vue-router";
const router=useRouter()
function loginNow()
{
    console.log("点击了立即登录");
    router.push("/login")
}
</script>

<template>
<div class="container">
    <input type="checkbox" style="display: none" checked="checked">
    <svg width="600" height="400" >
        <circle fill="none" stroke="#68E534" stroke-width="20" cx="200" cy="200" r="190" class="circle" stroke-linecap="round" transform="rotate(-90 200 200) "/>
        <polyline fill="none" stroke="#68E534" stroke-width="24" points="88,214 173,284 304,138" stroke-linecap="round" stroke-linejoin="round" class="tick" />
    </svg>
    <h2>注册成功</h2>
    <el-button type="primary" size="large" @click="loginNow">立即登录</el-button>
</div>

</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
svg
{
    transform: translateX(90px);
}
h2 {
    font-family: Helvetica,sans-serif;
    font-size: 36px;
    margin-top: 40px;
    margin-bottom: 20px;
    color: #333;
    opacity: 0;
}

input[type="checkbox"]:checked ~ h2 {
    animation: .6s title ease-in-out;
    animation-delay: 1.2s;
    animation-fill-mode: forwards;
}

.circle {
    stroke-dasharray: 1194;
    stroke-dashoffset: 1194;
}

input[type="checkbox"]:checked + svg .circle {
    animation: circle 1s ease-in-out;
    animation-fill-mode: forwards;
}

.tick {
    stroke-dasharray: 350;
    stroke-dashoffset: 350;
}

input[type="checkbox"]:checked + svg .tick {
    animation: tick .8s ease-out;
    animation-fill-mode: forwards;
    animation-delay: .95s;
}

@keyframes circle {
    from {
        stroke-dashoffset: 1194;
    }
    to {
        stroke-dashoffset: 2388;
    }
}

@keyframes tick {
    from {
        stroke-dashoffset: 350;
    }
    to {
        stroke-dashoffset: 0;
    }
}

@keyframes title {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

</style>
