const { defineConfig } = require('@vue/cli-service')
require('events').EventEmitter.defaultMaxListeners = 20; // 将MaxListeners的限制数增加到20
module.exports = defineConfig({
  transpileDependencies: true,
  //开启代理服务器
  devServer: {
    proxy: {
      '/wwy': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
        pathRewrite:{'^/wwy':''}
      }
    }
  }
})
