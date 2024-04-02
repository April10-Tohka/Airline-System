<script setup>
import {ref, onMounted, onBeforeMount} from "vue";
import {useRoute, useRouter} from "vue-router";
import {emitter} from "@/utils/mitt.js";
let currentIndex=ref(0);//侧边栏项索引
let asideWidth=ref(150);
const router=useRouter();
function ToRoute(path,index)
{
    console.log("path,index:",path,index);
    currentIndex.value=index;
    router.push(path);
}
onMounted(()=>{
    ToRoute("/admin/flightManage",1);
})
onBeforeMount(()=>{
    //组件挂载前，监听折叠侧边栏事件
    emitter.on('collapseAside',(isCollapse)=>{
        console.log("触发了collapseAside事件，传来的值为",isCollapse);
        asideWidth.value=isCollapse?0:150;
        console.log("asideWidth.value",asideWidth.value);
    })
})
</script>

<template>
    <div class="container">
        <div class="aside" :style="{width:`${asideWidth}px`}">
            <div :class="{'aside-item':true,'aside-item-active':currentIndex===1}" @click="ToRoute('/admin/flightManage',1)">
                <div class="aside-item-icon">
                    <svg t="1711280019456" class="icon" viewBox="0 0 2039 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7871" width="32" height="32"><path d="M1810.842002 53.260059c-58.284593 0-114.559372 13.063788-167.819431 37.18155-131.642787 64.314033-265.295388 125.613346-399.952895 182.893033-4.019627 2.009814-8.039254 2.009814-12.058881 2.009813-250.221786-29.142296-499.438665-59.2895-749.660452-86.421982-38.186457-6.029441-69.338567 19.093229-90.441609 35.171737-24.117763 17.083415-48.235525 35.171737-72.353287 52.255152-37.181551 25.122669-15.073602 56.274779 7.034347 65.31894L723.532875 528.580962c27.132483 15.073602 10.049068 36.176644 0 43.210991l-211.030422 92.451423c-6.029441 2.009814-13.063788 2.009814-19.093228 0-86.421982-38.186457-200.981354-65.31894-272.329735-89.436703-41.201178-14.068695-84.412169-2.009814-109.534838 24.117763-13.063788 13.063788-21.103042 30.147203-23.112856 48.235525-2.009814 18.088322 5.024534 36.176644 19.093229 48.235525l239.167811 207.010795c27.132483 23.112856 63.309127 21.103042 90.44161 20.098135 60.294406-2.009814 96.47105-4.019627 154.755642-9.044161 33.161923-3.01472 66.323847-12.058881 96.47105-26.127576 442.158979-216.054956 1268.192345-643.140334 1268.192346-643.140334 63.309127-37.181551 75.368008-86.421982 46.225711-117.574092-31.15211-37.181551-101.495584-73.358194-191.937193-73.358194z" p-id="7872" fill="#767c88"></path></svg>
                </div>
                <div class="aside-item-content">
                    航班管理
                </div>
            </div>
            <div :class="{'aside-item':true,'aside-item-active':currentIndex===2}" @click="ToRoute('/admin/ticketManage',2)">
                <div class="aside-item-icon">
                    <svg t="1711279650345" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5626" width="32" height="32"><path d="M302.1 615.9l49.3-58.4s164.8 2.5 167.3 3.1-29.1 162-29.1 162 15.4 19.9 50.1-41c28.9-50.5 68.7-124.8 68.7-124.8s8.9 0.6 42-1.2c33.1-1.9 84 0 95.4-22.3-11.3-22.3-62.2-20.5-95.4-22.3-33.1-1.9-42-1.2-42-1.2s-39.8-74.3-68.7-124.8c-34.7-60.8-50.1-41-50.1-41s31.5 161.4 29.1 162-167.3 3.1-167.3 3.1l-49.3-58.4-15.4 0.6 29.1 81.9-29.1 81.9 15.4 0.8z" fill="#767c88" p-id="5627"></path><path d="M866 192.7H166.6c-50.1 0-90.8 40.7-90.8 90.8v411.8c0 50.1 40.7 90.8 90.8 90.8H866c50.1 0 90.8-40.7 90.8-90.8V283.5c0-50-40.7-90.8-90.8-90.8z m-551.7 60c12 0 21.7 9.7 21.7 21.7s-9.7 21.7-21.7 21.7-21.7-9.7-21.7-21.7c0-11.9 9.7-21.7 21.7-21.7z m-57.3 0c12 0 21.7 9.7 21.7 21.7s-9.7 21.7-21.7 21.7-21.7-9.7-21.7-21.7c0-11.9 9.7-21.7 21.7-21.7z m-59.8 0c12 0 21.7 9.7 21.7 21.7s-9.7 21.7-21.7 21.7-21.7-9.7-21.7-21.7c0-11.9 9.7-21.7 21.7-21.7z m709.6 442.6c0 22.5-18.3 40.8-40.8 40.8H166.6c-22.5 0-40.8-18.3-40.8-40.8V322.4h781.1v372.9z" fill="#767c88" p-id="5628"></path></svg>
                </div>
                <div class="aside-item-content">
                    机票管理
                </div>
            </div>
        </div>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped>
.container
{
    display: flex;
    flex-direction: row;
}
.aside
{
    width: 130px;
    background-color: #ffffff;
    padding-top: 10px;
    color: rgb(38,40,36);
    font-family: "Inter", sans-serif;
    line-height: 1.25rem;
    font-size: 0.875rem;
    max-height: 700px;
    height: 600px;
    position: sticky;
    top: 0;
    bottom: 0;
    z-index: 1;
    transition: width 0.3s ease;
    //border-right: 2px solid red;
}
/*TODO: 完成aside与main之间的分割线*/
.aside-item
{
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: all 0.3s linear , 0.3s cubic-bezier(0.25,0.8,0.5,1);
    cursor: pointer;
    padding: 12px 8px 12px 16px;
    width: 100%;
    height: 56px;
    line-height: 56px;
    box-sizing: border-box;
    .aside-item-icon
    {
        position: relative;
        top: 5px;
        line-height: 20px;
        margin-right: 6px;
    }
    .aside-item-content
    {
        font-weight: 600;
        line-height: 1.25rem;
    }
}
.aside-item:hover
{
    background-color: #ecf6ff;
    border-left: 6px solid #dbeeff;
}
.aside-item-active
{
    border-left: 6px solid #bbdfff;
    background-color: #c8e5ff;
}
.main
{
    flex: 1;
    background-color: #ffffff;
    padding: 30px 0 30px 30px;
    z-index: 10;
}
</style>
