<template>
    <div>
        <ul>
            <li class="ticketCardPos" style="margin: 10px 0">
                <div style="font-size: 24px;color: #333;font-weight: 700">
                    {{flight.startCity}}
                </div>
                <svg t="1710934823512" style="margin: 0 5px;" viewBox="0 0 6016 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5180" width="32" height="32"><path d="M5043.2 768V179.2c0-76.8 51.2-128 128-128 38.4 0 64 12.8 89.6 38.4l716.8 716.8c51.2 51.2 51.2 128 0 179.2-25.6 25.6-51.2 38.4-89.6 38.4H179.2c-76.8 0-128-51.2-128-128s51.2-128 128-128h4864z" fill="#333333" p-id="5181"></path></svg>
                <div style="font-size: 24px;color: #333;font-weight: 700">
                    {{flight.arriveCity}}
                </div>
                <div style="font-size: 18px;margin-left: 10px;margin-top: 5px;color: #333">
                    {{getFormattedDate(flight.flightDate)}}
                </div>
            </li>
            <li class="ticketCardPos">
                <div class="filterCard">
                    <!--              TODO:设置下拉菜单的dropdown区域，根据接口返回航班的信息，比如机场，时间，航空公司-->
                    <div class="filter_item_toggle_entry mr-16">
                        <el-checkbox label="直飞"></el-checkbox>
                    </div>
                    <div class="filter_item_airline mr-16">
                        <el-dropdown trigger="click">
                            <el-button >
                                航空公司<el-icon class="el-icon--right"><arrow-down /></el-icon>
                            </el-button>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item>Action 1</el-dropdown-item>
                                    <el-dropdown-item>Action 2</el-dropdown-item>
                                    <el-dropdown-item>Action 3</el-dropdown-item>
                                    <el-dropdown-item disabled>Action 4</el-dropdown-item>
                                    <el-dropdown-item divided>Action 5</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                    <div class="filter_item_time mr-16">
                        <el-dropdown>
                            <el-button >
                                起抵时间<el-icon class="el-icon--right"><arrow-down /></el-icon>
                            </el-button>
                        </el-dropdown>
                    </div>
                    <div class="filter_item_airport mr-16">
                        <el-dropdown>
                            <el-button >
                                机场<el-icon class="el-icon--right"><arrow-down /></el-icon>
                            </el-button>
                        </el-dropdown>
                    </div>
<!--                    TODO:该清空button只有点击fliter的选项才显示-->
                    <div class="filter_item_clear">
                        <el-button text >清空</el-button>
                    </div>
                    <div class="sortbar">
                        <div v-for="(item,index) in sortbarItems" :key="index" :class="{active:currentIndex===index}" @click="toggleClass(index)">
                            {{item.label}}
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="container">
            <div class="flight-list">
<!--                飞机票-->
                <div class="flight-item">
                    <div class="flight-box">
                        <div class="flight-airline">
                            <div class="airline-logo">
                                <img src="../assets/img/airlines/3U.png" alt="" width="48px" height="48px">
                            </div>
                            <ul>
                                <li class="airline-name"><span>海南航空</span></li>
                                <li class="plane"><span>HU7723 波音737(中)</span></li>
                            </ul>

                        </div>
                        <div class="flight-detail">
                            <div class="depart-box">
                                <div class="time">23:10</div>
                                <div class="airport">宝安国际机场</div>
                            </div>
                            <div class="arrow-box">
                                <img src="../assets/img/component/to.png" alt="" width="120px" >
                            </div>
                            <div class="arrive-box">
                                <div class="time">01:25</div>
                                <div class="airport">浦东国际机场</div>
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
                                <span style="font-size: 32px" >830</span>
                            </div>
                            <div class="flight-action">
                                <button>订票</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flight-item">
                    <div class="flight-box">
                        <div class="flight-airline">
                            <div class="airline-logo">
                                <img src="../assets/img/airlines/A6.png" alt="" width="48px" height="48px">
                            </div>
                            <ul>
                                <li class="airline-name"><span>东方航空</span></li>
                                <li class="plane"><span>MU725 空客321(中)</span></li>
                            </ul>

                        </div>
                        <div class="flight-detail">
                            <div class="depart-box">
                                <div class="time">21:20</div>
                                <div class="airport">浦东国际机场</div>
                            </div>
                            <div class="arrow-box">
                                <img src="../assets/img/component/to.png" alt="" width="120px" >
                            </div>
                            <div class="arrive-box">
                                <div class="time">00:15</div>
                                <div class="airport">香港国际机场</div>
                            </div>
                        </div>
                        <div class="flight-tag">
                            <el-tooltip effect="light">
                                <template #default><span>租车新客￥788满减券</span></template>
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
                                <span style="font-size: 32px" >4943</span>
                            </div>
                            <div class="flight-action">
                                <button>订票</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flight-item">
                    <div class="flight-box">
                        <div class="flight-airline">
                            <div class="airline-logo">
                                <img src="../assets/img/airlines/DR.png" alt="" width="48px" height="48px">
                            </div>
                            <ul>
                                <li class="airline-name"><span>国泰航空</span></li>
                                <li class="plane"><span>CX831 空客330(大)</span></li>
                            </ul>

                        </div>
                        <div class="flight-detail">
                            <div class="depart-box">
                                <div class="time">19:00</div>
                                <div class="airport">浦东国际机场</div>
                            </div>
                            <div class="arrow-box">
                                <img src="../assets/img/component/to.png" alt="" width="120px" >
                            </div>
                            <div class="arrive-box">
                                <div class="time">21:55</div>
                                <div class="airport">香港国际机场</div>
                            </div>
                        </div>
                        <div class="flight-tag">
                            <el-tooltip effect="light">
                                <template #default><span>租车新客￥788满减券</span></template>
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
                                <span style="font-size: 32px" >2375</span>
                            </div>
                            <div class="flight-action">
                                <button>订票</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flight-item">
                    <div class="flight-box">
                        <div class="flight-airline">
                            <div class="airline-logo">
                                <img src="../assets/img/airlines/9C.png" alt="" width="48px" height="48px">
                            </div>
                            <ul>
                                <li class="airline-name"><span>四川航空</span></li>
                                <li class="plane"><span>3U8966 空客319(中)</span></li>
                            </ul>

                        </div>
                        <div class="flight-detail">
                            <div class="depart-box">
                                <div class="time">19:55</div>
                                <div class="airport">浦东国际机场</div>
                            </div>
                            <div class="arrow-box">
                                <img src="../assets/img/component/to.png" alt="" width="120px" >
                            </div>
                            <div class="arrive-box">
                                <div class="time">11:45</div>
                                <div class="airport">香港国际机场</div>
                            </div>
                        </div>
                        <div class="flight-tag">
                            <el-tooltip effect="light">
                                <template #default><span>租车新客￥788满减券</span></template>
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
                                <span style="font-size: 32px" >4060</span>
                            </div>
                            <div class="flight-action">
                                <button>订票</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flight-item">
                    <div class="flight-box">
                        <div class="flight-airline">
                            <div class="airline-logo">
                                <img src="../assets/img/airlines/3U.png" alt="" width="48px" height="48px">
                            </div>
                            <ul>
                                <li class="airline-name"><span>海南航空</span></li>
                                <li class="plane"><span>HU7723 波音737(中)</span></li>
                            </ul>

                        </div>
                        <div class="flight-detail">
                            <div class="depart-box">
                                <div class="time">23:10</div>
                                <div class="airport">宝安国际机场</div>
                            </div>
                            <div class="arrow-box">
                                <img src="../assets/img/component/to.png" alt="" width="120px" >
                            </div>
                            <div class="arrive-box">
                                <div class="time">01:25</div>
                                <div class="airport">浦东国际机场</div>
                            </div>
                        </div>
                        <div class="flight-tag">
                            <el-tooltip effect="light">
                                <template #default><span>租车新客￥788满减券</span></template>
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
                                <span style="font-size: 32px" >830</span>
                            </div>
                            <div class="flight-action">
                                <button>订票</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flight-item">
                    <div class="flight-box">
                        <div class="flight-airline">
                            <div class="airline-logo">
                                <img src="../assets/img/airlines/3U.png" alt="" width="48px" height="48px">
                            </div>
                            <ul>
                                <li class="airline-name"><span>海南航空</span></li>
                                <li class="plane"><span>HU7723 波音737(中)</span></li>
                            </ul>

                        </div>
                        <div class="flight-detail">
                            <div class="depart-box">
                                <div class="time">23:10</div>
                                <div class="airport">宝安国际机场</div>
                            </div>
                            <div class="arrow-box">
                                <img src="../assets/img/component/to.png" alt="" width="120px" >
                            </div>
                            <div class="arrive-box">
                                <div class="time">01:25</div>
                                <div class="airport">浦东国际机场</div>
                            </div>
                        </div>
                        <div class="flight-tag">
                            <el-tooltip effect="light">
                                <template #default><span>租车新客￥788满减券</span></template>
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
                                <span style="font-size: 32px" >830</span>
                            </div>
                            <div class="flight-action">
                                <button>订票</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from "vue";
import {useRoute} from "vue-router";
import {getFormattedDate} from "@/utils/dateFormat.js";
const route=useRoute();
const flight=route.query;//飞机航线
const sortbarItems=[{label:"低价优先",id:"1"},{label: "起飞时间早-晚",id:"2"}];//排序项
const currentIndex=ref(undefined);//当前选择排序项的索引
function toggleClass(index)
{
    currentIndex.value=index;
}

</script>



<style scoped>
.ticketCardPos{
  display: flex;
  justify-content: center;
  align-items: center;
}

.filterCard{
    background-color: #ffffff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    height: 60px;
    width: 1000px;
    display: flex;
    align-items: center;
    padding-left: 24px;
}
.filterCard .el-button
{
    outline: none;
}
.mr-16
{
    margin-right: 16px;
}
.sortbar
{
    display: flex;
    margin-left: 320px;
    div
    {
        padding: 7px 8px;
        cursor: pointer;
        margin: 0 4px;
        font-size: 14px;
    }
    div:hover
    {
        background-color: #f2f9fe;
        border-radius: 6px;
    }
    /*active样式*/
    .active
    {
        color: #398efe;
    }
}

.container
{
    width: 1024px;
    margin-top: 8px;
    margin-left: 244px;
}
.container .flight-list
{
    line-height: 1;
}
.container .flight-list .flight-item
{
    margin-top: 2px;
    margin-bottom: 2px;
    transition: box-shadow 0.3s;
}
.container .flight-list .flight-item:hover
{
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2), 0 12px 25px rgba(0, 0, 0, 0.15);
}
.container .flight-list .flight-item .flight-box
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

