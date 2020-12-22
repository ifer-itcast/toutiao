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
    addCachePage(state, page) {
      // 添加需要缓存的组件
      if (!state.cachePages.includes(page)) {
        state.cachePages.push(page)
      }
    },
    removeCachePage(state, page) {
      // 删除需要缓存的组件
      const idx = state.cachePages.indexOf(page)
      if (idx !== -1) state.cachePages.splice(page, 1)
    }
  },
  actions: {},
  modules: {}
})
