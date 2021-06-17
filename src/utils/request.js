import axios from 'axios'

const request = axios.create({
  // 这里不要写
  // baseURL: 'http://ttapi.research.itcast.cn/' // 接口的基准路径
  // baseURL: 'http://toutiao-app.itheima.net/' // 接口的基准路径
})

export default request
