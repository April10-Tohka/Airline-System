// 调用携程api来获取数据
import request from "../utils/request.js";

export const getLowPriceReport = (departure) => {
  return request({
    url: "/api/low-price-report",
    method: "post",
    data: departure,
  });
};

/**
 * 获取城市选择器面板内容
 * @returns {*}
 */
export function getSearchBoxRecommendCity() {
  return request({
    url: "/api/search-box-recommend",
    method: "post",
  });
}
