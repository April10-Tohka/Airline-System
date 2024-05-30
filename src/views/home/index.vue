<template>
<div>
  <Carousel></Carousel>
  <searchBox class="searchBox"></searchBox>
  <div class="hottitle">———— 热门航线 ————</div>
    <button @click="router.push('/admin')">点击前往后台管理</button>
  <div class="hot">
    <el-row :gutter="30">
      <el-col :span="6" v-for="(flight,index) in flights" :key="index">
        <div class="el-card" @click="ToTicket(flight.departCity,flight.arriveCity,flight.flightDate)">
          <img :src="flight.img" alt />
          <span class="adr">{{flight.departCity}} - {{flight.arriveCity}}</span>
          <span>经济舱单程含税</span>
          <span>￥{{flight.price}}起</span>
        </div>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script setup>
import  Carousel from "@/components/Carousel.vue"
import searchBox from "@/components/searchBox.vue";
import {ref,onBeforeMount} from "vue";
import {useRouter} from "vue-router";
import {getColumnData,getHotFlight} from "@/api/flight.js"
const flights=ref([]);//热门航线
const router=useRouter();
function ToTicket(departCity,arriveCity,flightDate)
{
    router.push({path:"/ticket",query:{departCity,arriveCity,flightDate}});
}
//获取数据并本地存储
function getDataToLocalStorage()
{
    if(localStorage.getItem('dictionary'))
    {
        console.log("有数据");
    }
    else
    {
        console.log("无数据");
        Promise.all([getColumnData('departCity'),getColumnData('airlineCompanyName'),getColumnData('aircraftType')])
            .then(response=>{
                console.log("response:",response);
                const dictionary={
                    cityList:response[0]?.data.data,
                    airlineCompanyNameList:response[1]?.data.data,
                    aircraftTypeList:response[2]?.data.data
                }
                localStorage.setItem('dictionary',JSON.stringify(dictionary));
            })
    }

}
onBeforeMount(()=>{
    //首页挂载前获取一些数据,(城市、航空公司、飞机机型、热门航线）
    getDataToLocalStorage();
    getHotFlight().then(res=>{
        let {data}=res.data;
        for(let i=0;i<4;i++)
        {
            data[i].img=`https://mp-b31258f4-397c-40ca-87bd-b790755e323b.cdn.bspapp.com/Airline-System/img/img/recommend/hot-${i+1}.jpg`
        }
        console.log("获取到的热门航线",data);
        flights.value=data;
    })
})
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
