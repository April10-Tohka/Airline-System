<script setup>
import flightQuery from "./components/flightQuery/index.vue"
import flightQuerySuccess from "./components/flightQuerySuccess/index.vue"
import flightQueryFailure from "./components/flightQueryFailure/index.vue"
</script>

<template>
<div style="overflow-x: hidden" >
    <div class="bgimg">
        <img src="https://pic.c-ctrip.com/AssetCatalog/schedule-online/new-banner.png" >
    </div>
    <div class="container">
        <flight-query></flight-query>
        <flight-query-success></flight-query-success>
        <flight-query-failure></flight-query-failure>
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
