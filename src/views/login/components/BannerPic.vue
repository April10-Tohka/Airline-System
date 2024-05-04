<script setup>

</script>

<template>
<div class="container">
    <div class="banner">
        <img class="ad-img" src="https://dimg04.c-ctrip.com/images/zg051a0000018ihml577E.jpg" alt="" >
    </div>
    <div class="ad">
        <span>广告</span>
    </div>
</div>
</template>

<style scoped>
.container
{
    width: 100vw;
    height: 540px;
    overflow-x: hidden;
    overflow-y: hidden;
    position: absolute;
}
div.banner
{
    width: 1920px;
    height: inherit;
    transform: translateX(-300px);
    .ad-img
    {
        height: inherit;
    }
}
div.ad
{
    position: absolute;
    bottom: 0;
    background-color: black;
    opacity: 0.3;
    height: 20px;
    border-radius: 0 4px 0 0;
    padding: 0 4px;
    display: flex;
    align-items: center;
    span
    {
        font-family: "Microsoft YaHei",sans-serif;
        font-size: 12px;
        color: white;
        text-align: center;
        opacity: 0.9;
    }
}
</style>
