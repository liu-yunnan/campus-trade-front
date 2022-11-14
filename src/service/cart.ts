import { AxiosRequestConfig } from 'axios'
import{ http } from '../request/index'

export function getCartList(){
  return http.get('/trade/cart/list')
}
// goodsId
export function addGoodsToCart(id: number){
  return http.put(`/trade/cart/add?goodsId=${id}`)
}
// goodsId
export function removeGoodsOutCart(id:number){
  return http.delete(`/trade/cart/remove?goodsId=${id}`)
}