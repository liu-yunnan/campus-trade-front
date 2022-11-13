import { AxiosRequestConfig } from 'axios'
import{ http } from '../request/index'

export function test(params:AxiosRequestConfig<any> | undefined){
  return http.post('/test',params)
}
export function login(params:AxiosRequestConfig<any> | undefined){
  return http.post('/user/login',params)
}
export function register(params: AxiosRequestConfig<any> | undefined){
  return http.post('/user/register',params)
}
export function logout() {
  return http.post('/user/logout')
}
export function EditUserInfo(params: AxiosRequestConfig<any> | undefined) {
  return http.put('/user/info', params);
}