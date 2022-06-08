const proxyObj = {}
proxyObj['/'] = {
  // 代理的目标地址
  target: 'http://localhost:8080',

  // 配置跨域
  changeOrigin: true,
  // 不重写请求地址
  pathReWrite: {
    '^/': '/'
  }
}
module.exports = {
  devServer: {
    host: 'localhost',
    port: 8081,
    proxy: proxyObj
  }
}
