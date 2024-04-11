<script setup>
import {computed, ref} from "vue";
import {updateOrder} from "@/api/order.js"
import { ElLoading , ElMessageBox } from 'element-plus'
import { getFormattedDate} from "@/utils/dateFormat.js"
let model=defineModel()
const props=defineProps(['orderInformation']);
const emit=defineEmits(['update:order-status']);
console.log("orderDetail收到的props：",props.orderInformation);
//支付截止时间
const paymentDeadline=computed(()=>{
    let timeParts = props.orderInformation.bookTime.split(':');
    let hours = parseInt(timeParts[0], 10);
    let minutes = parseInt(timeParts[1], 10);
    minutes += 15;
    if (minutes >= 60) {
        hours += 1;
        minutes -= 60;
    }
    hours = hours % 24; // 如果小时超过24，取模得到实际小时数
    return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
})

/**
 * 处理取消订单
 * @param status
 * @param orderID
 */
function cancelOrder(status,orderID)
{
    console.log(status,orderID);
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    setTimeout(() => {
        loading.close();
    }, 200)
    ElMessageBox.confirm(
        '确认取消订单吗?',
        '取消提示',
        {
            confirmButtonText: '继续取消',
            cancelButtonText: '再想想',
            center: true,
        }
    )
        /**
         * TRACK:这里成为了我理解promise的难题,我想的是点击了ElMessageBox.alert的知道了，才关闭orderDetail
         * chatgpt说了没有人处理ElMessageBox.alert,所以外面的then不会等待ElMessageBox.alert,所以就会立即执行
         */
        .then(()=>{
            return  updateOrder({status,orderID})
                .then(res=>{
                    console.log("更新订单成功",res);
                    return  ElMessageBox.alert('订单已取消成功','取消提示',{confirmButtonText:"知道了",})
                        .then(()=>{
                            console.log("点击了知道了才会输出");
                            //通知父组件修改props
                            emit('update:order-status', {status,orderID});
                            //关闭orderDetail
                            model.value=false;
                        })
                })
        })
}

/**
 * 处理去支付
 * @param status
 * @param orderID
 */
function handlePaymentClick(status,orderID)
{
    console.log(status,orderID);
}
</script>

<template>
    <el-dialog width="90%" v-model="model" style="background-color: #eef1f6">
        <div class="container">
            <div class="main-content">
                <div class="order-status">
                    <div class="order-status-card">
                        <div class="order-status-title">
                            <div class="status">
                                {{ props.orderInformation.status===0?"待支付":props.orderInformation.status===1?"已支付":"已取消" }}
                            </div>
                            <div class="order-id">
                                订单号: &nbsp;{{ props.orderInformation?.orderID }}
                            </div>
                        </div>
                        <div class="order-status-subtitle">
                            请在最晚支付时间<strong> {{ paymentDeadline }} </strong>前支付，完成支付才能锁定价格
                        </div>
                        <div class="button-group">
                            <button @click="handlePaymentClick(1,props.orderInformation.orderID)">去支付</button>
                            <button @click="cancelOrder(-1,props.orderInformation.orderID)">取消订单</button>
                            <button>我要报销</button>
                        </div>
                        <div class="prompt"></div>
                    </div>
                </div>
                <div class="flight">
                    <div class="flight-title">
                        <span>{{props.orderInformation.departCity}}</span>
                        <svg t="1712742317437" style="margin-left: 5px;margin-right: 5px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7695" width="16" height="16"><path d="M984.618667 594.538667a54.741333 54.741333 0 0 0-17.066667-20.032l-34.154667-27.093334-273.173333-214.869333c-28.842667-24.128-49.450667-12.373333-42.389333 25.92l36.501333 189.568H77.994667a35.328 35.328 0 1 0 0 70.634667h872.469333c27.669333 0 38.848-10.026667 34.133333-24.128" fill="#666666" p-id="7696"></path></svg>
                        <span>{{ props.orderInformation.arriveCity }}</span>
                    </div>
                    <div class="flight-card">
                        <div class="flight-date">{{getFormattedDate(new Date())}}</div>
                        <div class="flight-main-container">
                            <div class="flight-box">
                                <div class="depart">
                                    <strong>20:30</strong>
                                    <span>
                                        <span class="city">{{ props.orderInformation.departCity }}</span>
                                        <span class="airport">{{ props.orderInformation.departPortName }}</span>
                                    </span>
                                </div>
                                <div class="middle-box"></div>
                                <div class="arrive">
                                    <strong>22:30</strong>
                                    <span>
                                        <span class="city">{{ props.orderInformation.arriveCity }}</span>
                                        <span class="airport">{{ props.orderInformation.arrivePortName }}</span>
                                    </span>
                                </div>
                            </div>
                            <div class="flight-basic-box">
                                <img src="../../../assets/img/airlines/3U.png" width="16px" height="16px">
                                <span>
                                      <span>{{ props.orderInformation.airlineCompanyName }}</span><span>{{ props.orderInformation.flightNo }}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="passenger">
                    <div class="passenger-title">出行人信息</div>
                    <div class="passenger-card">
                        <div class="name">{{ props.orderInformation.name }}</div>
                        <div class="identity">
                            <span>身份证:</span>
                            <span>{{ props.orderInformation.identity }}</span>
                        </div>
                    </div>
                </div>
                <div class="contactInfo">
                    <div class="contactInfo-title">联系人信息</div>
                    <div class="contactInfo-card">
                        <div class="phone">
                            <span>手机号:</span>
                            <span>{{ props.orderInformation.phone }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sub-content">
                <div class="payment">
                    <div class="payment-title">订单支付明细</div>
                    <div class="payment-wrapper">
                        <div class="amount">
                            <h5>下单金额</h5>
                            <p>{{ props.orderInformation.bookDate }} {{ props.orderInformation.bookTime }}</p>
                        </div>
                        <div class="price">
                            <dfn>¥</dfn>{{ props.orderInformation.price }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>

</template>

<style scoped>
.container
{
    margin: 30px 102px 30px 102px;
    display: flex;
    flex-direction: row;
    .main-content
    {
        flex: 2;
    }
    .sub-content
    {
        flex: 1;
        margin-left: 40px;
    }
    .order-status,.passenger,.contactInfo,.payment,.flight
    {
        background-color: #ffffff;
        border-radius: 8px;
        margin-bottom: 16px;
    }
}

.order-status
{
    .order-status-card
    {
        padding: 24px;
        .order-status-title
        {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
            .status
            {
                font-weight: 600;
                font-size: 30px;
                color: rgb(255,119,0);
            }
            .order-id
            {
                font-size: 12px;
                white-space: nowrap;
                color: rgb(51,51,51);
            }
        }
        .order-status-subtitle
        {
            color: rgb(51,51,51);
        }
        .button-group
        {
            margin-top: 16px;
            display: flex;
            button
            {
                min-width: 102px;
                text-align: center;
                padding: 6px 14px;
                margin-left: 16px;
                border: 1px solid rgb(0,134,246);
                border-radius: 4px;
                font-weight: 500;
                font-size: 14px;
                color: rgb(0,134,246);
                background-color: #ffffff;
                cursor: pointer;
                text-decoration: none;
                outline: none;
                vertical-align: middle;
                transition: color 0.3s ease 0s;
            }
            button:hover
            {
                background-color: rgb(242,248,254);
            }
            button:first-child
            {
                border: 1px solid rgb(255,119,0);
                background-color: rgb(255,119,0);
                color: #ffffff;
                margin-left: 0;
            }
            button:first-child:hover
            {
                background-color: rgb(229,133,0);
                border-color: rgb(229,133,0) ;
            }
        }
    }
}
.passenger,.contactInfo,.flight
{
    .passenger-title,.contactInfo-title,.flight-title
    {
        padding: 16px 24px;
        font-size: 20px;
        font-weight: 600;
        line-height: 1.4;
        background-color: rgb(246,248,250);
        align-items: center;
        color: rgb(51,51,51);
    }
    .passenger-card,.contactInfo-card,.flight-card
    {
        padding: 24px;
        .name
        {
            font-size: 16px;
            color: rgb(51,51,51);
            font-weight: bold;
            margin-bottom: 16px;
        }
        .identity,.phone
        {
            margin-top: 8px;
            span
            {
                color: rgb(51,51,51);
                font-size: 14px;
            }
            span:first-child
            {
                min-width: 80px;
                max-width: 120px;
                display: inline-block;
            }
        }
    }
}
.payment
{
    padding: 24px;
    .payment-title
    {
        color: rgb(51,51,51);
        font-weight: bold;
        font-size: 20px;
        padding-bottom: 24px;
    }
    .payment-wrapper
    {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-top: 24px;
        border-top: 1px dashed rgb(221,221,221);
        .amount
        {
            h5
            {
                font-size: 16px;
                font-weight: bold;
                color: rgb(51,51,51);
                letter-spacing: 0.2px;
            }
            p
            {
                font-size: 12px;
                color: rgb(102, 102, 102);
                letter-spacing: 0.15px;
            }
        }
        .price
        {
            color: rgb(0, 134, 246);
            font-weight: bold;
            letter-spacing: 0;
            margin-left: 4px;
            line-height: 1.4;
            text-align: right;
            font-size: 16px;
            dfn
            {
                font-family: Arial, Tahoma, sans-serif;
                font-style: normal;
                font-size: 12px;
            }
        }
    }
}
.flight-card
{
    .flight-date
    {
        margin-bottom: 16px;
        font-size: 16px;
        font-weight: 600;
        color: rgb(51, 51, 51);
    }
    .flight-main-container
    {
        display: flex;
        flex-direction: row;
    }
    .flight-box
    {
        width: 58%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-right: 16px;
        position: relative;
        .middle-box
        {
            margin: 18px 0;
        }
        .depart,.arrive
        {
            font-size: 14px;
            display: flex;
            flex-direction: row;
            align-items: center;
            color: rgb(51,51,51);
            position: relative;
            strong
            {
                margin-left: 12px;
                margin-right: 40px;
                width: 48px;
                text-align: right;
                font-weight: 600;
            }
            span
            {
                margin-right: 8px;
                flex: 1 1 0%;
                .city
                {
                    font-weight: 600;
                    margin-right: 8px;
                }
            }
        }
        .depart:before,.arrive:before
        {
            content: "";
            width: 8px;
            height: 8px;
            background-color: #dde4ed;
            position: absolute;
            top: 8px;
            bottom: 0;
            left: 76px;
        }
    }
    .flight-box:before
    {
        content: "";
        width: 4px;
        height: 42px;
        background-color: rgb(221,228,237);
        position: absolute;
        border-radius: 1px;
        top: 18px;
        bottom: 10px;
        left: 78px;
    }
    .flight-basic-box
    {
        span
        {
            margin-left: 4px;
            margin-right: 8px;
            font-size: 14px;
            color: rgb(51,51,51);
        }
        span:first-child
        {
            margin-right: 1px;
        }
    }
}
</style>
