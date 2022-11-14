import { AxiosRequestConfig } from 'axios'
import{ http } from '../request/index'

export function psdUpdate(params: AxiosRequestConfig<any> | undefined) {
  return http.post('/member/psdupdate', params);
}
export function getUserInfo() {
  return http.get(`/member`);
}
export function EditUserInfo(params:AxiosRequestConfig<any>) {
  return http.put(`/member`,params);
}
