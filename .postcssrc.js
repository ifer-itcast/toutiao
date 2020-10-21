module.exports = {
  plugins: {
    // Vue-cli 已经配置了
    // 'autoprefixer': {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      rootValue ({ file }) {
        // file => 要编译的样式的路径
        return file.includes('vant') ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}
