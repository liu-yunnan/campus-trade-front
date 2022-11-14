import { AxiosRequestConfig } from 'axios'
import{ http } from '../request/index'

export function postImg(params:AxiosRequestConfig<any>){
  return http.post('/picture',params)
}

export function getImg(pictureId: number){
  return http.get(`/picture/${pictureId}`)
}