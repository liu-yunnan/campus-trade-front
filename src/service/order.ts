import { AxiosRequestConfig } from 'axios'
import{ http } from '../request/index'
// Date.parse(new Date('2021-11-22')); 
// pageNo :100
export function getOrderList(params:AxiosRequestConfig){
  return http.post('/trade/order/page',params)
}
// goodsId
export function getOrderById(id:number){
  return http.get(`/trade/order/queryById?id=${id}`)
}
// goodsIdList int[]
export function creatOrder(params:AxiosRequestConfig){
  return http.post('/trade/order/create',params)
}
// goodsId
export function cancelOrder(id:number){
  return http.put(`/trade/order/cancel?id=${id}`)
}

export function payOrder(orderId:number,payType:number){
  return http.put(`/trade/order/pay?id=${orderId}&payType=${payType}`)
}
