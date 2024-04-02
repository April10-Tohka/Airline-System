<script setup>
import flightQuery from "./components/flightQuery/index.vue"
import flightQuerySuccess from "./components/flightQuerySuccess/index.vue"
import flightQueryFailure from "./components/flightQueryFailure/index.vue"
import {emitter} from "@/utils/mitt.js";
import {onMounted, ref} from "vue";
onMounted(()=>{
    emitter.on('flightQuery',(value)=>{
        console.log("触发flightQuery事件",value);
        queryResult.value=value.result;
        flightDetail.value=value.flightDetail
    })
})
let queryResult=ref(undefined);//是否查询成功
let flightDetail=ref({})//航班信息
</script>

<template>
<div style="overflow-x: hidden" >
    <div class="bgimg">
        <img src="https://pic.c-ctrip.com/AssetCatalog/schedule-online/new-banner.png" >
    </div>
    <div class="container">
        <flight-query></flight-query>
        <flight-query-success v-if="queryResult" :flightDetail="flightDetail"></flight-query-success>
        <flight-query-failure v-else></flight-query-failure>
    </div>
</div>
</template>

<style scoped>
.bgimg
{
    width: 1800px;
    height: 300px;
    img
    {
        object-fit: fill;
        width: 100%;
        height: 100%;
    }
}
.container
{
    padding-left: 300px;
    padding-right: 300px;
    width: 1000px;
}




</style>
