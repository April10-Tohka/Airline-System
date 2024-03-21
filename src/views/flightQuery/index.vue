<script setup>
import {ref} from "vue";
// 表单数据
const flightForm=ref({
    flightNo:"",//航班号
    airdate:""//出发日期
});
//表单校验规则
const rules={
    // TODO:完善校验航班号规则
    flightNO: [{required:true,message:"请输入6位航班号",trigger:"blur"}]
}
const disabledDate = (time) => {
    // TODO:可点的日期为当天的 前一周-->下一周
    return time.getTime() > Date.now()
}
</script>

<template>
<div style="overflow-x: hidden" >
    <div class="bgimg">
        <img src="https://pic.c-ctrip.com/AssetCatalog/schedule-online/new-banner.png" alt="" style="object-fit: fill" width="1800px" height="300px">
    </div>
    <div class="container">
        <div class="search-box">
            <div class="flightForm">
                <el-form inline :model="flightForm" :rules="rules">
                    <el-form-item >
                        <el-input style="width: 500px" placeholder="请填写航班号，如MU1234" v-model="flightForm.flightNo"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker
                            v-model="flightForm.airdate"
                            type="date"
                            placeholder="出发日期"
                            value-format="YYYY-MM-DD"
                            format="YYYY/MM/DD"
                            :default-value="new Date()"
                            :disabled-date="disabledDate"
                        />
                    </el-form-item>
                    <el-form-item>
                        <button class="search">
                        <span class="icon">
                            <svg t="1711011277441" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6509" width="32" height="32"><path d="M469.333333 106.666667c200.298667 0 362.666667 162.368 362.666667 362.666666 0 86.08-29.994667 165.162667-80.085333 227.349334a20.949333 20.949333 0 0 1 10.901333 5.802666l135.765333 135.765334a21.333333 21.333333 0 0 1 0 30.165333l-30.165333 30.165333a21.333333 21.333333 0 0 1-30.165333 0l-135.765334-135.765333a21.226667 21.226667 0 0 1-5.845333-10.901333A360.96 360.96 0 0 1 469.333333 832c-200.298667 0-362.666667-162.368-362.666666-362.666667S269.034667 106.666667 469.333333 106.666667z m0 85.333333C316.16 192 192 316.16 192 469.333333s124.16 277.333333 277.333333 277.333334 277.333333-124.16 277.333334-277.333334S622.506667 192 469.333333 192z" fill="#ffffff" p-id="6510"></path></svg>
                        </span>
                            <span style="position: relative;top: -9px">搜索</span>
                        </button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="search-history">
<!--                TODO:放置搜索历史-->
            </div>
        </div>
        <div>
            显示搜索航班情况
        </div>
    </div>


</div>
</template>

<style scoped>

.container
{
    padding-left: 300px;

    width: 1000px;
    padding-right: 300px;
    .search-box
    {
        background-color: #ffffff;
        padding: 15px 30px;
        height: 100px;
    }
}
button.search
{
    font-size: 18px;
    line-height: 22px;
    color: #ffffff;
    width: 124px;
    border-radius: 6px;
    height: 64px;
    background-image: linear-gradient(270deg, #f70, #ffa50a);
    box-shadow: 0 4px 16px 0 rgba(255,102,0,.32);
    outline: none;
    border: none;
}



</style>
