import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // 存储当前登录用户信息（token等数据）
    // user: null
    // user: JSON.parse(localStorage.getItem(TOKEN_KEY))
    user: getItem(TOKEN_KEY),
    cachePages: ['LayoutIndex']
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 为了防止刷新丢失，需要把数据存储到本地
      // localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
      setItem(TOKEN_KEY, state.user)
    },
    // 添加缓存页面
    addCachePage(state, pageName) {
      if (!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },
    // 移除缓存页面
    removeCachePage(state, pageName) {
      const idx = state.cachePages.indexOf(pageName)
      if (idx !== -1) {
        // console.log(this.state.cachePages === state.cachePages)
        state.cachePages.splice(idx, 1)
      }
    }
  }
})
