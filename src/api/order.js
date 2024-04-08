import request from "@/utils/request.js";

/**
 * 获取订单列表
 * @returns {*} 符合条件的订单列表。
 */
export function getOrders()
{
    return request({
        url:'/api/orders',
        method:'get'
    })
}

/**
 * 获取订单详情
 * @param orderID 订单号
 * @returns {*} 订单的详细信息
 */
export  function  getOrderDetail(orderID)
{
    return request({
        url:`/api/orders/${orderID}`,
        method:"get"
    })
}

/**
 * 创建订单
 * @param data  订单信息，包括乘机人信息，航班信息
 * @returns {*}
 */
export function createOrder(data)
{
    return request({
        url:"/api/orders",
        method:"post",
        data
    })
}
