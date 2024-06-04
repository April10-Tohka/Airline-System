<script setup>
import {ref} from "vue";

const sortBarItems=[{label:"低价优先",id:"1"},{label: "起飞时间早-晚",id:"2"}];//排序项
const currentIndex=ref(0);//当前选择排序项的索引
function toggleClass(index)
{
    currentIndex.value=index;
}
</script>

<template>
    <div class="top-bar-root">
        <div class="top-bar">
            <ul class="filter-bar">
                <li>
                    <el-checkbox label="直飞"></el-checkbox>
                </li>
                <li>
                    <el-dropdown trigger="click">
                        <el-button >
                            航空公司<el-icon class="el-icon--right"><arrow-down /></el-icon>
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>Action 1</el-dropdown-item>
                                <el-dropdown-item>Action 2</el-dropdown-item>
                                <el-dropdown-item>Action 3</el-dropdown-item>
                                <el-dropdown-item disabled>Action 4</el-dropdown-item>
                                <el-dropdown-item divided>Action 5</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </li>
                <li>
                    <el-dropdown>
                        <el-button >
                            起抵时间<el-icon class="el-icon--right"><arrow-down /></el-icon>
                        </el-button>
                    </el-dropdown>
                </li>
                <li>
                    <el-dropdown>
                        <el-button >
                            机场<el-icon class="el-icon--right"><arrow-down /></el-icon>
                        </el-button>
                    </el-dropdown>
                </li>
            </ul>
            <ul class="sort-bar">
                <li v-for="(item,index) in sortBarItems" :key="index" :class="{active:currentIndex===index}" @click="toggleClass(index)">
                    {{item.label}}
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
$padding-left: 33px;
.top-bar-root
{
    padding-left: $padding-left;
    height:64px;
    .top-bar
    {
        background-color: #ffffff;
        line-height: 1;
        padding: 16px 16px 16px 24px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        transition: top 80ms ease;
        height: 32px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: relative;
    }
}
.filter-bar,.sort-bar
{
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    li
    {
        font-size: 14px;
    }
}
.filter-bar
{
    li
    {
        margin-right: 16px;
        padding-bottom: 10px;
    }
}
.sort-bar
{
    right: 16px;
    padding-top: 2px;
    li
    {
        padding: 7px 8px;
        margin: 0 4px;
        cursor: pointer;
        color: black;
    }
    li:last-child
    {
        margin-right: 0;
    }
    li:hover
    {
        background-color: #f2f9fe;
        border-radius: 6px;
    }
    li.active
    {
        color: #398efe;
    }
}
</style>
