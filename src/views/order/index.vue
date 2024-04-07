<script setup>
import orderDetail from "./components/orderDetail.vue"
import {ref} from "vue";
let openOrderDetail=ref(false);//是否打开订单详情页面
//打开订单详情
function openOrderDetailPage()
{
    openOrderDetail.value=true;
}
</script>

<template>
<div class="container">
    <div class="order-list">
        <div class="body">
            <div class="order-item">
                <h3>
                    <div style="margin-right: 20px">
                        <span>订单号:</span>
                        <span class="order-id">3154138767</span>
                    </div>
                    <div>
                        <span>预定日期:&nbsp;&nbsp;</span>
                        <span>2024-04-07</span>
                    </div>
                </h3>
                <div class="item" @click="openOrderDetailPage">
                    <div class="order-info">
                        <div class="title mb-6">
                            <span>北京 —— 广州</span>
                        </div>
                        <div class="txt mb-6">
                            <span>出发时间: 21:30 至 01:15 MU6311</span>
                        </div>
                        <div class="txt mb-6">
                            <span>出行人: 张三</span>
                        </div>
                    </div>
                    <div class="order-price-group">
                        <div class="order-price-status">
                            <span>待支付</span>
                        </div>
                        <div class="order-price-num"><span>¥711</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<order-detail v-model="openOrderDetail"></order-detail>
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
            span
            {
                font-weight: 500;
                line-height: 20px;
                font-size: 14px;
                color: #AAAAAA;/*已取消文字颜色*/
                color: #0086f6;/*待支付文字颜色*/
            }
        }
    }
}
</style>
