let url = {};

// 开发环境
if(process.env.NODE_ENV == 'development') {
  url = {
    baseUrl: 'http://kernel.services.test.xingchen.cn/',
    qiniuUrl: 'https://up.qiniup.com',
    staticUrl: 'https://qiniu.xingchen.cn'
  };
}

// 测试环境
if(process.env.NODE_ENV == 'test') {
  url = {
    baseUrl: 'http://kernel.services.test.xingchen.cn/',
    qiniuUrl: 'https://up.qiniup.com',
    staticUrl: 'https://qiniu.xingchen.cn'
  };
};

// 生产环境
if(process.env.NODE_ENV == 'production') {
  url = {
    baseUrl: 'https://api.services.xingchen.cn',
    qiniuUrl: 'https://up.qiniup.com',
    staticUrl: 'https://qiniu.xingchen.cn'
  };
}

export default url;