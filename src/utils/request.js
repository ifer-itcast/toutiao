import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 接口的基准路径
  transformResponse: [function (data) {
    try {
      return JSONbig.parse(data)
    } catch (err) {
      // 非 JSON 格式的字符串，直接返回即可
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(config => {
  const {
    user
  } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, error => {
  // 如果请求出错了（还没发出去）
  return Promise.reject(error)
})

export default request
