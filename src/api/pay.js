import request from "@/utils/request.js";

/**
 * 生成支付宝的支付请求接口
 * @param orderId 订单号
 * @returns {*}
 */
export function createAlipayPaymentApi(orderId) {
  return request({
    url: "/api/pay/alipay",
    method: "post",
    data: { order_id: orderId },
  });
}
