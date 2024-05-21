<script setup>

</script>

<template>
<div class="container">
    <div class="logo">
        <router-link to="/"></router-link>
    </div>
    <div class="btn-home">
        <router-link to="/">
            <svg t="1714272855561" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4309" width="20" height="30">
                <path d="M422.63 891.821V623.712h178.74v268.109h223.424V534.342h134.054L512 132.179 65.152 534.342h134.054V891.82H422.63z" p-id="4310" ></path>
            </svg>
            <span>首页</span>
        </router-link>
    </div>
</div>
</template>

<style scoped>
.container
{
    padding: 0 18px;
    background-color: white;
    max-width: 1180px;
    min-width: 1080px;
    font-family: Pingfang SC, Helvetica, Helvetica Neue, Microsoft YaHei, Arial, Heiti SC, sans-serif;
    margin: auto;
    height: 72px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
div.logo
{
    a
    {
        background: url("	https://webresource.c-ctrip.com/ares2/nfes/pc-home/1.0.65/default/image/logo.png") no-repeat;
        background-size: 100% 100%;
        display: block;
        width: 194px;
        height: 32px;
    }
}
div.btn-home
{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    a
    {
        width: 52px;
        height: 30px;
        display: block;
        text-decoration: none;
        outline: none;
    }
    span
    {
        position: relative;
        top: -9px;
        line-height: 18px;
        font-size: 14px;
        color: #333333;
        padding-left: 4px;
    }
    .icon
    {
        fill:#5678a8;
    }
}
div.btn-home:hover
{
    span
    {
        color: #0086f6;
    }
    .icon
    {
        fill: #0086f6;
    }
}
</style>
