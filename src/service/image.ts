import { AxiosRequestConfig } from 'axios'
import{ http } from '../request/index'

export function postImg(params:AxiosRequestConfig<any>,config?:any){
  return http.post('/picture',params?.data.img,config)
}

export function getImg(pictureId: number){
  return http.get(`/picture/${pictureId}`)
}