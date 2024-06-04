<script setup>
import SearchForm from "@/views/home/components/SearchForm.vue";
import FlightItem from "@/views/ticket/components/FlightItem.vue";
import TopBar from "@/views/ticket/components/TopBar.vue";
import BookConfirmation from "./components/BookConfirmation.vue"
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
const route=useRoute();
const flightTickets=ref([{
    flightNo:"mu1234",
    airlineCompanyName:"四川航空",
    aircraftType:"波音737",
    departTime:"10:27:00",
    departPortName:"宝安机场",
    arriveTime:"10:27:00",
    arrivePortName:"宝安机场",
    price:12321
},
    {
        flightNo:"mu1234",
        airlineCompanyName:"四川航空",
        aircraftType:"波音737",
        departTime:"10:27:00",
        departPortName:"宝安机场",
        arriveTime:"10:27:00",
        arrivePortName:"宝安机场",
        price:12321
    }]);//飞机票

function test()
{
    console.log("ticket组件传递的");
}
//是否显示订单弹窗
let showOrder=ref(false);
//选择的飞机票
let selectTicket=ref(null);
function handleShowOrder(args)
{
    console.log("处理ShowOrder事件的回调函数",args);
    showOrder.value=args.showOrder;
    selectTicket.value=args.selectTicket;
}
</script>

<template>
    <SearchForm :on-click="test"></SearchForm>
    <div class="body-wrapper">
        <div class="result-header">
            <div class="address">
                <span class="depart">{{route.query.depart}}</span>
                <svg t="1710934823512" class="arrow" viewBox="0 0 6016 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5180" width="32" height="32"><path d="M5043.2 768V179.2c0-76.8 51.2-128 128-128 38.4 0 64 12.8 89.6 38.4l716.8 716.8c51.2 51.2 51.2 128 0 179.2-25.6 25.6-51.2 38.4-89.6 38.4H179.2c-76.8 0-128-51.2-128-128s51.2-128 128-128h4864z" fill="#333333" p-id="5181"></path></svg>
                <span class="arrival">{{route.query.arrival}}</span>
            </div>
            <div class="depart-date">{{route.query.departDate}}</div>
        </div>
<!--        顶部工具栏-->
        <TopBar></TopBar>
<!--        飞机票-->
        <FlightItem :flight-tickets="flightTickets" @showOrder="handleShowOrder"></FlightItem>
    </div>
<!--    确认订单窗口-->
    <BookConfirmation v-model="showOrder" :ticket="selectTicket"></BookConfirmation>
</template>





<style scoped lang="scss">
$padding-left: 33px;
.body-wrapper
{
    max-width: 1180px;
    margin: 0 auto;
}
.result-header
{
    margin-bottom: 4px;
    display: flex;
    flex-direction: row;
    padding-left: $padding-left;
    align-items: center;
    line-height: 1;
    height: 50px;
    .address
    {
        display: flex;
        flex-direction: row;
        align-items: center;
        .depart,.arrival
        {
            font-weight: 700;
            font-size: 24px;
        }
        .arrow
        {
            margin: 0 4px;
        }
    }
    .depart-date
    {
        color: #333333;
        font-size: 18px;
        margin-left: 10px;
    }
}




</style>

