import { AxiosRequestConfig } from 'axios'
import{ http } from '../request/index'

export function getCart(){
  return http.get('/trade/cart/list')
}
// goodsId
export function addGoodsToCart(id: string){
  return http.put(`/trade/cart/add?goodsId=${id}`)
}
// goodsId
export function removeGoodsOutCart(id:string){
  return http.delete(`/trade/cart/remove?goodsId=${id}`)
}