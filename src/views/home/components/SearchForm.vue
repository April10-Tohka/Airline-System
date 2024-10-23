<script setup>
//引入组件
import SearchButton from "@/components/SearchButton.vue";
import CityPicker from "@/components/CityPicker.vue";

//引入api
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useFlightStore } from "@/stores/modules/flight.js";
const flightStore = useFlightStore();
const router = useRouter();
const emit = defineEmits(["queryFlightSchedule"]);
onMounted(() => {
  //挂载时，获取所有 class="form-item" 的元素集合
  const formItemElements = document.getElementsByClassName("form-item");
  for (let i = 0; i < formItemElements.length; i++) {
    formItemElements[i].addEventListener("click", (e) => {
      //移除所有元素的 active 类名
      for (let j = 0; j < formItemElements.length; j++) {
        formItemElements[j].classList.remove("active");
      }
      //找到目标元素的父元素并添加 active 类名
      let isFormItem = e.target.closest(".form-item");
      if (isFormItem) {
        isFormItem.classList.add("active");
      }
    });
  }
});
/**
 * 交换出发地和目的地
 */
function swapFromTo() {
  console.log("点击了交换目的地");
  let [switchIcon] = document.getElementsByClassName("switch-icon");
  switchIcon.classList.toggle("switch-icon-rotate");
  flightStore.swapFromTo();
}

//跳转到ticket页面,搜索对应的航班时刻表
function toTicket() {
  console.log("=>(SearchForm.vue:101)跳转到ticket页面 ");
  router.push({
    name: "ticket",
    params: {
      departCity: flightStore.depart.name,
      arriveCity: flightStore.arrive.name,
      departDate: flightStore.departDate,
      departCityCode: flightStore.depart.code,
      arriveCityCode: flightStore.arrive.code,
    },
  });
  emit("queryFlightSchedule");
}

/*设置禁用掉的日期*/
const disabledDate = (time) => {
  return time.getTime() < Date.now();
};
//date-picker Focus事件的回调函数
const handleDatePickerFocus = (e) => {
  const formItemElements = document.getElementsByClassName("form-item");
  for (let i = 0; i < formItemElements.length; i++) {
    //移除所有元素的 active 类名
    formItemElements[i].classList.remove("active");
  }
  formItemElements[formItemElements.length - 1].classList.add("active");
};
</script>

<template>
  <div class="tab-content">
    <form class="searchForm">
      <div class="search-form">
        <div class="form-line">
          <div class="form-item-group-wrap">
            <div class="form-item-group">
              <div class="switch-btn">
                <div class="switch-icon-wrap" @click="swapFromTo">
                  <svg
                    t="1717232869386"
                    class="switch-icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="4313"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M609.834667 97.834667a42.666667 42.666667 0 0 1 60.330666 0l170.666667 170.666666a42.666667 42.666667 0 0 1 0 60.330667l-170.666667 170.666667a42.666667 42.666667 0 0 1-60.330666-60.330667L707.669333 341.333333H213.333333a42.666667 42.666667 0 0 1 0-85.333333h494.336l-97.834666-97.834667a42.666667 42.666667 0 0 1 0-60.330666z m-195.669334 426.666666a42.666667 42.666667 0 0 1 0 60.330667L316.330667 682.666667H810.666667a42.666667 42.666667 0 1 1 0 85.333333H316.330667l97.834666 97.834667a42.666667 42.666667 0 0 1-60.330666 60.330666l-170.666667-170.666666a42.666667 42.666667 0 0 1 0-60.330667l170.666667-170.666667a42.666667 42.666667 0 0 1 60.330666 0z"
                      fill="#707070"
                      p-id="4314"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="form-item flt-depart">
                <label>出发地</label>
                <CityPicker v-model="flightStore.depart"></CityPicker>
              </div>
              <div class="form-item flt-arrival">
                <label>目的地</label>
                <CityPicker v-model="flightStore.arrive"></CityPicker>
              </div>
            </div>
          </div>
          <div class="form-item-group-wrap">
            <div class="form-item-group">
              <div class="form-item date-picker">
                <label>出发日期</label>
                <el-date-picker
                  v-model="flightStore.departDate"
                  type="date"
                  placeholder="Pick a day"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  :disabled-date="disabledDate"
                  @focus="handleDatePickerFocus"
                />
              </div>
            </div>
          </div>
          <slot name="search-button">
            <SearchButton @click="toTicket">搜索</SearchButton>
          </slot>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.tab-content {
  background-color: #ffffff;
  padding: 24px;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 16px 1px rgba(0, 0, 0, 0.06);
  z-index: 2;
  position: relative;
  margin-bottom: 60px;
}
.form-line {
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  position: relative;
}
.form-item-group-wrap {
  margin-right: 15px;
  height: 64px;
  .form-item-group {
    border: 1px solid #eeeeee;
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.06);
    border-radius: 6px;
    height: 62px;
    display: flex;
    flex-direction: row;
    position: relative;
  }
}
.form-item-group-wrap:nth-child(2) {
  transform: translateX(-100px);
}
.form-item-group-wrap:hover {
  .form-item-group {
    box-shadow: 0 4px 24px -10px rgba(0, 0, 0, 0.44);
    transition:
      box-shadow 0.15s ease-in-out,
      -webkit-box-shadow 0.15s ease-in-out;
  }
}
.form-item {
  height: 62px;
  position: relative;
  width: 237px;
  label {
    font-size: 12px;
    color: #999999;
    position: absolute;
    top: 10px;
    left: 16px;
  }
}
/*头上的蓝线样式*/
.form-item::before {
  content: "";
  height: 1px;
  width: 100%;
  position: absolute;
  top: -1px;
  left: 0;
  animation: toRight 0.15s ease-out 1 forwards;
  border-radius: 16px 0 0 0;
  border-top: 2px solid #0086f6;
  background-color: #ffffff;
  display: none;
}
/*active状态下显示蓝线*/
.form-item.active::before {
  display: block;
}
/*active状态下的label标签文字显示蓝色*/
.form-item.active label {
  color: #0086f6;
}
.switch-btn {
  margin-top: 16px;
  position: absolute;
  left: 220px;
  .switch-icon-wrap {
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
    .switch-icon {
      transition: transform 0.3s ease;
    }
    .switch-icon-rotate {
      transform: rotate(180deg);
    }
  }
  .switch-icon-wrap:hover {
    background-color: #f4f4f4;
    color: #666666;
    border: 1px solid #f4f4f4;
  }
}
.switch-btn::after {
  content: "";
  width: 1px;
  height: 62px;
  background: url("https://pic.c-ctrip.com/fltcommon/index/ico/input-liner.png");
  position: absolute;
  left: 15px;
  top: -15px;
  z-index: 3;
}

.date-picker:deep(.el-input) {
  position: absolute;
  top: 30px;
}
/*去除日期选择器的边框样式*/
.date-picker:deep(.el-input__wrapper) {
  box-shadow: none;
}
/*去除日期选择器的删除按钮*/
.date-picker:deep(.el-input__suffix) {
  display: none;
}
.date-picker:deep(.el-input__inner) {
  font-family:
    Helvetica Neue,
    Tahoma,
    Arial,
    PingFangSC-Regular,
    Hiragino Sans GB,
    Microsoft Yahei,
    sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: black;
}

@keyframes toRight {
  0% {
    opacity: 0.8;
    transform: scaleX(0.1);
    transform-origin: 0 0 0;
  }
  100% {
    opacity: 1;
    transform: scaleX(1);
    transform-origin: 0 0 0;
  }
}
</style>
