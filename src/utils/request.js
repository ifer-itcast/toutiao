import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router'

const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/', // 接口的基准路径
  transformResponse: [function (data) {
    try {
      return JSONbig.parse(data)
    } catch (err) {
      // 非 JSON 格式的字符串，直接返回即可
      return data
    }
  }]
})

const refreshTokenReq = axios.create()

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

request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, async function (error) {
  const status = error.response.status
  if (status === 400) {
    // 请求参数
    Toast.fail('客户端请求参数错误')
  } else if (status === 401) {
    // token
    const { user } = store.state
    if (!user || !user.token) {
      return redirectLogin()
    }
    try {
      const { data } = await refreshTokenReq({
        method: 'PUT',
        url: '/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      user.token = data.data.token
      store.commit('setUser', user)
      console.dir(error)
      return request(error.config)
    } catch (err) {
      console.log('23333')
      return redirectLogin()
    }
  } else if (status === 403) {
    Toast.fail('权限')
    // 权限
  } else if (status >= 500) {
    // 服务端
    Toast.fail('服务端异常')
  }
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

function redirectLogin() {
  router.replace({
    name: 'login',
    query: {
      // router.currentRoute => this.$route
      redirect: router.currentRoute.fullPath
    }
  })
}

export default request
