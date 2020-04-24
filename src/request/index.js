// 请求
import axios from 'axios'
import requestUrl from './requestUrl'
import store from '@/store'
import { MessageBox, Message } from 'element-ui'
import { AesDecrypt, AesEncrypt } from '@/tools/Crypto'

import {
  getUserToken,
  getStoreToken,
  clearCookie
} from '@/tools/Cookie'

const service = axios.create({
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  }
})

if(process.env.NODE_ENV == 'development') {
  // production 代理
  service.defaults.baseURL = '/api/'
}
service.defaults.withcredentials=false
// request interceptor
service.interceptors.request.use(config => {

  config.method = config.method ? config.method : 'get';
  switch (config.method.toLowerCase()) {
    case 'get':
      config.params.source = store.state.requestSource;
      break;
    case 'post':
      config.data.source = store.state.requestSource;
      if (false !== config.secret) config.data = { encrypt: AesEncrypt(JSON.stringify(config.data)) };
      break;
    default:
  };

  if(config.tokenType == 'user') {
    config.headers.token = getUserToken();
  } else {
    config.headers.token = getStoreToken();
  };

  if (config.source === 'base') {
    config.baseURL = requestUrl.baseUrl
  } else if(config.source === 'qiniu') {
    config.baseURL = requestUrl.qiniuUrl
  } else {
    config.baseURL = requestUrl.baseUrl
  };

  return config;
}, error => {
  return Promise.reject(error)
})

// request interceptor
service.interceptors.response.use(response => {
  if (response.status === 200) {
    if (response.data.code >= 10000) {
      MessageBox({
        title: '提示',
        message: response.data.message,
        type: 'error',
        confirmButtonText: '确定',
        callback: action => {
          clearCookie();
          window.location.href = store.state.domainURL + '/#/login';
        }
      });
    } else if (response.data.code !== 0) {
      Message.error(response.data.message);
      return { fail: true };
    } else {
      let resData = response.data.data;
      if (resData && resData.hasOwnProperty('encrypt')) {
        let decodeData = JSON.parse(AesDecrypt(resData.encrypt));
        response.data.data = decodeData;
      };

      return Promise.resolve(response)
    }
  } else {
    return Promise.reject(response)
  }
}, error => {
  Message.error('网络繁忙，请刷新重试！');
  return Promise.reject(error)
})


export default service
