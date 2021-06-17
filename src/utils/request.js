import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router'

const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/', // 接口的基准路径
  // http://toutiao-app.itheima.net/
  baseURL: 'http://localhost:8000', // 接口的基准路径
  transformResponse: [
    function(data) {
      try {
        return JSONbig.parse(data)
      } catch (err) {
        // 非 JSON 格式的字符串，直接返回即可
        return data
      }
    }
  ]
})

const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  error => {
    // 如果请求出错了（还没发出去）
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  function(response) {
    return response
  },
  async function(error) {
    // console.dir(error, 233)
    const status = error.response.status
    if (status === 400) {
      // 客户端参数错误
      Toast.fail('客户端参数错误')
    } else if (status === 401) {
      // token 无效
      // #1 store 中没有 user 或 user.token，直接登录
      const { user } = store.state
      if (!user || !user.token) {
        return redirectLogin()
      }
      // #2 如果 user.refresh_token 存在，则根据此 refresh_token 获取新的 token
      try {
        const { data } = await refreshTokenReq({
          method: 'PUT',
          url: '/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })
        // #3 把新的 token 存储的 store 中
        user.token = data.data.token
        store.commit('setUser', user)
        // #4 把失败的请求重新发出去
        // 原（原来的正确的）、改（手动修改后的）、新（从新获取后的新的）、错 config.headers.token

        // 再次测试：401 请求 => 获取 token 请求 => 再次把失败的请求发出去
        return request(error.config)
      } catch (e) {
        return redirectLogin()
      }
    } else if (status === 403) {
      // 没有权限
      Toast.fail('没有权限')
    } else if (status >= 500) {
      // 服务端抽风了
      Toast.fail('服务端抽风了')
    }
    return Promise.reject(error)
  }
)

function redirectLogin() {
  // console.log(router.currentRoute) // 传递过去 '/article/1324180604236857344'
  // 登录页通过 this.$route.query.redirect 获取到 '/article/1324180604236857344'
  router.replace({
    name: 'login',
    query: {
      // router.currentRoute => this.$route
      redirect: router.currentRoute.fullPath
    }
  })
}

export default request
