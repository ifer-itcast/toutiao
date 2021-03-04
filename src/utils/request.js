import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router'

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
const requestToken = axios.create()

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

// 响应拦截器
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, async function (error) {
  const status = error.response.status
  if (status === 400) {
    Toast.fail('客户端请求参数错误')
  } else if (status === 401) {
    const { user } = store.state
    if (!user || !user.refresh_token) {
      // 直接去登录吧，没办法了，跳转到登录页面
      // this.$router.push => 组件里面可以这样条
      // router.push('/login')
      // 登录路由其实没有必要，不期望保留历史记录
      // return router.replace('/login')
      // console.log(router, 2333)
      // return false
      return redirectLogin()
    }
    // 用 refresh_token 获取新的 token
    // 直接用现有的 request 去请求，假如请求的结果还是 401，会形成死循环
    // request({})
    try {
      const { data } = await requestToken({
        method: 'PUT',
        url: '/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      user.token = data.data.token
      // 用新的 token 更新 store 里面的无效的 token
      store.commit('setUser', user)
      // 把之前的错误请求重新完整的再发一次
      // 这里发送请求，带过去的 token 确实是无效的 token，但是没关系，因为这个请求会经过自己的请求拦截器
      // 自己请求拦截器里面会有重新获取 token 的操作
      return request(error.config)
    } catch (e) {
      // 用 refresh_token 换取 token 的时候也出错了
      return redirectLogin()
    }
    // Toast.fail('无效的TOKEN')
  } else if (status === 403) {
    Toast.fail('客户端没有权限')
  } else if (status === 404) {
    Toast.fail('请求资源不存在')
  } else if (status === 405) {
    Toast.fail('请求方法不支持')
  } else if (status >= 500) {
    Toast.fail('服务器抽风了')
  }
  // 错误错误
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
