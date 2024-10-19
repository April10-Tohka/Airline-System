<script setup>
import { useCities } from "@/hooks/useCities.js";
import { computed } from "vue";
const props = defineProps({
  placeholder: {
    type: String,
    default: "请选择城市",
  },
});
const {
  recommendCity,
  cityPickerTabBar,
  activeTab,
  filterCities,
  isShowSelector,
  selectTab,
} = useCities();

//选中的城市,（v-model传递给组件的值）
const selectedCity = defineModel();

const displaySelectedCity = computed(() => selectedCity.value.name);
//选择某个城市的回调函数
function selectCity(city) {
  console.log("选择了城市", city);
  selectedCity.value = city;
  isShowSelector.value = false;
}

//input的click事件的默认行为
const inputDefaultBehavior = () => {
  //默认行为:点击input，显示选择器
  console.log("默认行为:显示选择器");
  isShowSelector.value = true;
  document.addEventListener("click", handleGlobalClick, true);
};

// 添加全局点击事件监听
const handleGlobalClick = (event) => {
  const citySelectorWrapper = document.querySelector("#city-picker-selector");
  if (citySelectorWrapper && !citySelectorWrapper.contains(event.target)) {
    //隐藏选择器面板
    isShowSelector.value = false;
  }
};
</script>

<template>
  <div id="city-picker">
    <input
      class="city-picker-input"
      :value="displaySelectedCity"
      @click="inputDefaultBehavior"
      :placeholder="placeholder"
    />

    <div
      id="city-picker-selector"
      class="city-picker-selector"
      v-show="isShowSelector"
      @click.capture="isShowSelector = true"
    >
      <div class="city-picker-selector-left">
        <div class="tabs">
          <div class="tab-item">国内</div>
        </div>
      </div>
      <div class="city-picker-selector-content">
        <ul class="city-picker-tabs">
          <li
            class="city-picker-tab-item"
            :class="{ active: tab === activeTab }"
            v-for="(tab, index) in cityPickerTabBar"
            :key="index"
            @click="selectTab(tab)"
          >
            {{ tab }}
          </li>
        </ul>
        <div class="city-picker-body">
          <ul class="hot-cities" v-if="activeTab === '热门'">
            <li
              v-for="city in recommendCity"
              :key="city.id"
              @click="selectCity(city)"
            >
              {{ city.name }}
            </li>
          </ul>
          <div
            v-else
            class="domestic-city-item"
            v-for="(cities, key) in filterCities"
            :key="key"
          >
            <div class="city-character">{{ key }}</div>
            <ul class="domestic-city-content">
              <li
                v-for="city in cities"
                :key="city.id"
                @click="selectCity(city)"
              >
                {{ city.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.city-picker-input {
  position: absolute;
  padding: 29px 0 14px 16px;
  width: 90%;
  height: 20px;
  line-height: 20px;
  background-color: transparent;
  font-size: 16px;
  border: none;
  color: black;
}
/*城市选择器样式*/
.city-picker-selector {
  width: 736px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  box-shadow: 0 7px 22px -7px rgba(0, 0, 0, 0.34);
  border-radius: 6px;
  position: relative;
  top: 80px;
  z-index: 10;
  display: flex;
  flex-direction: row;
  animation: toRightBottom 150ms ease-out 1 forwards;
}
.city-picker-selector-left {
  width: 105px;
  position: relative;
  left: 0;
  height: inherit;
  background-color: #f4f4f4;
  border-radius: 5px 0 0 5px;
  border-right: 1px solid #e6e6e6;
  .tabs {
    padding: 13px 6px;
    font-size: 14px;
    .tab-item {
      background-color: #0086f6;
      border-radius: 5px;
      font-size: 14px;
      color: #ffffff;
      padding: 8px 11px;
      line-height: 18px;
      margin-bottom: 8px;
      cursor: pointer;
    }
  }
}
.city-picker-selector-content {
  width: 628px;
  /*城市选择器拼音首字母标签栏*/
  .city-picker-tabs {
    width: inherit;
    border-bottom: 1px solid #e6e6e6;
    height: 55px;
    line-height: 55px;
    color: #333333;
    display: flex;
    flex-direction: row;
    .city-picker-tab-item {
      margin-left: 32px;
      font-size: 14px;
      height: 55px;
      line-height: 55px;
      cursor: pointer;
      position: relative;
    }
    /*拼音首字母标签下划线样式*/
    .city-picker-tab-item::before {
      content: "";
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      border-bottom: 2px solid #0086f6;
      display: none;
    }
    .city-picker-tab-item:hover {
      color: #0086f6;
    }
    .city-picker-tab-item.active {
      color: #0086f6;
      font-weight: 500;
    }
    /*显示下划线*/
    .city-picker-tab-item.active::before {
      display: block;
    }
  }
  /*城市选择器具体的城市*/
  .city-picker-body {
    width: 100%;
    .domestic-city-item {
      padding-left: 32px;
      width: 100%;
      display: flex;
      flex-direction: row;
      .city-character {
        width: 26px;
        line-height: 32px;
        font-weight: 600;
        font-size: 12px;
      }
      .domestic-city-content {
        width: 598px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        li {
          padding: 0 2px 0 8px;
          height: 32px;
          width: 68px;
          line-height: 32px;
          font-size: 14px;
          color: #333333;
          cursor: pointer;
          overflow: hidden;
        }
        li:hover {
          color: #0086f6;
          border-radius: 4px;
          background-color: rgba(0, 134, 246, 0.05);
        }
      }
    }
    .domestic-city-item:first-child {
      padding-top: 24px;
    }
    .domestic-city-item:last-child {
      padding-bottom: 24px;
    }
    /*热门城市*/
    .hot-cities {
      padding: 20px 30px 24px 32px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      li {
        width: 84px;
        padding: 0 2px 0 8px;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        color: #333333;
        cursor: pointer;
        overflow: hidden;
      }
      li:hover {
        color: #0086f6;
        border-radius: 4px;
        background-color: rgba(0, 134, 246, 0.05);
      }
    }
  }
}
.hide {
  display: none;
}
@keyframes toRightBottom {
  0% {
    opacity: 0.8;
    transform: scaleX(0.1) scaleY(0.1);
    transform-origin: 0 0 0;
  }
  100% {
    opacity: 1;
    transform: scaleX(1) scaleY(01);
    transform-origin: 0 0 0;
  }
}
</style>
