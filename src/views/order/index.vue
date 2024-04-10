<script setup>
import orderDetail from "./components/orderDetail.vue"
import {onMounted, ref} from "vue";
import {getOrders} from "@/api/order.js"
let openOrderDetail=ref(false);//是否打开订单详情页面
//打开订单详情
function openOrderDetailPage(orderDetail)
{
    openOrderDetail.value=true;
    orderInformation.value=orderDetail;
}
const orderList=ref();//订单列表
const orderInformation=ref();//选中的某个订单的数据
onMounted(()=>{
    getOrders()
        .then(res=>{
            console.log("获取订单列表",res);
            orderList.value=res.data?.data;
        })
})
/**
 * 处理子组件通知父组件修改props
 */
function updateOrderStatus(updateOrder)
{
    console.log("子组件通知父组件时，触发update:order-information事件调用,data",updateOrder);
    //TODO:怎么修改对应order？
    console.log("orderList:",orderList);
    const index= orderList.value.findIndex(item=>item.orderID===updateOrder.orderID);
    console.log("findIndex返回的索引:",index);
    orderList.value[index].status=updateOrder.status;
}
</script>

<template>
<div class="container">
    <div class="order-list">
        <div class="body">
            <div class="order-item" v-for="item in orderList" :key="item.orderID" ref="a">
                <h3>
                    <div style="margin-right: 20px">
                        <span>订单号:</span>
                        <span class="order-id">{{item.orderID}}</span>
                    </div>
                    <div>
                        <span>预定日期:&nbsp;&nbsp;</span>
                        <span>{{ item.bookDate }}</span>
                    </div>
                </h3>
                <div class="item" @click="openOrderDetailPage(item)">
                    <div class="order-info">
                        <div class="title mb-6">
                            <span>{{item.departCity}} —— {{item.arriveCity}}</span>
                        </div>
                        <div class="txt mb-6">
                            <span>出发时间: {{ item.departTime }} 至 {{ item.arriveTime }} {{ item.flightNo }}</span>
                        </div>
                        <div class="txt mb-6">
                            <span>出行人: {{ item.name }}</span>
                        </div>
                    </div>
                    <div class="order-price-group">
                        <div class="order-price-status">
                            <span :style="{'color':item.status===-1?'#AAAAAA':'#0086f6'}">
                                {{ item.status===0?"待支付":item.status===1?"已支付":"已取消" }}
                            </span>
                        </div>
                        <div class="order-price-num"><span>¥{{item.price}}</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<order-detail v-model="openOrderDetail" :order-information="orderInformation" @update:order-status="updateOrderStatus"></order-detail>
</template>

<style scoped>
.container
{
    margin: 30px auto ;
    width: 1010px;
}
.order-item
{
    border: 1px solid #d9d9d9;
    margin-bottom: 10px;
    background-color: #ffffff;
    h3
    {
        display: flex;
        flex-direction: row;
        font-family: Tahoma,serif;
        font-weight: 400;
        color: #333333;
        background-color: #f6f6f6;
        height: 26px;
        line-height: 18px;
        padding-top: 8px;
        padding-left: 10px;
        font-size: 12px;
        .order-id
        {
            color: #06c;
            cursor: pointer;
            margin-left: 5px;
        }
        .order-id:hover
        {
            text-decoration: underline;
        }
    }
}
.order-item:hover
{
    border-color: #2577e3;
    background-color: #f7fbff;
}
.item
{
    padding: 10px 0 10px 28px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    .order-info,.order-price-group
    {
        display: flex;
        flex-direction: column;
    }
    .order-info
    {
        .mb-6
        {
            margin-bottom: 6px;
        }
        .title
        {
            font-size: 16px;
            line-height: 20px;
            color: #111111;
            font-weight: 700;
        }
        .txt
        {
            font-size: 12px;
            line-height: 16px;
            color: #333333;
        }
    }
    .order-price-group
    {
        padding-right: 12px;
        justify-content: end;
        .order-price-num
        {
            color: #333333;
            font-size: 18px;
            line-height: 20px;
            text-align: right;
            font-family: PingFangSC-Semibold,serif;
            letter-spacing: 0;
            font-weight: 600;
        }
        .order-price-status
        {
            margin-bottom: 4px;
            text-align: right;
            span
            {
                font-weight: 500;
                line-height: 20px;
                font-size: 14px;
                color: #0086f6;/*待支付，已支付文字颜色*/
            }
        }
    }
}
</style>
