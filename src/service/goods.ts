import { AxiosRequestConfig } from 'axios'
import{ http } from '../request/index'

export function selectGoodsList(categoryId:number = -1,keyword:string,pageNum:number = -1,pageSize:number,priceOrder:''|'asc'|'desc',putOnTime:number = -1){
  return http.get(`/goods/?categoryId=${categoryId}&keyword=${keyword}&pageNum=${pageNum}&pageSize=${pageSize}&priceOrder=${priceOrder}&putOnTime=${putOnTime}
  `)
}
export function pubGoods(params: AxiosRequestConfig<any> | undefined){
  return http.post('/goods',params?.data)
}

export function getPubGoods(stateDate:number = -1,endDate:number = -1) {
  return http.get(`/goods/my-goods?endDate=${endDate}&startDate=${stateDate}`)
}

export function getGoodsItem(goodsId:string) {
  return http.get(`/goods/${goodsId}`)
}
export function updateGoods(params: AxiosRequestConfig<any> | undefined, goodsId:string) {
  return http.put(`/goods/${goodsId}`,params?.data)
}
export function downGoods( goodsId:string) {
  return http.put(`/goods/${goodsId}/pull-off`)
}
export function upGoods( goodsId:string) {
  return http.put(`/goods/${goodsId}/put-on`)
}
