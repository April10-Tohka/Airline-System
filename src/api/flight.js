import request from "@/utils/request.js";

/**
 * 获取所有航班信息
 * @returns {*}
 */
export function getAllFlights()
{
    return request({
        url:'/api/getAllFlights',
        method:"get"
    })
}

/**
 *
 * @param column 需要查询数据库中的哪个字段
 * @returns {*}
 */
export  function getColumnData(column)
{
    return request({
        url:`/api/getData/${column}`,
        method:'get'
    })
}

/**
 *获取某城市所有的机场
 * @param city 城市
 * @returns {*} 该城市所拥有的机场数组
 */
export function  getCityPort(city)
{
    console.log("getCityPort得到的city",city);
    return request({
        url:`/api/getCityPort/?city=${city}`,
        method:"get"
    })
}

/**
 * 获取某航班的信息
 * @param flightNo 航班号
 * @returns {*} 该航班信息
 */
export function  getFlightDetail(flightNo)
{
    return request({
        url:`/api/getFlightDetail/${flightNo}`,
        method:"get"
    })
}

/**
 * 获取某个航班的所有飞机票
 * @param departCity 起飞城市
 * @param arriveCity 到达城市
 * @returns {*}
 */
export function  getFlightTickets(departCity,arriveCity)
{
    return request({
        url:`/api/getFlightTickets?departCity=${departCity}&arriveCity=${arriveCity}`,
        method:"get"
    })
}

