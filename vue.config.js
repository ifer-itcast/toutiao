module.exports = {
  devServer: {
    proxy: {
      '/app': {
        target: 'http://toutiao-app.itheima.net/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/app': ''
        }
      }
    }
  },
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        lodash: '_',
        vant: 'vant'
      })
      config.plugin('html').tap(args => {
        args[0].isProd = process.env.NODE_ENV === 'production'
        return args
      })
    })
  },
  css: {
    extract: true
  }
}
