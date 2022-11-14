import { AxiosRequestConfig } from 'axios'
import{ http } from '../request/index'

export function getCategries(){
  return http.get('/categories')
}
