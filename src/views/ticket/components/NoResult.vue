<script setup>
const props = defineProps({
  depart: {
    type: String,
    required: true,
  },
  arrive: {
    type: String,
    required: true,
  },
  departDate: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="no-result">
    <i class="no-result-icon"></i>
    <div class="title">
      您查询的 {{ props.depart }} 至 {{ props.arrive }}（出发日期：{{
        props.departDate
      }}） 的机票可能因无航班或航班座位已售完导致暂时无法查询到对应价格。
      建议您更换旅行日期或旅行城市重新查询
    </div>
  </div>
</template>

<style scoped>
.no-result {
  position: relative;
  margin-bottom: 4px;
  background-color: #fff9ea;
  min-height: 50px;
  padding: 15px 15px 15px 100px;
}
.no-result-icon {
  width: 58px;
  height: 58px;
  position: absolute;
  left: 20px;
  top: 50%;
  margin-top: -29px;
  background-image: url("https://pic.c-ctrip.com/flight_intl/list/ico_sprite@2x.png?v6");
  background-position: -580px -370px;
  background-repeat: no-repeat;
}
</style>
