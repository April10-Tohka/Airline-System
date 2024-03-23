<template>
<div>
  <Carousel></Carousel>
  <searchBox class="searchBox"></searchBox>
  <div class="hottitle">———— 热门航线 ————</div>
  <div class="hot">
    <el-row :gutter="30">
      <el-col :span="6" v-for="(flight,index) in flights" :key="index">
        <div class="el-card" @click="ToTicketResult(flight.startCity,flight.arriveCity,flight.flightDate)">
          <img :src="flight.img" alt />
          <span class="adr">{{flight.startCity}} - {{flight.arriveCity}}</span>
          <span>{{flight.ticketType}}单程含税</span>
          <span>￥{{flight.ticketPrice}}起</span>
        </div>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script setup>
import  Carousel from "@/components/Carousel.vue"
import searchBox from "@/components/searchBox.vue";
import {ref} from "vue";
import {useRouter} from "vue-router";
/*TODO:
    2.同时数据通过后端获取
*/
const flights=ref([
    {
        "flightId": "HU1007",
        "flightDate": "2022-09-09",
        "index": 1,
        "ticketPrice": 1899.0,
        "startCity": "南宁",
        "arriveCity": "上海",
        "ticketType": "经济舱",
        "img":"https://mp-b31258f4-397c-40ca-87bd-b790755e323b.cdn.bspapp.com/Airline-System/img/img/recommend/hot-1.jpg"
    },
    {
        "flightId": "ZH2210",
        "flightDate": "2022-09-08",
        "index": 2,
        "ticketPrice": 8909.0,
        "startCity": "北京",
        "arriveCity": "南宁",
        "ticketType": "头等舱",
        "img":"https://mp-b31258f4-397c-40ca-87bd-b790755e323b.cdn.bspapp.com/Airline-System/img/img/recommend/hot-2.jpg"
    },
    {
        "flightId": "CA1234",
        "flightDate": "2022-09-20",
        "index": 3,
        "ticketPrice": 2222.0,
        "startCity": "上海",
        "arriveCity": "成都",
        "ticketType": "头等舱",
        "img":"https://mp-b31258f4-397c-40ca-87bd-b790755e323b.cdn.bspapp.com/Airline-System/img/img/recommend/hot-3.jpg"
    },
    {
        "flightId": "CA1000",
        "flightDate": "2022-09-09",
        "index": 4,
        "ticketPrice": 1999.0,
        "startCity": "三亚",
        "arriveCity": "上海",
        "ticketType": "头等舱",
        "img":"https://mp-b31258f4-397c-40ca-87bd-b790755e323b.cdn.bspapp.com/Airline-System/img/img/recommend/hot-4.jpg"
    }
]);
const router=useRouter();
function ToTicketResult(startCity,arriveCity,flightDate)
{
    router.push({path:"/ticketResult",query:{startCity,arriveCity,flightDate}});
}
</script>

<style scoped>
.searchBox{
  position: absolute;
  margin-top: -400px;
  margin-left: 150px;
  z-index: 2;
  opacity: 0.95;
}
.hottitle {
  margin: 3rem auto;
  text-align: center;
  font-size: 2rem;
  font-weight: 300;
}
.hot img {
  width: 100%;
}
.hot .el-col{
  text-align:left;
}
.hot .el-col>div>span{
  display:block;
  padding-left:10px;
}
.hot .el-col>div>span.adr{
  font-size:1rem;
  font-weight:700;
  margin:10px 0;
}
.hot .el-col>div>span:last-child{
  font-size:1.3rem;
  font-weight:700;
  color:#f00;
  padding-left:6px;
  margin-bottom:40px;
}
.hot .el-col .el-card {
  border:2px solid #eeeeee;
}
.hot .el-col .el-card:hover{
  border-color:#051039;
  cursor: pointer;
}
.hot {
  margin: 50px 15px;
}
</style>
