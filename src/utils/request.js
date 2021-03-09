import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router'

const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/', // 接口的基准路径
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

// 创建一个请求实例，和上面的 request 没有任何关系
const requestToken = axios.create()

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
console.log(router)
// replace 和 push 的差异，replace 不会形成历史记录，登录页一般也不希望形成历史记录
const login = () => {
  console.log(router.currentRoute.fullPath, 888)
  router.replace({
    name: 'login',
    query: {
      // router.currentRoute 就相当于你组件当中使用的 this.$router
      redirect: router.currentRoute.fullPath
    }
  })
}

request.interceptors.response.use(
  function(response) {
    // 处于2xx范围内的任何状态代码都会导致此功能触发
    return response
  },
  async error => {
    const st = error.response.status
    // 常见错误状态码都要进行统一处理
    if (st === 400) {
      Toast.fail('请求参数错误！')
    } else if (st === 401) {
      // TOKEN 过去一定会触发这里

      const user = store.state.user
      if (!user || !user.refresh_token) {
        // !#1 判断 vuex 中的 user 或 user.refresh_token 是否存在，如果有一个不存在，直接跳转到登录页，重新登录去吧
        login()
      } else {
        try {
          // !#2 如果说存在 refresh_token，就请求对应的接口用 refresh_token 换取新的 token
        // 这里不建议用 request 去调用了，万一用 request 调用再出现了 401，就会形成死循环，解决办法就是封装一个新的请求函数
          const { data: { data: { token } } } = await requestToken({
            method: 'PUT',
            url: '/app/v1_0/authorizations',
            headers: {
              Authorization: `Bearer ${user.refresh_token}`
            }
          })
          // !#3 用获取到的新的 token 更新 vuex 和 本地的旧的 token
          user.token = token
          store.commit('setUser', user)
          // !#4 把上次失败的请求重新再发一次（根据新的 token）
          // error.config 里面包含了本次请求的所有信息，其中 headers 当中的 TOKEN 确确实实是一个过期的 TOKEN
          // 但是没有关系，因为你已经再 #3 处把正确的 token 更新到了 vuex 和 本地
          // 而本次请求一定会经过请求拦截器，请求拦截器当中又重新获取了新的 token
          return request(error.config)
        } catch (e) {
          error = e
          // 获取 token 的时候都失败了，只有去登录了
          login()
        }
      }
      // Toast.fail('无效的 TOKEN！')
    } else if (st === 403) {
      Toast.fail('没权限！')
    } else if (st === 404) {
      Toast.fail('资源不存在！')
    } else if (st === 405) {
      Toast.fail('请求方法错误！')
    } else if (st >= 500) {
      Toast.fail('服务器错误！')
    }
    // 任何超出2xx范围的状态码都会触发此函数
    return Promise.reject(error)
  }
)

export default request
