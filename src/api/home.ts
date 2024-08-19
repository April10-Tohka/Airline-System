// /home路径下的api
import request from "../utils/request";

interface departure {
  code: string;
  eName: string;
  id: number;
  international: boolean;
  lat: number;
  lon: number;
  name: string;
  timeZone: number;
}
export const getLowPriceReport = (departure: departure) => {
  return request({
    url: "/api/low-price-report",
    method: "get",
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
