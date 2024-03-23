<script setup>
import {onMounted, ref} from "vue";
import Schema from 'async-validator';
// 表单数据
const flightForm=ref({
    flightNo:"",//航班号
    airdate:""//出发日期
});
const descriptor={
    flightNo:{
        type:"string",
        required:true,
        asyncValidator:(rule,value)=>{
            const regex = /^[A-Z]{2,3}\d{3,4}$/i;
            console.log("value,",value);
            console.log("校验：",regex.test(value));
        /*
        * TODO:根据校验效果
        *       true：
        *       false：返回并提示 请输入正确航班号
        * */
        }
    }
}

const form=ref(null);//表单组件
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
function test(event)
{
    event.preventDefault();
    const validator = new Schema(descriptor);
    validator.validate(flightForm.value).then((isOK)=>{
        console.log("isok",isOK);
    }).catch(error=>{
        console.log("error",error);
    })
}
</script>

<template>
    <div class="search-box">
<!--        <div class="flightForm">-->
<!--            <el-form inline :model="flightForm"  ref="form">-->
<!--                <el-form-item prop="flightNO">-->
<!--                    <el-input style="width: 500px" placeholder="请填写航班号，如MU1234" v-model="flightForm.flightNo"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item>-->
<!--                    <el-date-picker-->
<!--                        v-model="flightForm.airdate"-->
<!--                        type="date"-->
<!--                        placeholder="出发日期"-->
<!--                        value-format="YYYY-MM-DD"-->
<!--                        format="YYYY/MM/DD"-->
<!--                        :default-value="new Date()"-->
<!--                        :disabled-date="disabledDate"-->
<!--                    />-->
<!--                </el-form-item>-->
<!--                <el-form-item>-->
<!--                    <button class="search" @click="test($event)">-->
<!--                        <span class="icon">-->
<!--                            <svg t="1711011277441" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6509" width="32" height="32"><path d="M469.333333 106.666667c200.298667 0 362.666667 162.368 362.666667 362.666666 0 86.08-29.994667 165.162667-80.085333 227.349334a20.949333 20.949333 0 0 1 10.901333 5.802666l135.765333 135.765334a21.333333 21.333333 0 0 1 0 30.165333l-30.165333 30.165333a21.333333 21.333333 0 0 1-30.165333 0l-135.765334-135.765333a21.226667 21.226667 0 0 1-5.845333-10.901333A360.96 360.96 0 0 1 469.333333 832c-200.298667 0-362.666667-162.368-362.666666-362.666667S269.034667 106.666667 469.333333 106.666667z m0 85.333333C316.16 192 192 316.16 192 469.333333s124.16 277.333333 277.333333 277.333334 277.333333-124.16 277.333334-277.333334S622.506667 192 469.333333 192z" fill="#ffffff" p-id="6510"></path></svg>-->
<!--                        </span>-->
<!--                        <span style="position: relative;top: -9px">搜索</span>-->
<!--                    </button>-->
<!--                </el-form-item>-->
<!--            </el-form>-->
<!--        </div>-->
        <div class="search-container">
            <div class="search-info-container">
                <div class="search-selectors-info">
                    <div class="search-selectors-fno">
                        <input placeholder="请填写航班号，如MU1234" v-model="flightForm.flightNo">
                    </div>
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
                <!--                expand:放置搜索历史-->
                <div class="search-history-container"></div>
                <div class="clear-history"></div>
            </div>
<!--            TODO:查询航班动态动作-->
            <div class="search-button">
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
        /*
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

         */
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
