// /home路径下的api
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
export function getSearchBoxRecommend() {
  return request({
    url: "/ctrip/searchbox-recommend",
    method: "get",
  });
}
