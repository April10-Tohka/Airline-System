<script setup>
import {onMounted, ref} from "vue";
import Schema from 'async-validator';
import {getFlightDetail} from "@/api/flight.js"
import {emitter} from "@/utils/mitt.js";
// 表单数据
const flightForm=ref({
    flightNo:"",//航班号
    airdate:""//出发日期
});
const verifyResult=ref(true);//校验航班号结果
//飞机航班号校验规则
const descriptor={
    flightNo:{
        type:"string",
        required:true,
        asyncValidator:(rule,value)=>{
            return new Promise((resolve, reject)=>{
                const regex = /^[A-Za-z0-9]{1,2}\d{3,5}$/i;//校验航班号的正则表达式（不区分大小写)
                console.log("校验规则内收到的value:",value);
                if(regex.test(value))
                {
                    resolve();
                }
                else
                {
                    reject("校验失败")
                }
            })
        }
    }
}
//查询航班动态
function QueryFlight()
{
    const validator = new Schema(descriptor);
    validator.validate(flightForm.value).then(value=>{
        console.log("校验成功就会收到的value:",value);
        getFlightDetail(flightForm.value.flightNo).then(res=>{
            let data=res.data.data;//返回的数据
            console.log(data);
            if(data)
            {
                console.log("不为空，说明查询成功");
                emitter.emit('flightQuery',{
                    result:true,
                    flightDetail:data
                })
            }
            else
            {
                console.log("为空，说明查询失败") ;
                emitter.emit('flightQuery',{
                    result:false
                });
            }
        })
        verifyResult.value= true;
        value.flightNo=value.flightNo.toUpperCase();
        HistoryItems.value.add(value.flightNo);
    }).catch(({errors,fields})=>{
        console.log("校验失败errors,fields:",errors,fields);
        verifyResult.value=false;
    })
}
onMounted(()=>{
    getNowTime(flightForm);
})
//获取当天的时间
function getNowTime(flightForm)
{
    let now=new Date();
    let year=now.getFullYear();
    let month=now.getMonth();
    let date=now.getDate();
    month = month + 1
    month = month.toString().padStart(2, '0')
    date = date.toString().padStart(2, '0')
    flightForm.value.airdate=`${year}-${month}-${date}`;
}

// 只允许选择今天、未来三天和过去三天的日期
const disabledDate = (time) => {
    const today = new Date();
    const diff = Math.abs((today - time) / (1000 * 3600 * 24)); // 计算日期差值
    return diff > 3  || diff === 0;
}

const HistoryItems=ref(new Set());//查询航班号历史记录
// 点击历史记录项显示在输入框中
function clickHistoryItem(flightNo)
{
    console.log("flightNo:",flightNo);
    flightForm.value.flightNo=flightNo;
}
//清空历史记录
function clearHistoryItems()
{
    HistoryItems.value=new Set();
}
</script>

<template>
    <div class="search-box">
        <div class="search-container">
            <div class="search-info-container">
                <div :class="{'search-selectors-info':true,'search-selectors-info-wrong':!verifyResult}">
                    <div class="search-selectors-fno">
                        <input placeholder="请填写航班号，如MU1234" v-model="flightForm.flightNo">
                    </div>
                    <div class="wrong-hint" v-if="!verifyResult">请输入正确航班号</div>
                </div>
                <div class="search-date-picker">
<!--                    TODO：需要修改date-picker的样式-->
                    <el-date-picker
                        v-model="flightForm.airdate"
                        type="date"
                        placeholder="出发日期"
                        value-format="YYYY-MM-DD"
                        format="YYYY/MM/DD"
                        :default-value="new Date()"
                        :disabled-date="disabledDate"
                    />
                </div>
            </div>

            <div class="search-history">
                <div class="search-history-container">
                    <div class="search-history-item"
                         v-for="(item,index) in HistoryItems" :key="index" @click="clickHistoryItem(item)">
                        {{item}}
                    </div>
                </div>
                <div class="clear-history" v-if="HistoryItems.size" @click="clearHistoryItems">
                    清除历史记录
                </div>
            </div>
            <div class="search-button" @click="QueryFlight">
                <div class="magnify-glass">
                    <svg t="1711011277441" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6509" width="32" height="32"><path d="M469.333333 106.666667c200.298667 0 362.666667 162.368 362.666667 362.666666 0 86.08-29.994667 165.162667-80.085333 227.349334a20.949333 20.949333 0 0 1 10.901333 5.802666l135.765333 135.765334a21.333333 21.333333 0 0 1 0 30.165333l-30.165333 30.165333a21.333333 21.333333 0 0 1-30.165333 0l-135.765334-135.765333a21.226667 21.226667 0 0 1-5.845333-10.901333A360.96 360.96 0 0 1 469.333333 832c-200.298667 0-362.666667-162.368-362.666666-362.666667S269.034667 106.666667 469.333333 106.666667z m0 85.333333C316.16 192 192 316.16 192 469.333333s124.16 277.333333 277.333333 277.333334 277.333333-124.16 277.333334-277.333334S622.506667 192 469.333333 192z" fill="#ffffff" p-id="6510"></path></svg>
                </div>
                <div class="search-button-text">搜索</div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.search-box
{
    background-color: #ffffff;
    padding: 24px 24px 44px;
    line-height: 18px;
    font-size: 14px;
    box-shadow: 0 4px 16px 1px rgba(0,0,0,0.06);
    border-radius: 0 0 6px 6px;
    position: relative;
    .search-container
    {
        display: flex;
        flex-direction: column;
        .search-info-container
        {
            display: flex;
            flex-direction: row;

        }
    }
    .search-selectors-info
    {
        width: 600px;
        border: 1px solid #eeeeee;
        box-shadow: 0 0 12px 0 rgba(0,0,0,0.06);
        margin-right: 16px;
        border-radius: 6px;
        .search-selectors-fno
        {
            padding: 22px 0 22px 16px;
            input
            {
                width: 100%;
                font-size: 16px;
                line-height: 20px;
                height: 20px;
                border: none;
                outline: none;
            }
        }
        .wrong-hint
        {
            font-size: 12px;
            color: #f5190a;
            line-height: 16px;
            border-radius: 7px;
            height: 30px;
            border: 1px solid rgba(245,25,10,0.6);
            padding: 5px 8px 9px;
            background-color: #fef3f3;
            margin-bottom: 4px;
            position: absolute;
            top: -15px;
            text-align: center;
            min-width: 112px;
            box-sizing: border-box;
        }
        .wrong-hint:before,.wrong-hint:after
        {
            content: "";
            width: 0;
            height: 0;
            position: absolute;
            left: 10px;
        }
        .wrong-hint:before
        {
            bottom: -12px;
            border: 6px solid transparent;
            border-top-color: rgba(245,25,10,0.6);
        }
        .wrong-hint:after
        {
            bottom: -11px;
            border: 6px solid transparent;
            border-top-color: #fef3f3;
        }
    }
    .search-selectors-info-wrong
    {
        border-top: 2px solid #f5190a;
    }
    .search-date-picker
    {
        border: 1px solid #eeeeee;
        box-shadow: 0 0 12px 0 rgba(0,0,0,0.06);
        border-radius: 6px;
        padding: 12px 16px 14px;
        width: 300px;
    }
    .search-history
    {
        margin-top: 9px;
        height: 32px;
        white-space: nowrap;
        display: flex;
        flex-direction: row;
        .search-history-container
        {
            display: flex;
            flex-direction: row;
            .search-history-item
            {
                padding: 7px 8px;
                cursor: pointer;
            }
            .search-history-item:hover
            {
                color: #0086f6;
                background-color: rgba(0,134,246,0.05);
                border-radius: 4px;
            }
        }
        .clear-history
        {
            padding: 7px 8px;
            color: #0086f6;
            cursor: pointer;
        }
    }
    .search-button
    {
        position: absolute;
        bottom: -28px;
        right: 402px;
        background-image: linear-gradient(270deg,#f70,#ffa50a);
        box-shadow: 0 4px 16px 0 rgba(255,102,0,0.32);
        width: 176px;
        height: 56px;
        border-radius: 28px;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .magnify-glass
        {
            margin-right: 7px;
        }
        .search-button-text
        {
            font-size: 18px;
            line-height: 22px;
            color: #ffffff;
        }
    }
}

</style>
