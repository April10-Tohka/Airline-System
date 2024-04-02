<script setup>
const props=defineProps(['flightDetail']);
console.log("查看props",props.flightDetail);
</script>

<template>
    <div class="flight-detail-container" >
        <div class="flight-detail-header">
            <div class="airline-info">
                <div class="logo"><img src="../../../../assets/img/airlines/3U.png" alt="" ></div>
                <div class="flightNo">
                    <span>{{props.flightDetail.airlineCompanyName}}</span>
                    <span>{{props.flightDetail.flightNo}}</span>
                </div>
            </div>
            <div class="flight-status">航班计划</div>
            <div class="flight-detail-header-data-source">航班数据动态数据来源于飞友，请以实际为准</div>
        </div>
        <div class="flight-detail-body">
            <div class="wrapper">
                <div class="city">
                    <div>{{props.flightDetail.departCity}}</div>
                    <div>{{props.flightDetail.arriveCity}}</div>
                </div>
                <div class="time">
                    <div class="depart-time">{{props.flightDetail.departTime}}</div>
                    <div class="middle-line">
                        <img src="../../../../assets/img/component/fly.png" alt="">
                    </div>
                    <div class="arrive-time">{{ props.flightDetail.arriveTime }}</div>
                </div>
                <div class="small-tips-wrapper">
                    <el-tooltip :show-arrow="false" effect="light">
                        <div>
                            请以计划时间为准，预计时间仅供参考
                            <svg t="1711165325576" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4260" width="16" height="16"><path d="M500.9408 676.984832c-12.944384 0-23.760896 4.353024-32.457728 13.046784-8.69888 8.706048-13.049856 19.521536-13.049856 32.462848 0 12.940288 4.350976 23.754752 13.049856 32.457728C477.180928 763.650048 487.99744 768 500.9408 768c12.93312 0 23.759872-4.349952 32.45568-13.047808 8.69376-8.702976 13.04576-19.51744 13.04576-32.457728 0-12.941312-4.352-23.7568-13.04576-32.462848-8.695808-8.69376-19.52256-13.046784-32.45568-13.046784zM612.368384 286.83776c-11.830272-10.707968-25.99936-18.625536-42.493952-23.758848-16.52224-5.122048-34.366464-7.465984-53.541888-7.027712-19.641344 0.451584-38.042624 3.462144-55.209984 9.035776-17.181696 5.583872-32.12288 13.049856-44.838912 22.418432-12.716032 9.3696-22.754304 20.640768-30.11584 33.794048-7.361536 13.166592-11.039744 27.553792-11.039744 43.164672 0 11.157504 2.894848 19.638272 8.699904 25.428992 5.79072 5.80608 15.39072 8.930304 28.772352 9.368576 10.707968 0 21.185536-2.8928 31.453184-8.69888 10.257408-5.789696 15.392768-14.4896 15.392768-26.097664 0-11.595776 5.571584-20.074496 16.731136-25.428992 11.149312-5.353472 23.860224-8.251392 38.13888-8.69888 14.27968-0.44032 26.543104 2.569216 36.816896 9.032704 10.246144 6.472704 15.384576 18.852864 15.384576 37.138432 0 7.595008-0.66048 14.391296-2.000896 20.414464-1.338368 6.023168-3.580928 12.045312-6.692864 18.06848-3.137536 6.020096-7.474176 12.379136-13.060096 19.070976-5.583872 6.692864-12.370944 14.0544-20.4032 22.085632-10.708992 10.266624-20.077568 21.307392-28.109824 33.124352-8.030208 11.828224-14.722048 23.656448-20.077568 35.46112-5.353472 11.828224-9.48224 22.982656-12.38016 33.462272-2.90816 10.49088-4.352 19.305472-4.352 26.432512 0 13.84448 4.016128 23.762944 12.046336 29.784064 8.031232 6.020096 17.842176 9.03168 29.447168 9.03168 11.594752 0 21.408768-3.232768 29.438976-9.69728 8.032256-6.46144 12.04736-16.167936 12.04736-29.118464 0-8.466432 0.555008-16.280576 1.677312-23.416832 1.110016-7.12704 3.67616-14.385152 7.691264-21.75488 4.016128-7.353344 9.808896-15.601664 17.399808-24.754176 7.586816-9.143296 17.833984-19.964928 30.785536-32.458752 19.172352-18.292736 32.003072-35.3536 38.4768-51.196928 6.465536-15.828992 9.925632-32.673792 10.371072-50.526208 0.44544-20.511744-2.566144-38.581248-9.030656-54.202368-6.468608-15.609856-15.616-28.773376-27.423744-39.48032z" p-id="4261" fill="#0086f6"></path><path d="M511.996928 64C264.559616 64 64 264.587264 64 512.003072 64 759.43424 264.559616 960 511.996928 960c247.414784 0 448.003072-200.56576 448.003072-447.996928C960 264.587264 759.412736 64 511.996928 64z m0 851.216384c-222.67392 0-403.202048-180.523008-403.202048-403.213312 0-222.67392 180.528128-403.190784 403.202048-403.190784s403.196928 180.516864 403.196928 403.190784c0 222.690304-180.521984 403.213312-403.196928 403.213312z" p-id="4262" fill="#0086f6"></path></svg>
                        </div>
                        <template #content>
                            <!--                                TODO:文字排版-->
                            <ul style="padding: 10px;width: 200px;height: 200px;overflow: scroll">
                                <li style="list-style: circle">什么是预计时间？</li>
                                <p>预计时间由第三方供应商提供，根据多方数据推测的航班预计起飞及到达时间，方便乘客参考并合理安排行程。</p>
                                <li>什么是计划时间？</li>
                                <p>计划时间是系统内展示的航班实际执飞时间，是乘客管理和安排自己行程的重要依据。</p>
                                <li>什么是实际时间？</li>
                                <p>实际时间由第三方供应商提供，航班实际起飞及到达的时间。</p>
                                <li>预计时间和计划时间为什么会不一致？两个时间不一致的时候怎么办？</li>
                                <p>预计时间是第三方供应商根据多方数据推测而来，而计划时间根据航司发布的航班执飞时间展示。</p>
                                <li>什么是航班状态？</li>
                                <p>航班的状态是第三方供应商根据多方数据推测而来，描述对象是该航班。</p>
                            </ul>
                        </template>
                    </el-tooltip>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.flight-detail-container
{
    width: 100%;
    background-color: #ffffff;
    border-radius: 8px;
    font-size: 14px;
    line-height: 18px;
    cursor: pointer;
    margin-top: 74px;
    margin-bottom: 30px;
    .flight-detail-header
    {
        background: linear-gradient(-90deg, #f2fbf8, #fff);
        padding: 32px 40px 31px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        position: relative;
        .airline-info
        {
            display: flex;
            flex-direction: row;
            width: 800px;
            align-items: center;
            .logo
            {
                margin-right: 8px;
            }
            .flightNo
            {
                color: #333333;
                font-size: 22px;
                line-height: 23px;
                font-weight: 500;
            }
            .flightNo>span
            {
                margin-right: 8px;
            }
        }
        .flight-status
        {
            color: #00b87a;
            font-weight: 500;
            font-size: 24px;
            line-height: 30px;
            align-items: center;
        }
        .flight-detail-header-data-source
        {
            color: #999999;
            margin-top: 17px;
        }
    }
    .flight-detail-header:after
    {
        content: "";
        border-bottom: 2px solid #eef1f6;
        width: 1112px;
        position: absolute;
        bottom: 0;
    }
    .flight-detail-body
    {
        padding: 24px 40px;
        color: #333333;
        .wrapper
        {
            padding: 37px 100px 37px 90px;
            .city,.time
            {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
            .city
            {
                font-weight: 500;
                font-size: 16px;
                line-height: 22px;
                margin-bottom: 8px;
            }
            .time
            {
                font-weight: 500;
                font-size: 40px;
                line-height: 48px;
                margin-bottom: 8px;
                letter-spacing: 0.76px;
            }
            .small-tips-wrapper
            {
                color: #0086f6;
                font-size: 14px;
                line-height: 18px;
                width: fit-content;
                .icon
                {
                    position: relative;
                    top: 3px;
                }
            }
        }
    }
}
</style>
