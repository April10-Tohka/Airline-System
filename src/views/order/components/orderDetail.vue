<script setup>
import {ref} from "vue";

let model=defineModel()
</script>

<template>
    <el-dialog width="90%" v-model="model" style="background-color: #eef1f6">
        <div class="container">
            <div class="main-content">
                <div class="order-status">
                    <div class="order-status-card">
                        <div class="order-status-title">
                            <div class="status">待支付</div>
                            <div class="order-id">
                                订单号: &nbsp;3113219308
                            </div>
                        </div>
                        <div class="order-status-subtitle">
                            请在最晚支付时间15:35前支付，完成支付才能锁定价格
                        </div>
                        <div class="button-group">
                            <button>去支付</button>
                            <button>取消订单</button>
                            <button>我要报销</button>
                        </div>
                        <div class="prompt"></div>
                    </div>
                </div>
                <div class="passenger">
                    <div class="passenger-title">出行人信息</div>
                    <div class="passenger-card">
                        <div class="name">张三</div>
                        <div class="identity">
                            <span>身份证:</span>
                            <span>151251312312312312312</span>
                        </div>
                    </div>
                </div>
                <div class="contactInfo">
                    <div class="contactInfo-title">联系人信息</div>
                    <div class="contactInfo-card">
                        <div class="phone">
                            <span>手机号:</span>
                            <span>13712345678</span>
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
                            <p>04-07 15:20</p>
                        </div>
                        <div class="price">
                            <dfn>¥</dfn>572
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
    .order-status,.passenger,.contactInfo,.payment
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
.passenger,.contactInfo
{
    .passenger-title,.contactInfo-title
    {
        padding: 16px 24px;
        font-size: 20px;
        font-weight: 600;
        line-height: 1.4;
        background-color: rgb(246,248,250);
        align-items: center;
        color: rgb(51,51,51);
    }
    .passenger-card,.contactInfo-card
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
</style>
