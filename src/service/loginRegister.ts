import { AxiosRequestConfig } from 'axios'
import{ http } from '../request/index'

export function login(params:AxiosRequestConfig<any> | undefined){
  return http.post('/login',params)
}
export function register(params: AxiosRequestConfig<any> | undefined){
  return http.post('/register',params)
}

export function logout() {
  return http.post('/logout')
}
