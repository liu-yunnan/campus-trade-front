import { AxiosRequestConfig } from 'axios'
import{ http } from '../request/index'

// pageNumber :100
export function getOrderList(){
  return http.post('/trade/order/page')
}
// goodsId
export function getOrderById(){
  return http.get('/trade/order/queryById')
}
// goodsIdList
export function creatOrder(){
  return http.post('/trade/order/create')
}
// goodsId
export function cacelOrder(){
  return http.put('/trade/order/cancel')
}

// goodsId
export function payOrder(){
  return http.put('/trade/order/pay')
}
