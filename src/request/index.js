// 请求
import axios from 'axios'
import requestUrl from './requestUrl'
import store from 'store'
import { Alert, Message } from 'element-ui'

// import {
//   getUserToken,
//   getStoreToken,
//   clearCookie
// } from 'tools/Cookie'

const service = axios.create({
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  }
})

if(process.env.NODE_ENV == 'development') {
  // production 代理
  instance.defaults.baseURL = '/api/'
};

// request interceptor
service.interceptors.request.use(config => {

  // if(config.tokenType == 'user') {
  //   config.headers.token = getUserToken();
  // } else {
  //   config.headers.token = getStoreToken();
  // };

  // if (config.source === 'base') {
  //   config.baseURL = requestUrl.baseUrl
  // } else if(config.source === 'qiniu') {
  //   config.baseURL = requestUrl.qiniuUrl
  // } else {
  //   config.baseURL = requestUrl.baseUrl
  // };

  config.baseURL = requestUrl.baseUrl
  return config;
}, error => {
  return Promise.reject(error)
})

// request interceptor
service.interceptors.response.use(response => {
  if(response.status === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}, error => {
  Message.error('网络繁忙，请刷新重试！');
  return Promise.reject(error)
})

export default service
