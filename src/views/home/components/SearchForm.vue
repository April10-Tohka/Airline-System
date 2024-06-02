<script setup>
import {reactive} from "vue";
import dayjs from "dayjs";
import {useRouter} from "vue-router";
const router=useRouter();
/**
 * 交换出发地和目的地
 */
function swapFromTo()
{
    console.log("点击了交换目的地");
    let [switchIcon]=document.getElementsByClassName("switch-icon");
    switchIcon.classList.toggle("switch-icon-rotate");
}

const flight=reactive({
    depart:"珠海",
    arrival:"上海",
    departDate:dayjs(new Date()).format("YYYY-MM-DD")
})

function searchFlight()
{
    console.log("搜索航班");
    console.log(flight);
    router.push({path:"/ticket",query:flight});
}
</script>

<template>
    <div class="tab-content">
        <form class="searchForm">
            <div class="search-form">
                <div class="form-line">
                    <div class="form-item-group-wrap">
                        <div class="form-item-group">
                            <div class="form-item flt-depart">
                                <label>出发地</label>
                                <div class="outside">
                                    <div class="city-picker-selector"></div>
                                </div>
                            </div>
                            <div class="switch-btn">
                                <div class="switch-icon-wrap" @click="swapFromTo">
                                    <svg t="1717232869386" class="switch-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4313" width="16" height="16"><path d="M609.834667 97.834667a42.666667 42.666667 0 0 1 60.330666 0l170.666667 170.666666a42.666667 42.666667 0 0 1 0 60.330667l-170.666667 170.666667a42.666667 42.666667 0 0 1-60.330666-60.330667L707.669333 341.333333H213.333333a42.666667 42.666667 0 0 1 0-85.333333h494.336l-97.834666-97.834667a42.666667 42.666667 0 0 1 0-60.330666z m-195.669334 426.666666a42.666667 42.666667 0 0 1 0 60.330667L316.330667 682.666667H810.666667a42.666667 42.666667 0 1 1 0 85.333333H316.330667l97.834666 97.834667a42.666667 42.666667 0 0 1-60.330666 60.330666l-170.666667-170.666666a42.666667 42.666667 0 0 1 0-60.330667l170.666667-170.666667a42.666667 42.666667 0 0 1 60.330666 0z" fill="#707070" p-id="4314"></path></svg>
                                </div>
                            </div>
                            <div class="form-item flt-arrival">
                                <label>目的地</label>
                                <div class="outside"></div>
                            </div>
                        </div>
                    </div>
                    <div class="form-item-group-wrap">
                        <div class="form-item-group">
                            <div class="form-item date-picker">
                                <label>出发日期</label>
                                <el-date-picker
                                    v-model="flight.departDate"
                                    type="date"
                                    placeholder="Pick a day"
                                    format="YYYY-MM-DD"
                                    value-format="YYYY-MM-DD"
                                />
                            </div>
                        </div>
                    </div>
                    <button type="button" class="search-button" @click="searchFlight">
                        <svg t="1711011277441" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6509" width="32" height="32">
                            <path d="M469.333333 106.666667c200.298667 0 362.666667 162.368 362.666667 362.666666 0 86.08-29.994667 165.162667-80.085333 227.349334a20.949333 20.949333 0 0 1 10.901333 5.802666l135.765333 135.765334a21.333333 21.333333 0 0 1 0 30.165333l-30.165333 30.165333a21.333333 21.333333 0 0 1-30.165333 0l-135.765334-135.765333a21.226667 21.226667 0 0 1-5.845333-10.901333A360.96 360.96 0 0 1 469.333333 832c-200.298667 0-362.666667-162.368-362.666666-362.666667S269.034667 106.666667 469.333333 106.666667z m0 85.333333C316.16 192 192 316.16 192 469.333333s124.16 277.333333 277.333333 277.333334 277.333333-124.16 277.333334-277.333334S622.506667 192 469.333333 192z" fill="#ffffff" p-id="6510"></path>
                        </svg>
                        <span class="search-button-text">搜索</span>
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped >
.tab-content
{
    background-color: #ffffff;
    padding: 24px;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 4px 16px 1px rgba(0,0,0,0.06);
    z-index: 2;
    position: relative;
    margin-bottom: 60px;
}
.form-line
{
    margin-bottom: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    position: relative;
}
.form-item-group-wrap
{
    margin-right: 15px;
    height: 64px;
    .form-item-group
    {
        border: 1px solid #eeeeee;
        box-shadow: 0 0 12px 0 rgba(0,0,0,0.06);
        border-radius: 6px;
        height: 62px;
        display: flex;
        flex-direction: row;
        position: relative;
    }
}
.form-item-group-wrap:hover
{
    .form-item-group
    {
        box-shadow: 0 4px 24px -10px rgba(0, 0, 0, .44);
        transition: box-shadow .15s ease-in-out, -webkit-box-shadow .15s ease-in-out;
    }
}
.form-item
{
    height: 62px;
    position: relative;
    width: 237px;
    label
    {
        font-size: 12px;
        color: #999999;
        position: absolute;
        top: 10px;
        left: 16px;
    }
}
/*头上的蓝线*/
.form-item::before
{
    content: "";
    height: 1px;
    background-color: #ffffff;
    border-top: 2px solid #0086f6;
    position: absolute;
    top: -1px;
    left: 0;
    display: block;
}
.flt-depart
{
    border-right: 0;
}
.flt-arrival
{
    border-left: 0;
}
.switch-btn
{
    margin-top: 16px;
    position: relative;
    .switch-icon-wrap
    {
        width: 30px;
        height: 30px;
        background-color: #ffffff;
        border: 1px solid #dddddd;
        border-radius: 50%;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 5;
        .switch-icon
        {
            transition: transform 0.3s ease;
        }
        .switch-icon-rotate
        {
            transform: rotate(180deg);
        }
    }
    .switch-icon-wrap:hover
    {
        background-color: #f4f4f4;
        color: #666666;
        border: 1px solid #f4f4f4;
    }
}
.switch-btn::after
{
    content: "";
    width: 1px;
    height: 62px;
    background: url("https://pic.c-ctrip.com/fltcommon/index/ico/input-liner.png");
    position: absolute;
    left: 15px;
    top: -15px;
    z-index: 3;
}
/*搜索按钮样式*/
.search-button
{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: -68px;
    left: 50%;
    background-color: #f70;
    background-image: linear-gradient(-90deg,#f70,#ffa50a);
    border-radius: 28px;
    box-shadow: 0 4px 16px 0 rgba(255,102,0,0.32);
    width: 176px;
    height: 56px;
    margin-left: -88px;
    border: none;
    outline: none;
    font-size: 18px;
    color: #ffffff;
    z-index: 2;
    .search-button-text
    {
        margin-left: 4px;
    }
}
.search-button:hover::before
{
    content: "";
    width: 100%;
    height: 56px;
    display: block;
    position: absolute;
    top: 0;
    background: hsla(0,0%,100%,0.12);
}

.date-picker:deep(.el-input)
{
    position: absolute;
    top: 30px;
}
/*TODO:去除日期选择器的边框*/
.date-picker:deep(.el-input__wrapper)
{
    border: 0 solid transparent;
}
</style>
