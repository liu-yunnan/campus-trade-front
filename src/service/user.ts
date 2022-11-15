import { AxiosRequestConfig } from 'axios'
import{ http } from '../request/index'

export function psdUpdate(params: AxiosRequestConfig<any> | undefined) {
  return http.post('/member/psdupdate', params?.data);
}
export function getUserInfo() {
  return http.get(`/member`);
}
export function editUserInfo(params:AxiosRequestConfig<any>) {
  return http.put(`/member`,params.data);
}
