<script setup>
import NavigationBar from "@/components/NavigationBar.vue";
import Carousel from "./components/Carousel.vue";
import SearchForm from "@/views/home/components/SearchForm.vue";

</script>

<template>
<div class="container">
    <NavigationBar></NavigationBar>
    <SearchForm></SearchForm>
    <Carousel></Carousel>
</div>
</template>



<style scoped>
.container
{
    width: 1180px;
    margin: 0 auto;
    box-sizing: border-box;
}

</style>
