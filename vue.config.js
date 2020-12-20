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
  }
}
