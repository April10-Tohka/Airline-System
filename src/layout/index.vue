<script setup>
import TopLayer from "@/layout/components/TopLayer.vue";
import FooterLayer from "@/layout/components/FooterLayer.vue";
</script>

<template>
    <el-container>
        <el-header class="el-header">
            <TopLayer></TopLayer>
        </el-header>
        <el-main class="el-main">
            <router-view></router-view>
        </el-main>
        <el-footer class="el-footer">
            <FooterLayer></FooterLayer>
        </el-footer>
    </el-container>
</template>

<style scoped>
.el-header,.el-main,.el-footer
{
    padding: 0;
    margin: 0;
}
.el-header {
    height: fit-content;
}
.el-main {
    min-height: calc(100vh - 210px);
    background-color: #eef1f6;
}
.el-footer {
    height: fit-content;
    background-color: #f8fafd;
}

</style>
