<script setup>

</script>

<template>
<div class="slider-wrap">
    <div class="flight-ad-slider">
        <div class="banner-flag">
            <img src="https://dimg04.c-ctrip.com/images/0zg5o12000e329gb9201E.jpg" class="ad-img">
        </div>
    </div>
    <div class="ad">
        <span>广告</span>
    </div>
</div>
</template>

<style scoped>
.slider-wrap
{
    max-width: 1180px;
    height: 156px;
    border-radius: 6px;
    overflow: hidden;
    margin: 32px auto;
    position: relative;
}
.flight-ad-slider
{
    background-color: rgba(238,241,246);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: 50%;
    overflow: hidden;
    width: 1180px;
    height: 156px;
    position: relative;
    .banner-flag
    {
        transform: scale(1) translateY(0) translateX(0);
        transform-origin: 0 0;
        width: inherit;
        height: inherit;
        position: absolute;
        .ad-img
        {
            width: inherit;
            height: inherit;
            box-shadow: rgba(0,0,0,0.1) 0 0 0 0;
            position: absolute;
        }
    }
}
.ad
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
