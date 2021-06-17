module.exports = {
  devServer: {
    proxy: {
      '/app': {
        // target: 'http://toutiao-app.itheima.net/',
        target: 'http://localhost:8000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/app': ''
        }
      }
    }
  }
}
