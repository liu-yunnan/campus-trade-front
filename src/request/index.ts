import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Toast } from 'vant';
import axios from 'axios'
import router from '../router';
import {BASE_URL,TIME_OUT} from './config'
import { getLocal } from "../common/common";
class Request {
    private baseUrl: string = BASE_URL

    private request(opts: {}): any {
        const instance: AxiosInstance = axios.create({
            baseURL: this.baseUrl,
            timeout: TIME_OUT
        })
        this.setInterceptors(instance)
        return instance(opts)
    }
    //拦截器
    private setInterceptors(instance: AxiosInstance) {
        //请求拦截器
        instance.interceptors.request.use((config) => {

            const token = getLocal('token')
            if (token && config.headers) {
                // config.headers['Access-Control-Expose-Headers'] = 'Authorization'
                config.headers['Authorization'] = token;
            }
            return config
        },err => {
            Toast('请求超时')
            return Promise.reject(err);
    })
        //响应拦截器
        instance.interceptors.response.use((res: any) => {
            if (res.status == 200 ) {
                return Promise.resolve(res.data)
            } else {
                return Promise.reject(res.data)
            }
        }, err => {
                switch (err.response.status) {
                    case 401:
                        Toast('用户信息过期，请重新登录')
                        setTimeout(() => {
                            router.push('/login');
                        }, 1000);
                        break;
                    case 404:
                        Toast({
                            message: '网络请求不存在！',
                            duration: 1500,
                             forbidClick: true,
                        });
                        router.replace({                            
                            path: '/404',                            
                            query: { 
                                redirect: router.currentRoute.value.fullPath
                            }                        
                        });
                        break;
                    case 418:
                        Toast(err.response.data.msg)
                        break;
                    case 500:
                        Toast('服务器被吃了⊙﹏⊙∥')
                        break;
                    default:
                        Toast('未知错误')
                        break;
                }
                return Promise.reject(err);
        })
    }
//封装get请求
    public get(url: string, options?: AxiosRequestConfig) {
        return this.request({
            url: url,
            method: 'get',
            headers: {
                'Content-Type':'application/json; charset=utf-8'
            },
            params: options
        })
    }
//封装post请求
    public post(url: string, options?: AxiosRequestConfig,config?:any) {
        if(config === undefined){
        return this.request({
            url: url,
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: options
        })}else{
            return this.request({
                url:url,
                method: 'post',
                headers: {
                    'Content-Type': config
                },
                data: options
            })
        }
    }
    public put(url: string, options?: AxiosRequestConfig) {
        return this.request({
            url: url,
            method: 'put',
            headers: {
                'Content-Type':'application/json; charset=utf-8'
            },
            data: options
        })
    }
    public delete(url: string, options?: AxiosRequestConfig) {
        return this.request({
            url: url,
            method: 'delete',
            headers: {
                'Content-Type':'application/json; charset=utf-8'
            },
            data: options
        })
    }
}
export const http = new Request()
let o :AxiosResponse