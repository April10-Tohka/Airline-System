<script setup>

</script>

<template>
    <div class="empty-container">
        <div class="empty-picture" >
            <img src="https://pic.c-ctrip.com/AssetCatalog/zelda/no-result.png" alt="">
        </div>
        <div class="empty-hint">未查询到航班，请修改条件重新查询</div>
    </div>
</template>

<style scoped>
.empty-container
{
    display: flex;
    /*元素水平垂直居中*/
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background-color: #ffffff;
    width: 100%;
    margin: 74px auto;
    flex-direction: column;
    height: 308px;
    .empty-picture
    {
        height: 240px;
        width: 240px;
        img
        {
            width: 100%;
            height: 100%;
        }
    }
    .empty-hint
    {
        font-size: 16px;
        color: #5678a8;
        letter-spacing: 0;
        line-height: 20px;
    }
}
</style>
