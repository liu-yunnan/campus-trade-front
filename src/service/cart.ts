import { AxiosRequestConfig } from 'axios'
import{ http } from '../request/index'

export function getCartList(){
  return http.get('/trade/cart/list')
}
// goodsId
export function addGoodsToCart(){
  return http.put('/trade/cart/add')
}
// goodsId
export function removeGoodsOutCart(){
  return http.delete('/trade/cart/remove')
}