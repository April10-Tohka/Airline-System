<script setup>
import footInfo from "@/components/footInfo.vue"
import topMenu from "@/components/topMenu.vue"
</script>

<template>
    <div>
        <el-container>
            <el-header style="padding:0">
                <topMenu></topMenu>
            </el-header>
            <el-main style="padding:0">
                <router-view></router-view>
            </el-main>
            <el-footer style="padding:0">
                <footInfo></footInfo>
            </el-footer>
        </el-container>
    </div>
</template>

<style scoped>
.el-header {
    padding: 0;
    margin: 0;
}
.el-main {
    padding: 0;
    min-height: calc(100vh - 210px);
    background-color: #eef1f6;
}
.el-footer {
    padding: 0;
    height: 190px;
    margin: 0;
}
</style>
