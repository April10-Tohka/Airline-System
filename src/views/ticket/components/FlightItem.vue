<script setup>
import { ElLoading } from 'element-plus'
const props=defineProps({
    flightTickets:{
        type:Array,
        default:null
    }
})
const emit=defineEmits(["showOrder"])


/**
 * 订票
 * @param ticket 飞机票
 */
function bookTicket(ticket)
{
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    setTimeout(() => {
        loading.close();
        emit("showOrder",
            {
                selectTicket:ticket,
                showOrder:true
            })
    }, 200)
}
</script>

<template>
    <div class="container">
        <div class="flight-list">
            <div class="flight-item" v-for="ticket in props.flightTickets" :key="ticket.flightNo">
                <div class="flight-box">
                    <div class="flight-airline">
                        <div class="airline-logo">
                            <img src="../../../assets/img/airlines/3U.png" alt="" width="48px" height="48px">
                        </div>
                        <ul>
                            <li class="airline-name"><span>{{ticket.airlineCompanyName}}</span></li>
                            <li class="plane"><span>{{ticket.flightNo}} {{ticket.aircraftType}}</span></li>
                        </ul>

                    </div>
                    <div class="flight-detail">
                        <div class="depart-box">
                            <div class="time">{{ticket.departTime}}</div>
                            <div class="airport">{{ ticket.departPortName }}</div>
                        </div>
                        <div class="arrow-box">
                            <img src="../../../assets/img/component/to.png" alt="" width="120px" >
                        </div>
                        <div class="arrive-box">
                            <div class="time">{{ ticket.arriveTime }}</div>
                            <div class="airport">{{ ticket.arrivePortName }}</div>
                        </div>
                    </div>
                    <div class="flight-tag">
                        <el-tooltip effect="light">
                            <template #default><span>租车新客￥788满减券</span></template>
                            <!--                                TODO:调下提示文字排版-->
                            <template #content>
                                <p style="width: 378px;height: 274px;font-size: 12px">
                                    （1）使用范围：适用于携程租车频道，以在线预付方式预订国内租车产品可用（部分供应商产品不可用，具体以列表页展示为准）； （2）券有效期：优惠券领取后7天内有效，过期自动失效； （3）门槛阶梯：可享租车费满100-12/满200-24/满400-48/满800-96/满1000-120/满6000-788元优惠（优惠金额仅限租车费，不含手续费、基础服务费、优享服务费、异地还车费等费用 ）； （4）使用限制：每张优惠券仅限使用1次，仅限本用户下单使用，不拆分、不找零、不转赠、不可与其他优惠活动及优惠券同享；已完成支付的订单不能使用此券； （5）退赔说明：使用券的订单无损取消、超时未支付、购买失败或因订单变更导致订单金额未满足优惠门槛的，若该券尚未失效将退回原账户，若该券已失效不予退回；如订单支持变更，已用券的订单因变更导致订单金额增加的，仅可享受变更前的阶梯优惠金额；已用券的订单如取消且产生取消费用的，优惠券因涉及抵扣（或部分抵扣）将不予退回。
                                </p>
                            </template>
                        </el-tooltip>
                    </div>
                    <div class="flight-operate">
                        <div class="flight-price">
                            <span>￥</span>
                            <span style="font-size: 32px" >{{ ticket.price }}</span>
                        </div>
                        <div class="flight-action">
                            <button @click="bookTicket(ticket)">订票</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">
/*飞机票栏样式*/
$padding-left:33px;
.container
{
    padding-left: $padding-left;
    margin-top: 4px;
}
.flight-list
{
    line-height: 1;
}
.flight-item
{
    margin-top: 2px;
    margin-bottom: 2px;
    transition: box-shadow 0.3s;
}
.flight-item:hover
{
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2), 0 12px 25px rgba(0, 0, 0, 0.15);
}
.flight-item .flight-box
{
    padding-left: 6px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
}
.flight-box .flight-airline
{
    display: flex;
    flex-direction: row;
    padding-left: 40px;
    padding-top: 24px;
    padding-bottom: 13px;
    width: 215px;
}
.flight-box .flight-airline ul
{
    display: flex;
    flex-direction: column;
    padding-left: 15px;
    .airline-name
    {
        font-size: 14px;
        margin-bottom: 10px;
        color: #333333;
    }
    .plane
    {
        margin-top: 5px;
        color: #0086f6;
        font-size: 12px;
    }
}
.flight-box .flight-detail
{
    margin-left: 80px;
    display: flex;
    flex-direction: row;
    flex: 1;
    .depart-box,.arrive-box
    {
        text-align: right;
        .time
        {
            font-size: 33px;
            color: #333333;
        }
        .airport
        {
            font-size: 12px;
            color: #333333;
            margin-top: 4px;
        }
    }
    .arrow-box
    {
        position: relative;
        top: 16px;
        margin: 0 10px;
    }
}
.flight-box .flight-tag
{
    position: relative;
    right: 25px;
    color: #00b87a;
    border: 1px solid #bfeddd;
    border-radius: 2px;
    padding: 1px 4px 2px;
    line-height: 12px;
    font-size: 12px;
    display: inline-block;
}
.flight-box .flight-operate
{
    display: flex;
    flex-direction: row;
    padding-right: 25px;
    .flight-price
    {
        color: #ff7d13;
        line-height: 26px;
        font-size: 22px;
    }
    .flight-action
    {
        margin-left: 4px;
        button
        {
            padding: 0 9px;
            width: 62px;
            height: 32px;
            line-height: 32px;
            font-size: 14px;
            font-weight: 600;
            color: #ffffff;
            cursor: pointer;
            opacity: 0.9;
            background-image: linear-gradient(90deg,#ffa50a,#f70);
            outline: none;
            border: 1px solid #ff9913;
            border-radius: 4px;
        }
    }
}
</style>
