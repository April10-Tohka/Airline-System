<template>
  <div class="block">
<!--      TODO:给走马灯绑定图片的地址，使其显示-->
    <el-carousel height="500px" :interval="5000">
      <el-carousel-item v-for="(item,index) in imagesUrl" :key="index" >
          <img src='../assets/img/carousel/1.jpg' alt="" width="1920px" height="500px" >
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script setup>
import {ref} from "vue"
// 走马灯图片
const imagesUrl=ref([
    "../assets/img/carousel/1.jpg",
    "../assets/img/carousel/2.jpg",
    "../assets/img/carousel/3.jpg",
    "../assets/img/carousel/4.jpg",
    "../assets/img/carousel/5.jpg",
    "../assets/img/carousel/6.jpg"
])
</script>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 350px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
