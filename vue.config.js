const path = require('path');

let config = {
  publicPath: "./",
  outputDir: "dist",
  lintOnSave: false,
  runtimeCompiler: false,
  productionSourceMap: false,

  devServer: {
    host: "0.0.0.0",
    port: 8084,
    https: false,
    disableHostCheck: true
  },

  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/login',
        '/shop'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    }
  }
};

if (process.env.NODE_ENV == 'development') {
  // 开发环境时 跨域代理
  config.devServer.proxy = {
    '/api': {
      target: 'https://www.fastmock.site/mock/bd760dd8ed7013045d3016137fe3801f/api',
      changeOrigin: true,
      ws: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  }
}

module.exports = config;
