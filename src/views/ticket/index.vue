<script setup>
//引入组件
import SearchForm from "@/views/home/components/SearchForm.vue";
import FlightItem from "@/views/ticket/components/FlightItem.vue";
import TopBar from "@/views/ticket/components/TopBar.vue";
import BookConfirmation from "./components/BookConfirmation.vue";
import NoResult from "@/views/ticket/components/NoResult.vue";
// 引入方法
import { getFormattedDate } from "@/utils/dateFormat.js";
import { onMounted, ref } from "vue";
import { getFlightSchedule } from "@/api/flight.js";
import { useFlightStore } from "@/stores/modules/flight.js";
const flightStore = useFlightStore();

onMounted(() => {
  //显示骨架屏
  loading.value = true;
  getFlightSchedule(flightStore.flight).then((data) => {
    const { flights, total } = data;
    if (total === 0) {
      setTimeout(() => {
        loading.value = false;
        isRenderNoResult.value = true;
      }, 400);
      return;
    }
    flightTickets.value = flights;
    isRenderNoResult.value = false;
    setTimeout(() => {
      loading.value = false;
    }, 400);
  });
});

const props = defineProps([
  "arriveCity",
  "departCity",
  "departDate",
  "departCityCode",
  "arriveCityCode",
]);

//是否显示骨架屏
const loading = ref(false);
const flightTickets = ref([]); //飞机票

//是否显示订单弹窗
const showOrder = ref(false);
//选择的飞机票
const selectTicket = ref(null);
const isRenderNoResult = ref(false); //是否渲染无航班组件
//点击订票的处理逻辑
function handleShowOrder(args) {
  console.log("处理ShowOrder事件的回调函数", args);
  showOrder.value = args.showOrder;
  selectTicket.value = args.selectTicket;
}
const queryFlightSchedule = () => {
  //显示骨架屏
  loading.value = true;
  getFlightSchedule(flightStore.flight).then((data) => {
    const { flights, total } = data;
    if (total === 0) {
      setTimeout(() => {
        loading.value = false;
        isRenderNoResult.value = true;
      }, 400);
      return;
    }
    flightTickets.value = flights;
    isRenderNoResult.value = false;
    setTimeout(() => {
      loading.value = false;
    }, 400);
  });
};
</script>

<template>
  <SearchForm @query-flight-schedule="queryFlightSchedule"></SearchForm>
  <div class="body-wrapper">
    <div class="result-header">
      <div class="address">
        <span class="depart">{{ departCity }}</span>
        <svg
          t="1710934823512"
          class="arrow"
          viewBox="0 0 6016 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5180"
          width="32"
          height="32"
        >
          <path
            d="M5043.2 768V179.2c0-76.8 51.2-128 128-128 38.4 0 64 12.8 89.6 38.4l716.8 716.8c51.2 51.2 51.2 128 0 179.2-25.6 25.6-51.2 38.4-89.6 38.4H179.2c-76.8 0-128-51.2-128-128s51.2-128 128-128h4864z"
            fill="#333333"
            p-id="5181"
          ></path>
        </svg>
        <span class="arrival">{{ arriveCity }}</span>
      </div>
      <div class="depart-date">
        {{ getFormattedDate(departDate) }}
      </div>
    </div>

    <!--        飞机票-->
    <el-skeleton animated :loading="loading" :count="6">
      <template #template>
        <div class="fake-flight-summary">
          <div class="fake-flight-airline">
            <el-skeleton-item
              variant="text"
              style="width: 40px; height: 40px"
            ></el-skeleton-item>
            <div
              style="
                flex-direction: column;
                display: flex;
                position: relative;
                left: 10px;
              "
            >
              <el-skeleton-item
                variant="h3"
                style="width: 80px; height: 20px"
              ></el-skeleton-item>
              <el-skeleton-item
                variant="text"
                style="width: 80px; height: 10px; margin-top: 10px"
              ></el-skeleton-item>
            </div>
          </div>
          <div class="fake-flight-detail">
            <el-skeleton-item
              variant="h1"
              style="width: 295px; height: 20px"
            ></el-skeleton-item>
          </div>
          <div class="fake-flight-operate">
            <el-skeleton-item
              variant="button"
              style="width: 80px; height: 20px"
            ></el-skeleton-item>
          </div>
        </div>
      </template>
      <template #default>
        <div v-if="isRenderNoResult">
          <NoResult
            :depart-date="flightStore.departDate"
            :arrive="flightStore.arrive.name"
            :depart="flightStore.depart.name"
          ></NoResult>
        </div>
        <div v-else>
          <!--        顶部工具栏-->
          <TopBar></TopBar>
          <FlightItem
            :flight-tickets="flightTickets"
            @showOrder="handleShowOrder"
          ></FlightItem>
        </div>
      </template>
    </el-skeleton>
  </div>
  <!--    确认订单窗口-->
  <BookConfirmation
    v-model="showOrder"
    :ticket="selectTicket"
  ></BookConfirmation>
</template>

<style scoped lang="scss">
$padding-left: 33px;
.body-wrapper {
  max-width: 1180px;
  margin: 0 auto;
}
.result-header {
  margin-bottom: 4px;
  display: flex;
  flex-direction: row;
  padding-left: $padding-left;
  align-items: center;
  line-height: 1;
  height: 50px;
  .address {
    display: flex;
    flex-direction: row;
    align-items: center;
    .depart,
    .arrival {
      font-weight: 700;
      font-size: 24px;
    }
    .arrow {
      margin: 0 4px;
    }
  }
  .depart-date {
    color: #333333;
    font-size: 18px;
    margin-left: 10px;
  }
}
/*骨架屏样式*/
.body-wrapper:deep(.el-skeleton) {
  box-sizing: border-box;
  margin-top: 4px;
  padding-left: 33px;
  height: 80px;
}
.fake-flight-summary {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #f8fafd;
  height: 100%;
  position: relative;
  .fake-flight-airline {
    display: flex;
    flex-direction: row;
    position: absolute;
    top: 20px;
    left: 24px;
  }
  .fake-flight-detail {
    position: absolute;
    left: 395px;
    top: 30px;
  }
  .fake-flight-operate {
    position: absolute;
    top: 30px;
    right: 20px;
  }
}
.fake-flight-summary:nth-child(3n + 1) {
  background-color: #ffffff;
}
</style>
