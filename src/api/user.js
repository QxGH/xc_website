import request from '@/request/index';

const user = {
  register(formData) {
    // 分类详情
    return request({
      url: `business/register`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  sendRegisterCode(formData) {
    // 分类详情
    return request({
      url: `business/register/smsCodeSend`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  login(formData) {
    return request({
      url: `business/login`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  sendLoginCode(formData) {
    // 分类详情
    return request({
      url: `business/login/smsCodeSend`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  sendRePwdCode(formData) {
    // 分类详情
    return request({
      url: `business/login/forgetPasswordSmsCodeSend`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  resetPassword(formData) {
    // 分类详情
    return request({
      url: `business/login/forgetPassword`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  getShopList() {
    return request({
      url: `/getShopList`,
      method: 'post',
      source: 'base'
    });
  },
  getStoreInfo() {
    return request({
      url: `/getStoreInfo`,
      method: 'post',
      source: 'base'
    });
  },
  // getToken() {
  //   return request({
  //     url: `${requestUrl.baseUrl}/getToken`,
  //     method: 'post',
  //     source: 'base'
  //   });
  // },
  // getRoles() {
  //   return request({
  //     url: `${requestUrl.baseUrl}/getRoles`,
  //     method: 'post',
  //     source: 'base'
  //   });
  // },
  // getUserInfo(){
  //   return request({
  //     url: `${requestUrl.baseUrl}/getUserInfo`,
  //     method: 'post',
  //     source: 'base'
  //   });
  // }
}

export default user;