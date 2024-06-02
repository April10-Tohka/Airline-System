<script setup>
import {ref} from "vue";

const tabItems= [
    {
        url: "/",
        title: "国内航班"
    },
    {
        url: "/flightQuery",
        title: "航班动态"
    },
    {
        url: "/login",
        title: "在线选座"
    },
    {
        url: "/order",
        title: "退票改签"
    },
    {
        url: "/register",
        title: "更多服务"
    }
]
let tabIndex=ref(0);
function changeTab(index)
{
    console.log("index:",index);
    tabIndex.value=index;
}
</script>

<template>
    <div>
        <ul class="nav-tabs">
            <li v-for="(item,index) in tabItems" :key="index" :class="tabIndex===index?'active':''">
                <router-link :to="item.url" @click="changeTab(index)">{{ item.title }}</router-link>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.nav-tabs {
    border-radius: 8px 8px 0 0;
    background-color: rgba(0,0,0,0.75);
    font-size: 16px;
    height: 48px;
    line-height: 48px;
    font-weight: 600;
    max-width: 1180px;
    display: flex;
    flex-direction: row;
    margin: 30px auto auto;
    li
    {
        flex: 1;
        text-align: center;
        cursor: pointer;
        color: #dddddd;
        a
        {
            color: #dddddd;
            display: block;
        }
    }
    li:hover
    {
        background-color:rgba(0,0,0,0.95);
        border-radius: 6px 6px 0 0;
        a
        {
            color: #ffffff;
        }

    }
}
.nav-tabs>li.active,.nav-tabs>li.active:hover
{
    background-color: #ffffff;
    z-index: 3;
    box-shadow: 0 -10px 16px 1px rgba(0,0,0,0.06);
    border-radius: 6px 6px 0 0;
    a
    {
        color: #333333;
    }
}

</style>
