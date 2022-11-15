import { AxiosRequestConfig } from 'axios'
import{ http } from '../request/index'

export function login(params:AxiosRequestConfig<any> | undefined){
  return http.post('/login',params?.data)
}
export function register(params: AxiosRequestConfig<any> | undefined){
  return http.post('/register',params?.data)
}

export function logout() {
  return http.post('/logout')
}
