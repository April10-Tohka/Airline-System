<script setup>
import CityPicker from "@/components/CityPicker.vue";
import { getLowPriceReport } from "@/api/ctripApis.js";
import { onMounted, ref, watch } from "vue";
onMounted(() => {
  getLowPriceReport(departure.value).then((data) => {
    lowPriceReport.value = data;
  });
});

// 低价速报内容
const lowPriceReport = ref([]);
//出发地
const departure = ref({
  code: "SIA",
  eName: "Xi 'an",
  id: 10,
  international: false,
  lat: 34.25,
  lon: 108.8666666,
  name: "西安",
  timeZone: 8,
});
watch(departure, () => {
  getLowPriceReport(departure.value).then((data) => {
    lowPriceReport.value = data;
  });
});
//卡片滑动的X值
const slideCardsX = ref(0);
//滑动卡片
const slideCards = (X) => {
  slideCardsX.value += X;
  //获取该DOM元素
  const cards = document.getElementById("low-price-flights-item-bd");
  cards.style.setProperty("--translateX", `${slideCardsX.value}px`);
};
</script>

<template>
  <div class="low-price-report-container">
    <div class="search-box">
      <h1 class="low-price-report-title">低价速报</h1>
      <span>出发地:</span>
      <div class="city-filter-container">
        <CityPicker placeholder="请输入出发地" v-model="departure"></CityPicker>
      </div>
    </div>
    <div class="low-price-flights-bd" id="low-price-flights-bd">
      <div class="low-price-flights-group-list">
        <div class="low-price-flights-item-bd" id="low-price-flights-item-bd">
          <div
            class="low-price-flights-group-item"
            v-for="(item, index) in lowPriceReport"
            :key="index"
          >
            <div class="low-price-flights-group-title">
              <img :src="item.imageBgUrl" alt="周末省心游" />
              <div>
                <img :src="item.imageUrl" />
                <span>{{ item.name }}</span>
              </div>
            </div>
            <div class="low-price-flights-routes">
              <div
                class="low-price-flights-route-item"
                v-for="(route, rank) in item.routes"
                :key="rank"
              >
                <div class="low-price-flights-route-rank">
                  <span
                    :class="[`route-item-rank-${rank + 1}`, 'route-item-rank']"
                  >
                    {{ rank + 1 }}
                  </span>
                </div>
                <div class="low-price-flights-route-img">
                  <img :src="route.arriveCity.imageUrl" />
                </div>
                <div class="low-price-flights-route-flight">
                  <div>
                    <span class="low-price-flights-route-flight-cityname">
                      <span>{{ route.departCity.name }}</span>
                      <i>
                        <svg
                          t="1723994940896"
                          class="icon"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="6174"
                        >
                          <path
                            d="M907.946667 581.973333H116.053333c-16.964267 0-30.72-13.755733-30.72-30.72s13.755733-30.72 30.72-30.72h791.893334c16.964267 0 30.72 13.755733 30.72 30.72s-13.755733 30.72-30.72 30.72z"
                            p-id="6175"
                          ></path>
                          <path
                            d="M886.869333 573.5936l-126.532266-126.532267c-11.997867-11.997867-11.997867-31.453867 0-43.451733l0.170666-0.170667c11.997867-11.997867 31.453867-11.997867 43.451734 0l126.532266 126.532267c11.997867 11.997867 11.997867 31.453867 0 43.451733l-0.170666 0.170667c-12.014933 11.997867-31.453867 11.997867-43.451734 0z"
                            p-id="6176"
                          ></path>
                        </svg>
                      </i>
                      <span>{{ route.arriveCity.name }}</span>
                    </span>
                    <span class="low-price-flights-route-flight-price">
                      ￥<span>{{ route.pl[0].price }}</span
                      >起
                    </span>
                  </div>
                  <div>
                    <span>{{ route.pl[0]["departDate"] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="low-price-flights-turn-icon low-price-flights-next-icon"
        @click="slideCards(-1197)"
        v-show="slideCardsX !== -2394"
      >
        <i>></i>
      </div>
      <div
        class="low-price-flights-turn-icon low-price-flights-prev-icon"
        @click="slideCards(1197)"
        v-show="slideCardsX < 0"
      >
        <i><</i>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.low-price-report-container {
  width: 1180px;
  margin: 32px auto 56px;
}
.search-box {
  display: flex;
  align-items: center;
  height: 38px;
  margin-bottom: 16px;
  .low-price-report-title {
    font-size: 26px;
    color: #333333;
    font-weight: 600;
    line-height: 32px;
    margin-right: 24px;
  }
  .low-price-report-title + span {
    color: #666666;
    font-size: 14px;
    line-height: 18px;
    margin-right: 8px;
  }
}
.city-filter-container {
  position: relative;
}
.city-filter-container:deep(#city-picker) {
  position: absolute;
  top: -20px;
}
.city-filter-container:deep(.city-picker-input) {
  position: relative;
  box-shadow: none;
  border-radius: 4px;
  width: 156px;
  height: 38px;
  padding: 0 0 0 8px;
  font-size: 14px;
  outline: none;
  border: 1px solid #dddddd;
  background-color: #cce8cf;
}
.city-filter-container:deep(.city-picker-input:focus) {
  border-color: #0086f6;
  background-color: #ffffff;
}
.city-filter-container:deep(.city-picker-selector) {
  top: 10px;
}
.low-price-flights-bd {
  position: relative;
}
.low-price-flights-group-list {
  overflow: hidden;
  position: relative;
}
.low-price-flights-item-bd {
  --translateX: 0px;
  transform: translateX(var(--translateX));
  display: flex;
  transition: transform 0.6s;
}
.low-price-flights-group-item {
  width: 382px;
  background-color: #ffffff;
  border-radius: 6px;
  margin-right: 17px;
  flex-shrink: 0;
}
/*卡片标题栏样式*/
.low-price-flights-group-title {
  height: 68px;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  > img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
  > div {
    display: flex;
    position: absolute;
    width: 100%;
    height: 58px;
    align-items: center;
    top: 0;
    left: 0;
  }
}
.low-price-flights-group-title > div {
  > img {
    width: 88px;
    height: 68px;
    border-radius: 8px;
    position: absolute;
    right: 32px;
    bottom: -10px;
  }
  > span {
    padding-left: 16px;
    color: #ffffff;
    font-size: 20px;
    font-weight: 600;
    line-height: 26px;
    margin-right: 8px;
  }
}
.low-price-flights-routes {
  background-color: #ffffff;
  position: relative;
  margin-top: -10px;
  min-height: 100px;
  border-radius: 6px;
  padding: 8px 0;
}
//卡片项的样式
.low-price-flights-route-item {
  width: 100%;
  padding: 0 15px 0 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
  //排行榜样式
  > .low-price-flights-route-rank {
    width: 40px;
    height: 66px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    margin-right: 12px;
    > .route-item-rank {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 18px;
      height: 18px;
      border-radius: 4px;
      color: #ffffff;
    }
  }
  //路线图片样式
  > .low-price-flights-route-img {
    height: 66px;
    width: 88px;
    margin-right: 16px;
    overflow: hidden;
    border-radius: 4px;
    > img {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      object-fit: cover;
      transition: transform 0.3s;
    }
  }
  //航班信息样式
  .low-price-flights-route-flight {
    padding: 20px 0;
    width: 200px;
    border-bottom: 1px solid #eeeeee;
    div {
      display: flex;
      justify-content: space-between;
      > .low-price-flights-route-flight-cityname {
        color: #333333;
        font-size: 14px;
        font-weight: 600;
        line-height: 18px;
        display: flex;
        > span {
          max-width: 56px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        > i > .icon {
          $icon-margin-inline: 2px;
          $icon-width: 20px;
          $icon-height: 20px;
          margin-inline: $icon-margin-inline;
          fill: #666666;
          width: $icon-width;
          height: $icon-height;
        }
      }
      > .low-price-flights-route-flight-price {
        color: #0086f6;
        font-size: 12px;
        font-weight: 600;
        line-height: 16px;
        > span {
          font-size: 16px;
          font-weight: 600;
          line-height: 20px;
        }
      }
    }
    div:first-child {
      margin-bottom: 8px;
    }
    div:last-child {
      color: #999999;
      font-size: 12px;
      line-height: 16px;
    }
  }
  //卡片项hover状态下,图片放大，城市高亮
  &:hover {
    //图片放大
    .low-price-flights-route-img > img {
      transform: scale(1.2);
    }
    //高亮城市
    .low-price-flights-route-flight
      > div
      > .low-price-flights-route-flight-cityname {
      color: #0086f6;
      .icon {
        fill: #0086f6;
      }
    }
  }
}
//排行榜背景色映射
$rank-background-colors: (
  "1": #ff6257,
  "2": #f78a29,
  "3": #faca06,
  "4": #ccd5e4,
  "5": #ccd5e4,
);
@each $rank, $background-color in $rank-background-colors {
  .route-item-rank-#{$rank} {
    background-color: $background-color;
  }
}

//轮播图箭头图标样式
.low-price-flights-turn-icon {
  height: 40px;
  width: 40px;
  position: absolute;
  top: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666666;
  background: #ffffff;
  border-radius: 40px;
  &:hover {
    box-shadow:
      0px 0px 12px 0px rgba(0, 0, 0, 0.06),
      0px 1px 4px 0px rgba(0, 0, 0, 0.08);
  }
  > i {
    font-size: 22px;
    font-family: "iconfont", serif;
  }
}
//轮播图下一个箭头图标样式
.low-price-flights-next-icon {
  right: -50px;
}
.low-price-flights-prev-icon {
  left: -50px;
}
</style>
