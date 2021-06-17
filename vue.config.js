module.exports = {
  devServer: {
    proxy: {
      '/app': {
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
