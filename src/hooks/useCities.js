// hooks/useCities.js
import { ref, onMounted, computed, onUnmounted } from "vue";
import { getSearchBoxRecommendCity } from "@/api/ctripApis.js";

export function useCities() {
  const cityMap = ref({}); //按拼音首字母分类后的城市映射表
  const recommendCity = ref([]); //推荐城市
  const cityPickerTabBar = ref([]); //城市选择器标签栏
  //选中的标签项
  const activeTab = ref("热门");
  //按标签过滤后的城市
  const filterCities = computed(() => {
    if (activeTab.value === "热门") {
      return undefined;
    }
    const cities = {};
    const activeTabLength = activeTab.value.length;
    for (let i = 0; i < activeTabLength; i++) {
      let firstLetterPy = activeTab.value[i]; //获取activeTab的每一个字符
      if (["I", "U", "V"].includes(firstLetterPy)) {
        continue;
      }
      cities[firstLetterPy] = cityMap.value[firstLetterPy];
    }
    return cities;
  });
  //是否显示城市选择器 false:隐藏 true：显示
  const isShowSelector = ref(false);
  //获取城市数据
  const fetchCityData = () => {
    getSearchBoxRecommendCity().then((data) => {
      cityMap.value = data.cityMap;
      recommendCity.value = data.recommendCity.cityList;
      cityPickerTabBar.value = data.cityPickerTabBar;
    });
  };

  // 点击标签栏的回调函数
  const selectTab = (tab) => {
    console.log("点击了标签", tab);
    isShowSelector.value = true;
    activeTab.value = tab;
  };

  onMounted(() => {
    fetchCityData();
  });
  onUnmounted(() => {});

  return {
    cityMap,
    cityPickerTabBar,
    recommendCity,
    activeTab,
    filterCities,
    isShowSelector,
    selectTab,
  };
}
