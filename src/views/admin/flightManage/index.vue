<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref, watch} from "vue";
import {addFlight, getAllFlights, getCityPort, getFlightDetail, updateFlight} from "@/api/flight.js"
import {emitter} from "@/utils/mitt.js";
import {useFlightDataStore} from "@/stores/flightData.js"
import {storeToRefs} from "pinia";
import {ElMessage} from 'element-plus'

const route=useRoute();
console.log("flightManage route:",route);
//表格显示航班数据
const tableData=ref([])
//分页对象
let pagination={
    currentPage:1,
    total:undefined
}
function  changePage(page)
{
    console.log(page);
    pagination.currentPage=page;
    getAllFlightsToTable(pagination.currentPage);
}
//获取所有航班数据显示在表格中
function getAllFlightsToTable(page)
{
    getAllFlights(page).then(res=>{
        console.log("调用接口获取数据",res);
        tableData.value=res.data.data;
        //分页组件数据
        pagination=res.data.pagination;
        console.log("pagination:",pagination);
    })
}
const flightForm=ref(null);//录入航班信息表单实例
onMounted(()=>{
    getAllFlightsToTable(pagination.currentPage);
})
const isEdit=ref(false);//是否处于编辑状态
function  handleCommand(command,row)
{
    console.log(command,row);
    if(command === 'edit')
    {
        PopupTitle.value="修改航班信息";
        PopupVisible.value=true;
        isEdit.value=true;
        getFlightDetail(row.flightNo).then(res=>{
            console.log("getFlightDetail返回的data:",res.data.data);
            flightDetails.value=res.data.data;
        })
    }
}
const isCollapse=ref(false);//是否折叠
//处理折叠侧边栏
function collapseAside()
{
    console.log("调用了collapseAside");
    isCollapse.value=!isCollapse.value
    emitter.emit('collapseAside',isCollapse.value);
}
const clearSpan=ref(null);//清除搜索框内容DOM元素
const searchText=ref("");//搜索内容
const searchBoxWidth=ref("160px");//搜索框宽度
const isFocusInput=ref(false);//搜索框是否聚焦
//处理搜索框聚焦
function expandInput()
{
    console.log("focus input");
    searchBoxWidth.value="300px";
    isFocusInput.value=true;
    //搜索框聚焦时，根据内容是否为空来相应显示
    clearSpan.value.style.display=searchText.value?'block':'none';
}
//处理搜索框失去焦点
function shrinkInput()
{
    console.log("blur input");
    searchBoxWidth.value='160px';
    isFocusInput.value=false;
    //搜索框失去焦点时，隐藏清除搜索框内容DOM元素
    clearSpan.value.style.display='none';
}
//搜索航班号
function flightQuery()
{
    console.log("searchtext:",searchText.value);
    if(searchText.value===""){
        ElMessage({message:"请输入航班号",type:'warning'});
        return;
    }
    const regex = /^[A-Za-z0-9]{1,2}\d{3,5}$/i;//校验航班号的正则表达式（不区分大小写)
    if(!(regex.test(searchText.value)))
    {
        console.log("校验不通过");
        return;
    }
    searchText.value=searchText.value.toUpperCase();
    getFlightDetail(searchText.value)
        .then(res=>{
            console.log("查询成功",res.data.data);
            tableData.value=new Array(res.data.data);
        })
        .catch(error=>{
            console.log("查询失败",error);
        })
}
//清空搜索框内容
function  clearBtn()
{
    console.log("清除搜索框内容")
    searchText.value=undefined;
    //清空搜索框后，获取全部航班数据
    getAllFlightsToTable(1);
}
const PopupVisible=ref(false);//是否显示‘添加’弹窗
let PopupTitle=ref("");//弹窗标题
//点击'添加'按钮显示航班弹窗
function showPopup()
{
    PopupVisible.value=true;
    PopupTitle.value='录入航班信息';
}
//关闭弹窗
function  closePopup()
{
    PopupVisible.value=false;
    //重置表单
    flightDetails.value={
        flightNo:"",//航班号
        airlineCompanyName:"",//航空公司
        aircraftType:"",//机型
        departCity:"",//出发地
        departPortName:"",//出发机场
        departTime:"",//出发时间,
        arriveCity:"",//目的地
        arrivePortName:"",//到达机场
        arriveTime:"",//到达时间
        seatCount:undefined,//座位数量
        bookedCount:undefined,//订票数量
        remainingCount:undefined,//余票数量
        price:undefined,//售价
    };
    isEdit.value=false;
}
// 弹窗内确认按钮逻辑
function confirmBtn()
{
    //校验表单
    flightForm.value.validate((valid)=>{
        if(valid)
        {
            console.log("表单校验通过");
            //判断编辑状态还是添加状态
            if(isEdit.value)
            {
                console.log("编辑状态下点击确认，查看flightDetail",flightDetails);
                updateFlight(flightDetails.value)
                    .then(res=>{
                        console.log("调用updateFlight，",res);
                        ElMessage({message:res.data.message,type:'success'});
                        closePopup();
                        getAllFlightsToTable(pagination.currentPage);
                    })
                    .catch(error=>{
                        console.log("修改航班信息失败",error);
                        ElMessage({message:"修改航班信息失败",type:'warning'});
                    })
            }
            else
            {
                console.log("不是编辑状态，为添加状态.调用addFlight");
                addFlight(flightDetails)
                    .then(res=>{
                        console.log("录入航班成功",res);
                        //提示录入航班信息成功
                        ElMessage({message:res.data.message,type:'success'})
                        closePopup();//关闭弹窗
                        getAllFlightsToTable(pagination.currentPage);//获取表格航班数据
                    })
                    .catch(error=>{
                        console.log("录入失败,",error);
                        ElMessage({message:'重复录入，该航班信息已经存在',type:'warning'})
                    })
            }
        }
    })
}
const FlightDataStore=useFlightDataStore();//使用FlightDataStore
let {cityList,aircraftTypeList,airlineCompanyNameList}=storeToRefs(FlightDataStore);//解构数据

//录入航班信息表单
const flightDetails=ref({
    flightNo:"",//航班号
    airlineCompanyName:"",//航空公司
    aircraftType:"",//机型
    departCity:"",//出发地
    departPortName:"",//出发机场
    departTime:"",//出发时间,
    arriveCity:"",//目的地
    arrivePortName:"",//到达机场
    arriveTime:"",//到达时间
    seatCount:undefined,//座位数量
    bookedCount:undefined,//订票数量
    remainingCount:undefined,//余票数量
    price:undefined,//售价
})
//飞机航班号校验规则
const rules={
    flightNo:[{required:true,message:"请输入正确的航班号",pattern:/^[A-Za-z0-9]{1,2}\d{3,5}$/i,trigger:"blur"}],
    airlineCompanyName:[{required:true,message:"请选择航空公司",trigger:"change"}],
    aircraftType:[{required:true,message:"请选择飞机机型",trigger:"change"}],
    departCity: [{required:true,message:"请选择起飞城市",trigger:"change"}],
    departPortName: [{required:true,message:"请选择起飞机场",trigger:"change"}],
    departTime: [{required:true,message:"请选择起飞时间",trigger:"change"}],
    arriveCity:[{required:true,message:"请选择目的地",trigger:"change"}],
    arrivePortName:[{required:true,message:"请选择到达机场",trigger:"change"}],
    arriveTime: [{required:true,message:"请选择到达时间",trigger:"change"}],
    seatCount: [{required:true,message:"请输入座位数量",trigger:"blur"}],
    bookedCount: [{required:true,message:"请输入订票数量",trigger:"blur"}],
    remainingCount: [{required:true,message:"请输入余票数量",trigger:"blur"}],
    price:[{required:true,message:"请输入售价",trigger:"blur"}]
}
const departPort=ref([]);//出发机场
const arrivePort=ref([]);//到达机场
watch(()=>flightDetails.value.departCity,(city)=>{
    console.log("正在侦听departCity",city);
    getCityPort(city).then(res=>{
        console.log(`该城市${city}所拥有的机场`,res);
        departPort.value=res.data.data;
    })
})
watch(()=>flightDetails.value.arriveCity,(city)=>{
    console.log("正在侦听arriveCity",city);
    getCityPort(city).then(res=>{
        console.log(`该城市${city}所拥有的机场`,res);
        arrivePort.value=res.data.data;
    })
})
</script>

<template>
<!--    TODO:优化增删改查操作代码-->
    <div>
<!--        BUG: 折叠侧边栏后，出现滚动条-x，然后再展开侧边栏添加按钮没有显示在视口-->
        <div class="collapse-container" @click="collapseAside">
            <div class="icon" v-if="isCollapse">
                <svg t="1711457205580" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11821" width="24" height="24"><path d="M740.57 683.43c-7.68 0-15.35-2.93-21.21-8.79-11.72-11.72-11.72-30.7 0-42.42l141.43-141.43c11.72-11.72 30.7-11.72 42.42 0 11.72 11.71 11.72 30.71 0 42.42L761.79 674.64c-5.86 5.86-13.54 8.79-21.22 8.79z" p-id="11822" fill="#808080"></path><path d="M882 542c-7.68 0-15.35-2.93-21.21-8.79L719.36 391.79c-11.72-11.71-11.72-30.71 0-42.42 11.72-11.72 30.7-11.72 42.42 0L903.21 490.8c11.72 11.71 11.72 30.71 0 42.42A29.924 29.924 0 0 1 882 542zM682 542H142c-16.57 0-30-13.43-30-30s13.43-30 30-30h540c16.56 0 30 13.43 30 30s-13.44 30-30 30z" p-id="11823" fill="#808080"></path><path d="M912 182H112c-16.57 0-30-13.43-30-30s13.43-30 30-30h800c16.56 0 30 13.43 30 30s-13.44 30-30 30z" p-id="11824" fill="#808080"></path><path d="M912 902H112c-16.57 0-30-13.44-30-30s13.43-30 30-30h800c16.56 0 30 13.44 30 30s-13.44 30-30 30z" p-id="11825" fill="#808080"></path></svg>
            </div>
            <div class="icon" v-else>
                <svg t="1711456974150" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11496" width="24" height="24"><path d="M283.43 683.43c-7.68 0-15.35-2.93-21.21-8.79L120.79 533.21c-11.72-11.71-11.72-30.71 0-42.42 11.72-11.72 30.7-11.72 42.42 0l141.43 141.43c11.72 11.72 11.72 30.7 0 42.42a29.91 29.91 0 0 1-21.21 8.79z" p-id="11497" fill="#808080"></path><path d="M142 542c-7.68 0-15.35-2.93-21.21-8.79-11.72-11.71-11.72-30.71 0-42.42l141.43-141.43c11.72-11.72 30.7-11.72 42.42 0 11.72 11.71 11.72 30.71 0 42.42L163.21 533.21A29.893 29.893 0 0 1 142 542zM882 542H342c-16.57 0-30-13.43-30-30s13.43-30 30-30h540c16.56 0 30 13.43 30 30s-13.44 30-30 30z" p-id="11498" fill="#808080"></path><path d="M912 182H112c-16.57 0-30-13.43-30-30s13.43-30 30-30h800c16.56 0 30 13.43 30 30s-13.44 30-30 30z" p-id="11499" fill="#808080"></path><path d="M912 902H112c-16.57 0-30-13.44-30-30s13.43-30 30-30h800c16.56 0 30 13.44 30 30s-13.44 30-30 30z" p-id="11500" fill="#808080"></path></svg>
            </div>

        </div>
        <div class="header">{{route.meta.title}}</div>
        <div class="controls-container">
            <div :style="{width:searchBoxWidth}" :class="{'search-box':true,'focus-input':isFocusInput}">
                <input type="text" role="searchbox" placeholder="请输入航班号" v-model="searchText" @focus="expandInput" @blur="shrinkInput">
                <span class="clear-span" ref="clearSpan" v-show="searchText?true:false" @mousedown="clearBtn" >&#10006;</span>
                <div class="search-icon" @mousedown="flightQuery">
                    <svg t="1711509313783" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4322" width="24" height="24"><path d="M512 858.3168c-194.816 0-352-166.2464-352-370.4832S317.184 117.3504 512 117.3504s352 166.2464 352 370.4832-157.184 370.4832-352 370.4832z m0-64c158.6688 0 288-136.8576 288-306.4832 0-169.6768-129.3312-306.4832-288-306.4832S224 318.1568 224 487.8336c0 169.6256 129.3312 306.4832 288 306.4832zM717.312 799.9488a32 32 0 0 1 46.4896-43.9808l91.4432 96.7168a32 32 0 0 1-46.4896 43.9808l-91.4432-96.768z" fill="#ffffff" p-id="4323"></path></svg>
                </div>
            </div>
            <button class="add-button" @click="showPopup">
                <span class="add-icon"><svg t="1711510891444" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5466" width="21" height="21"><path d="M510.833431 62.695924c-247.644193 0-448.406636 200.762443-448.406636 448.406636 0 247.65545 200.762443 448.416869 448.406636 448.416869 247.65545 0 448.416869-200.76142 448.416869-448.416869C959.2503 263.458367 758.488881 62.695924 510.833431 62.695924zM779.544429 562.112328 560.358381 562.112328l0 219.186048-102.008278 0L458.350103 562.112328 239.164055 562.112328l0-102.008278 219.186048 0L458.350103 240.918002l102.008278 0 0 219.186048 219.186048 0L779.544429 562.112328z" fill="#ffffff" p-id="5467"></path></svg></span>
                <span >添加</span>
            </button>
        </div>
        <div class="body">
            <el-table :data="tableData">
                <el-table-column label="航班号" width="100px" align="center" prop="flightNo"></el-table-column>
                <el-table-column label="航空公司" width="110px" align="center" prop="airlineCompanyName"></el-table-column>
                <el-table-column label="机型" align="center" width="130px" prop="aircraftType"></el-table-column>
                <el-table-column label="出发地" align="center" width="90px" prop="departCity"></el-table-column>
                <el-table-column label="出发机场" align="center" width="110px" prop="departPortName"></el-table-column>
                <el-table-column label="目的地" align="center" width="90px" prop="arriveCity"></el-table-column>
                <el-table-column label="到达机场" align="center" width="110px" prop="arrivePortName"></el-table-column>
                <el-table-column label="出发时间" align="center" width="90px" prop="departTime"></el-table-column>
                <el-table-column label="到达时间" align="center" width="90px" prop="arriveTime"></el-table-column>
                <el-table-column label="座位数量" align="center" width="80px" prop="seatCount"></el-table-column>
                <el-table-column label="订票数量" align="center" width="80px" prop="bookedCount"></el-table-column>
                <el-table-column label="余票数量" align="center" width="80px" prop="remainingCount"></el-table-column>
                <el-table-column label="售价" align="center" width="80px" prop="price">
                    <template #default="{row}">￥{{row.price}}</template>
                </el-table-column>
                <el-table-column  align="center">
                    <template #default="{row}">
                        <el-dropdown trigger="click" @command="handleCommand($event,row)">
                        <span style="display: inline-block;position: relative;top: 1px;cursor: pointer">
                          操作<el-icon class="el-icon--right"><arrow-down /></el-icon>
                        </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item command="edit">
                                        <svg t="1711455954108" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4280" width="16" height="16"><path d="M824.064 253.866667a42.666667 42.666667 0 0 0-60.373333-60.330667l-290.389334 290.389333-18.133333 78.464 78.464-18.090666 290.432-290.432zM703.36 133.12a128 128 0 1 1 181.034667 181.034667L593.92 604.586667a85.333333 85.333333 0 0 1-41.130667 22.784l-78.464 18.133333A85.333333 85.333333 0 0 1 372.053333 543.146667l18.090667-78.421334a85.333333 85.333333 0 0 1 22.784-41.173333l290.432-290.432zM554.666667 170.666667a42.666667 42.666667 0 0 0-42.666667-42.666667H298.666667a170.666667 170.666667 0 0 0-170.666667 170.666667v341.333333a42.666667 42.666667 0 1 0 85.333333 0V298.666667a85.333333 85.333333 0 0 1 85.333334-85.333334h213.333333a42.666667 42.666667 0 0 0 42.666667-42.666666zM225.92 770.261333l0.128-0.085333c15.061333 24.32 41.941333 40.490667 72.618667 40.490667h426.666666a85.333333 85.333333 0 0 0 85.333334-85.333334v-213.333333a42.666667 42.666667 0 1 1 85.333333 0v213.333333a170.666667 170.666667 0 0 1-170.666667 170.666667H298.666667a170.581333 170.581333 0 0 1-149.034667-87.466667l-0.085333-0.128a42.666667 42.666667 0 0 1 76.373333-38.186666z" fill="#FFA500" p-id="4281"></path></svg>
                                        <span style="color: #FFA500">编辑</span>
                                    </el-dropdown-item>
                                    <el-dropdown-item command="delete">
                                        <svg t="1711456090007" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5983" width="16" height="16"><path d="M0 0h1024v1024H0z" fill="#bfbfbf" opacity=".01" p-id="5984"></path><path d="M343.074133 57.480533A34.133333 34.133333 0 0 1 375.466667 34.133333h273.066666a34.133333 34.133333 0 0 1 32.392534 23.3472L695.876267 102.4H887.466667a68.266667 68.266667 0 0 1 68.266666 68.266667v68.266666a68.266667 68.266667 0 0 1-68.266666 68.266667v512a170.666667 170.666667 0 0 1-170.666667 170.666667H307.2a170.666667 170.666667 0 0 1-170.666667-170.666667V307.2a68.266667 68.266667 0 0 1-68.266666-68.266667V170.666667a68.266667 68.266667 0 0 1 68.266666-68.266667h191.5904l14.9504-44.919467zM716.8 307.2H204.8v512a102.4 102.4 0 0 0 102.4 102.4h409.6a102.4 102.4 0 0 0 102.4-102.4V307.2h-102.4z m170.666667-68.266667V170.666667h-216.1664a34.133333 34.133333 0 0 1-32.392534-23.3472L623.9232 102.4h-223.8464l-14.984533 44.919467a34.133333 34.133333 0 0 1-32.392534 23.3472H136.533333v68.266666h750.933334z m-477.866667 204.8a34.133333 34.133333 0 1 0-68.266667 0v341.333334a34.133333 34.133333 0 1 0 68.266667 0V443.733333z m273.066667 0a34.133333 34.133333 0 1 0-68.266667 0v341.333334a34.133333 34.133333 0 1 0 68.266667 0V443.733333z" fill="#FF0000" p-id="5985"></path></svg>
                                        <span style="color:#FF0000">删除</span>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="footer">
            <el-pagination layout="prev, pager, next,total" :total="parseInt( pagination.total)" :current-page="parseInt(pagination.currentPage)"
            @current-change="changePage"/>
        </div>
    </div>
<!--    航班信息弹窗-->
    <el-dialog v-model="PopupVisible" :title="PopupTitle" @close="closePopup">
        <el-form :model="flightDetails" :rules="rules" ref="flightForm">
            <el-form-item prop="flightNo" label="航班号" >
                <el-input v-model="flightDetails.flightNo"></el-input>
            </el-form-item>
            <el-form-item prop="airlineCompanyName" label="航空公司">
                <el-select v-model="flightDetails.airlineCompanyName">
                    <el-option v-for="(item,index) in airlineCompanyNameList" :key="index" :value="item" :label="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="aircraftType" label="机型">
                <el-select v-model="flightDetails.aircraftType">
                    <el-option v-for="(item,index) in aircraftTypeList" :key="index" :value="item" :label="item"></el-option>
                </el-select>
            </el-form-item>
            <div class="depart">
                <el-form-item label="出发地"  class="flex-1" prop="departCity" >
                    <el-select v-model="flightDetails.departCity">
                        <el-option v-for="(item,index) in cityList" :key="index" :value="item" :label="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出发机场" class="flex-1" prop="departPortName">
                    <el-select v-model="flightDetails.departPortName">
                        <el-option v-for="(item,index) in departPort" :key="index" :value="item" :label="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出发时间" class="flex-1" prop="departTime">
                    <el-time-picker v-model="flightDetails.departTime" value-format="HH:mm" format="HH:mm"></el-time-picker>
                </el-form-item>
            </div>
            <div class="arrive">
                <el-form-item label="目的地" class="flex-1" prop="arriveCity">
                    <el-select v-model="flightDetails.arriveCity">
                        <el-option v-for="(item,index) in cityList" :key="index" :value="item" :label="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="到达机场" class="flex-1" prop="arrivePortName">
                    <el-select v-model="flightDetails.arrivePortName">
                        <el-option v-for="(item,index) in arrivePort" :key="index" :value="item" :label="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="到达时间" class="flex-1" prop="arriveTime">
                    <el-time-picker v-model="flightDetails.arriveTime" value-format="HH:mm" format="HH:mm"></el-time-picker >
                </el-form-item>
            </div>
            <div class="ticket-sale">
                <el-form-item label="座位数量" class="flex-1" prop="seatCount">
                    <el-input v-model="flightDetails.seatCount" style="width: 173px"></el-input>
                </el-form-item>
                <div v-if="isEdit">
                    <el-form-item label="订票数量" class="flex-1" prop="bookedCount">
                        <el-input v-model="flightDetails.bookedCount"></el-input>
                    </el-form-item>
                    <el-form-item label="余票数量" class="flex-1" prop="remainingCount">
                        <el-input v-model="flightDetails.remainingCount"></el-input>
                    </el-form-item>
                </div>
            </div>
            <el-form-item prop="price" label="售价">
                <el-input v-model="flightDetails.price" style="width: 100px;"></el-input>
            </el-form-item>
            <div class="form-action">
                <el-button type="primary" size="large" @click="confirmBtn">确定</el-button>
                <el-button size="large" @click="closePopup">取消</el-button>
            </div>
        </el-form>
    </el-dialog>
</template>

<style scoped>
.header
{
    font-size: 24px;
    font-weight: 600;
}
.body
{
    margin-top: 20px;
}
.collapse-container
{
    width: 40px;
    .icon
    {
        position: relative;
        top: -2px;
    }
}
.controls-container
{
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-right: 19px;
    .search-box
    {
        height: 32px;
        display: flex;
        flex-direction: row;
        border-radius: 8px;
        border: 1px solid #9acefb;
        align-items: center;
        justify-content: space-between;
        transition: width 0.3s ease;
        box-shadow: none;
        input[role='searchbox']
        {
            background: none;
            border: none;
            outline: none;
            text-indent: 15px;
            color: #666666;
            height: 18px;
            letter-spacing: 0;
            line-height: 18px;
            width: 100%;
        }
        .search-icon
        {
            background-color: #0086f6;
            border-radius: 0px 8px 8px 0px;
            width: 56px;
            height: 100%;
            padding: 3px 10px;
            box-sizing: border-box;
        }
        .clear-span
        {
            cursor: pointer;
            color: #888;
            margin-right: 10px;
            position: relative;
            top: -1px;
        }
    }
    .add-button
    {
        outline: none;
        border: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: #4CAF50; /* 醒目的绿色 */
        padding: 5px;
        color: #ffffff;
        border-radius: 5px; /* 圆角 */
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.1s ease; /* 平滑的过渡效果 */
        .add-icon
        {
            margin-right: 2px;
            position: relative;
            top: 2px;
        }
    }
    .add-button:hover
    {
        background-color: #45a049; /* 悬停效果 */
    }
    .add-button:active
    {
        transform: scale(0.95); /* 点击效果 */
    }
}
/*搜索框聚焦时样式*/
.focus-input
{
    border-color:#007bff  !important;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5) !important;
}
.depart,.arrive,.ticket-sale,.form-action
{
    display: flex;
    flex-direction: row;
}
.form-action
{
    justify-content: center;
}
.flex-1
{
    flex: 1;
}
.footer
{
    display: flex;
    flex-direction: row;
    justify-content: end;
    margin-top: 15px;
    margin-right: 25px;
}
</style>
