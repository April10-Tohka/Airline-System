import request from "@/utils/request.js";

/**
 * 获取城市选择器面板内容
 * @returns {*}
 */
export function getSearchBoxRecommend()
{
    return request({
        url:"/restapi/searchbox-recommend",
        method:"get"
    })
}
