<script setup>
import {ref} from "vue";
import {getFormattedDate} from "@/utils/dateFormat.js"
const model=defineModel()
function closeDialog()
{
    //清空乘机人信息
    passenger.value={name:"", identity:"", phone:""};
}
let currentIndex=ref(undefined);
const props=defineProps(['ticket'])
const passenger=ref({
    name:"",
    identity:"",
    phone:""
});//乘机人信息
let hints=ref({
    nameHint:true,
    identityHint:true,
    phoneHint:true
})
/**
 * 输入框聚焦时
 * @param index
 * @param event
 */
function  focusInput(index,event)
{
    currentIndex.value=index;
    // 显示对应的label
    switch (event.target.id) {
        case 'p-name':
            hints.value.nameHint=true;
            break;
        case 'p-identity':
            hints.value.identityHint=true;
            break;
        case 'p-phone':
            hints.value.phoneHint=true;
            break;
    }
}
function blurInput(event)
{
    switch (event.target.id) {
        case 'p-name':
            if(event.target.value!=="")
            {
                //输入框失去焦点后，如果有值，对应的label不显示
                hints.value.nameHint=false;
                return
            }
            break;
        case 'p-identity':
            if(event.target.value!=="")
            {
                hints.value.identityHint=false;
                return
            }
            break;
        case 'p-phone':
            if(event.target.value!=="")
            {
                hints.value.phoneHint=false;
                return;
            }
    }
    currentIndex.value=0;
}
</script>

<template>
    <el-dialog v-model="model" width="95%" style="background-color: #eef1f6" @close="closeDialog">
        <div class="container">
            <div class="main">
                <div class="passenger-box">
                    <div class="passenger-content">
                        <div class="passenger-header">
                            <h2><span>乘机人</span></h2>
                        </div>
                        <div class="passenger-list">
                            <div class="basic-card">
                                <div class="extra-box">
                                    <div class="passenger-num">1</div>
                                </div>
                                <div class="passenger-info">
                                    <div class="form">
                                        <div class="name">
                                            <div class="form-control-input">
                                                <input class="form-input" id="p-name" @focus="focusInput(1,$event)" @blur="blurInput" v-model="passenger.name">
                                                <label for="p-name" class="form-input-hint"
                                                v-show="hints.nameHint"       :class="{'form-input-hint-focus':currentIndex===1}"
                                                >请与登机证件姓名保持一致</label>
                                            </div>
                                        </div>
                                        <div class="identity">
                                            <div class="form-control-input">
                                                <input class="form-input" id="p-identity" @focus="focusInput(2,$event)" @blur="blurInput($event)" v-model="passenger.identity">
                                                <label for="p-identity" class="form-input-hint"
                                                v-show="hints.identityHint" :class="{'form-input-hint-focus':currentIndex===2}"
                                                >登机证件号码</label>
                                            </div>
                                        </div>
                                        <div class="phone">
                                            <div class="form-control-input">
                                                <input class="form-input" id="p-phone" @focus="focusInput(3,$event)" @blur="blurInput" v-model="passenger.phone">
                                                <label for="p-phone" class="form-input-hint"
                                                v-show="hints.phoneHint" :class="{'form-input-hint-focus':currentIndex===3}">乘机人手机号码</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="action-box">
                    <button>下一步</button>
                </div>
                <div class="foot-tip">
                    <h4>点击下一步表示您已阅读并同意以下内容：</h4>
                    <div class="foot-tip-content">
                        根据航空公司要求，购买机票需提交乘机人身份证件信息，并在乘机时出具对应身份证件用于验证，请确保录入信息真实有效。携程将通过加密等方式保护您录入的身份证件信息，且在具体订票过程中授权提供给您提供服务的产品供应商、承运人、机票分销系统服务商。
                    </div>
                </div>
            </div>
            <div class="sidebar">
                <div class="sidebar-cont">
                    <div class="flight-info">
                        <div class="flight-city">
                            <div class="flt-date">
                                {{getFormattedDate(new Date())}}
                            </div>
                            <div class="flt-depart">{{ props.ticket.departCity }}</div>
                            <div class="flt-arrow">
                                <svg t="1712396737300" class="icon" viewBox="0 0 6016 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4238" width="16" height="16"><path d="M5043.2 768V179.2c0-76.8 51.2-128 128-128 38.4 0 64 12.8 89.6 38.4l716.8 716.8c51.2 51.2 51.2 128 0 179.2-25.6 25.6-51.2 38.4-89.6 38.4H179.2c-76.8 0-128-51.2-128-128s51.2-128 128-128h4864z" fill="#2c2c2c" p-id="4239"></path></svg>
                            </div>
                            <div class="flt-arrive">{{props.ticket.arriveCity}}</div>
                        </div>
                        <div class="flight-tit">
                            <div class="airline-logo">
                                <img src="../../../assets/img/airlines/3U.png" alt="" width="16px" height="16px">
                            </div>
                            <div class="airline-name">
                                <span>{{props.ticket.airlineCompanyName}}</span>
                            </div>
                            <div class="flightNo">
                                <span>{{props.ticket.flightNo}}</span>
                            </div>
                        </div>
                        <div class="flight-detail">
                            <div class="flt-depart">
                                <div class="time">{{props.ticket.departTime}}</div>
                                <div class="airport">{{props.ticket.departPortName}}</div>
                            </div>
                            <div class="flt-arrow">
                                <div class="line"></div>
                                <svg t="1712406349115" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5988" width="24" height="24"><path d="M942.958 580.87 637.205 580.87 405.844 966.488 295.652 966.488l137.74-385.618L213.008 580.87 102.852 691.044 20.208 691.044l76.726-179.026L20.208 332.956l82.644 0 110.156 110.192 192.835 0L295.652 57.511l110.192 0 220.349 385.636 316.766 0c38.022 0 68.834 30.83 68.834 68.87C1011.792 550.039 980.98 580.87 942.958 580.87z" fill="#dbe2ea" p-id="5989"></path></svg>
                                <i class="dot"></i>
                                <i class="dot dot-end"></i>
                            </div>
                            <div class="flt-arrive">
                                <div class="time">{{props.ticket.arriveTime}}</div>
                                <div class="airport">{{props.ticket.arrivePortName}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="price-info">
                        <div class="flight-cost">
                            <div class="total-price">
                                <span style="font-size: 18px">￥</span>
                                <span>{{props.ticket.price}}</span>
                            </div>
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
    display: flex;
    flex-direction: row;
    .main
    {
        display: flex;
        flex-direction: column;
        flex: 1;
    }
    .sidebar
    {
        flex: 1;
    }
}
.passenger-box
{
    background-color: #ffffff;
    padding: 22px 16px 25px;
    border-radius: 4px;
    box-shadow: 0 4px 16px 1px rgba(0,0,0,0.06);
    margin-bottom: 20px;
    .passenger-header
    {
        margin-bottom: 24px;
    }
    .passenger-list
    {
        .basic-card
        {
            display: flex;
            flex-direction: row;
            background-color: #ffffff;
            border-radius: 4px;
            border: 1px solid #dddddd;
            box-shadow: none;
            width: 748px;
        }
        .extra-box
        {
            width: 128px;
            margin: 16px 0 13px;
            border-right: 1px dashed #d6dde2;
            align-self: stretch;
            .passenger-num
            {
                line-height: 1;
                color: #ccd6e5;
                font-size: 34px;
                font-weight: bold;
                font-family:  D-DIN-Bold, "Helvetica Neue", Tahoma, Arial, PingFangSC-Regular, "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
                position: relative;
                top: 16px;
                left: 16px;
            }
        }
        .passenger-info
        {
            width: 400px;
            padding: 0 0 20px 24px;
            vertical-align: middle;
        }
        .name,.identity,.phone
        {
            height: 52px;
            position: relative;
            .form-control-input
            {
                display: inline-block;
            }
            .form-input
            {
                padding: 20px 0 8px 0;
                height: 18px;
                font-weight: bold;
                font-size: 14px;
                color: #223344;
                background-color: #ffffff;
                border: none;
                border-bottom: 1px solid #b4c4d6;
                border-radius: 0;
                outline: none;
            }
            .form-input-hint
            {
                color: #cccccc;
                font-size: 14px;
                font-weight: 300;
                position: absolute;
                top: 20px;
                left: 0px;
                transition-property: top,left,color,transform,opacity;
                transition-duration: 0.2s;
                transition-timing-function: linear;
            }
            .form-input-hint-focus
            {
                top: 3px;
                transform: scale(0.85);
                opacity: 0.85;
            }
        }
        .name .form-input-hint-focus
        {
            left: -15px !important;
        }
        .identity .form-input-hint-focus
        {
            left: -8px !important;
        }
        .phone .form-input-hint-focus
        {
            left: -8px !important;
        }
    }
}
.action-box
{
    width: 780px;
    text-align: center;
    margin-bottom: 10px;
    button
    {
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        color: #ffffff;
        text-decoration: none;
        background-color: #2277ee;
        border: 1px solid #2277ee;
        border-radius: 3px;
        cursor: pointer;
    }
}
.foot-tip
{
    h4
    {
        color: #666;
        font-family: PingFangSC-Semibold,serif;
        font-size: 12px;
        font-weight: 600;
    }
    .foot-tip-content
    {
        margin-top: 4px;
        color: #999;
        font-family: PingFangSC-Regular,serif;
        font-size: 12px;
        font-weight: normal;
    }
}
.sidebar
{
    background-color: #f5f8f9;
    margin-left: 30px;
    .sidebar-cont
    {
        position: sticky;
        top: 0;
    }
    .flight-info
    {
        padding: 26px 0 30px;
        border-bottom: 1px solid #e0e5e7;
        text-align: center;
    }
}
.flight-city
{
    padding-bottom: 8px;
    font-size: 16px;
    font-weight: 700;
    display: flex;
    flex-direction: row;
    justify-content: center;
    .flt-date
    {
        margin-right: 20px;
        .week
        {
            margin-left: 9px;
        }
    }
    .flt-arrow
    {
        margin-left: 9px;
        margin-right: 9px;
    }
}
.flight-tit
{
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: #849bab;
    font-size: 12px;
    padding-bottom: 10px;
    .airline-name
    {
        margin-left: 10px;
        margin-right: 5px;
    }
}
.flight-detail
{
    padding-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .flt-depart
    {
        text-align: right;
    }
    .flt-arrive
    {
        text-align: left;
    }
    .time
    {
        font-size: 24px;
        font-weight: 500;
        color: #223344;
    }
    .airport
    {
        padding-top: 6px;
    }
    .flt-arrow
    {
        align-self: center;
        position: relative;
        .icon
        {
            position: absolute;
            top: -11px;
        }
        .line
        {
            width: 148px;
            height: 1px;
            background-color: #dbe2ea;
        }
        .dot
        {
            display: block;
            width: 6px;
            height: 6px;
            background-color: #dbe2ea;
            position: absolute;
            top: -2px;
            left: 0px;
        }
        .dot-end
        {
            left: 146px;
        }
    }
}
.flight-cost
{
    padding:10px 30px;
    .total-price
    {
        text-align: right;
        padding:13px 30px 0;
        color: #ff7d13;
        font-size: 35px;
        font-weight: 700;
    }
}
</style>
