<script setup>
import {useRoute} from "vue-router";
const route=useRoute();
console.log("flightManage route:",route);
</script>

<template>
<div>
    <h1>标题：{{route.meta.title}}</h1>
    <h2>flightManage</h2>
</div>
</template>

<style scoped>

</style>
