<script setup>
const props=defineProps(["isLoginFailure"])
</script>

<template>
    <div class="alert" v-show="props.isLoginFailure">
        <i class="icon-warn">
            <svg t="1714274136236" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7148" width="16" height="16">
                <path d="M513.9 106.5C290 106.5 108.4 288 108.4 512c0 223.9 181.5 405.5 405.5 405.5 223.9 0 405.5-181.5 405.5-405.5-0.1-224-181.6-405.5-405.5-405.5z m0 772.3C311.3 878.8 147 714.5 147 511.9 147 309.3 311.2 145 513.9 145c202.6 0 366.8 164.2 366.8 366.9 0 202.6-164.2 366.9-366.8 366.9z m0 0" fill="#DC630C" p-id="7149"></path><path d="M455.9 743.6c0 32 25.9 57.9 57.9 57.9s57.9-25.9 57.9-57.9c0-20.7-11-39.8-29-50.2-17.9-10.3-40-10.3-57.9 0-17.8 10.4-28.9 29.5-28.9 50.2z m0 0M513.9 222.3c-20.5 0-40.1 8.1-54.6 22.6-14.5 14.5-22.6 34.1-22.6 54.6s57.9 326.9 57.9 328.2c0 5.1 2 10 5.7 13.7 3.6 3.6 8.5 5.7 13.7 5.7 10.4-0.6 18.7-8.9 19.3-19.3l57.9-328.2c0-20.5-8.1-40.1-22.6-54.6-14.6-14.6-34.3-22.7-54.7-22.7z m0 0" fill="#DC630C" p-id="7150"></path>
            </svg>
        </i>
        <span class="error-message">
            <slot></slot>
        </span>
    </div>
</template>

<style scoped>
/**
设置登录出错警示框
 */
.alert
{
    position: relative;
    display: flex;
    align-items: center;
    margin-top: 8px;
    margin-bottom: 10px;
    background-color: #fffadc;
    border: 1px solid #dca;
    color: #666666;
    padding: 2px 25px;
    width: 268px;
    .icon-warn
    {
        position: absolute;
        left: 9px;
        top: 2px;
    }
    .error-message
    {
        font-size: 12px;
        position: relative;
        top: 0;
        left: 2px;
    }
}
</style>
