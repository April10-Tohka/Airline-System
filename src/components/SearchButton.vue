<script setup>
const props=defineProps({
    onClick:{
        type:Function,
        required:false,
        default:null
    }
})
function handleClick()
{
    console.log("点击了公共组件按钮button");
    if (props.onClick)
    {
        console.log("有传递回调函数,就调用回调函数");
        props.onClick();
    }
}

</script>

<template>
    <button type="button" class="search-button"  @click="handleClick">
        <svg t="1711011277441" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6509" width="32" height="32">
            <path d="M469.333333 106.666667c200.298667 0 362.666667 162.368 362.666667 362.666666 0 86.08-29.994667 165.162667-80.085333 227.349334a20.949333 20.949333 0 0 1 10.901333 5.802666l135.765333 135.765334a21.333333 21.333333 0 0 1 0 30.165333l-30.165333 30.165333a21.333333 21.333333 0 0 1-30.165333 0l-135.765334-135.765333a21.226667 21.226667 0 0 1-5.845333-10.901333A360.96 360.96 0 0 1 469.333333 832c-200.298667 0-362.666667-162.368-362.666666-362.666667S269.034667 106.666667 469.333333 106.666667z m0 85.333333C316.16 192 192 316.16 192 469.333333s124.16 277.333333 277.333333 277.333334 277.333333-124.16 277.333334-277.333334S622.506667 192 469.333333 192z" fill="#ffffff" p-id="6510"></path>
        </svg>
        <span class="search-button-text">
            <slot></slot>
        </span>
    </button>
</template>

<style scoped>
/*搜索按钮样式*/
.search-button
{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: -68px;
    left: 50%;
    background-color: #f70;
    background-image: linear-gradient(-90deg,#f70,#ffa50a);
    border-radius: 28px;
    box-shadow: 0 4px 16px 0 rgba(255,102,0,0.32);
    width: 176px;
    height: 56px;
    margin-left: -88px;
    border: none;
    outline: none;
    font-size: 18px;
    color: #ffffff;
    z-index: 2;
    .search-button-text
    {
        margin-left: 4px;
    }
}
.search-button:hover::before
{
    content: "";
    width: 100%;
    height: 56px;
    display: block;
    position: absolute;
    top: 0;
    background: hsla(0,0%,100%,0.12);
}
</style>
