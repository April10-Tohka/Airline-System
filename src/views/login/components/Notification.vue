<script setup>
import { computed } from "vue";
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});
const typeClass = computed(() =>
  props.type === "success" ? "tip-success" : "tip-alert",
);
const iconType = computed(() => props.type === "success");
</script>

<template>
  <div class="tip-container" :class="[typeClass]">
    <i class="tip-icon">
      <template v-if="iconType">
        <svg
          t="1728722298137"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1652"
          width="16"
          height="16"
        >
          <path
            d="M511.998465 65.290005c-246.722194 0-446.708971 200.001103-446.708971 446.708971 0 246.708891 199.986777 446.709995 446.708971 446.709995 246.708891 0 446.711018-200.001103 446.711018-446.709995C958.709483 265.291109 758.707356 65.290005 511.998465 65.290005L511.998465 65.290005zM756.308727 405.884171 465.103412 697.081299c-6.804986 6.819313-17.856693 6.819313-24.662703 0L267.69025 524.33084c-6.804986-6.804986-6.804986-17.856693 0-24.668843l54.29765-54.290487c6.804986-6.812149 17.856693-6.812149 24.662703 0l106.122993 106.107643 224.574778-224.561475c6.804986-6.812149 17.857716-6.812149 24.663726 0l54.29765 54.290487C763.128039 388.020314 763.128039 399.072021 756.308727 405.884171L756.308727 405.884171 756.308727 405.884171zM756.308727 405.884171"
            fill="#89C27E"
            p-id="1653"
          ></path></svg
      ></template>
      <template v-else>
        <svg
          t="1714274136236"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="7148"
          width="16"
          height="16"
        >
          <path
            d="M513.9 106.5C290 106.5 108.4 288 108.4 512c0 223.9 181.5 405.5 405.5 405.5 223.9 0 405.5-181.5 405.5-405.5-0.1-224-181.6-405.5-405.5-405.5z m0 772.3C311.3 878.8 147 714.5 147 511.9 147 309.3 311.2 145 513.9 145c202.6 0 366.8 164.2 366.8 366.9 0 202.6-164.2 366.9-366.8 366.9z m0 0"
            fill="#DC630C"
            p-id="7149"
          ></path>
          <path
            d="M455.9 743.6c0 32 25.9 57.9 57.9 57.9s57.9-25.9 57.9-57.9c0-20.7-11-39.8-29-50.2-17.9-10.3-40-10.3-57.9 0-17.8 10.4-28.9 29.5-28.9 50.2z m0 0M513.9 222.3c-20.5 0-40.1 8.1-54.6 22.6-14.5 14.5-22.6 34.1-22.6 54.6s57.9 326.9 57.9 328.2c0 5.1 2 10 5.7 13.7 3.6 3.6 8.5 5.7 13.7 5.7 10.4-0.6 18.7-8.9 19.3-19.3l57.9-328.2c0-20.5-8.1-40.1-22.6-54.6-14.6-14.6-34.3-22.7-54.7-22.7z m0 0"
            fill="#DC630C"
            p-id="7150"
          ></path>
        </svg>
      </template>
    </i>
    <span class="tip-message"> {{ message }} </span>
  </div>
</template>

<style scoped>
/**
设置提示框样式
 */
.tip-container {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 10px;
  border: 1px solid #dca;
  color: #666666;
  padding: 2px 25px;
  width: 268px;
  .tip-icon {
    position: absolute;
    left: 9px;
    top: 2px;
  }
  .tip-message {
    font-size: 12px;
    position: relative;
    top: 0;
    left: 2px;
  }
}
.tip-success {
  background-color: #ebf9e5;
}
.tip-alert {
  background-color: #fffadc;
}
</style>
