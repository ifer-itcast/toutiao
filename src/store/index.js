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
    cacheComponents: ['LayoutIndex']
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 为了防止刷新丢失，需要把数据存储到本地
      // localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
      setItem(TOKEN_KEY, state.user)
    },
    // 传递一个需要删除的组件的名字，'LayoutIndex'
    rmCacheComponents(state, cmp) {
      const idx = state.cacheComponents.indexOf(cmp)
      if (idx !== -1) state.cacheComponents.splice(idx, 1)
    },
    addCacheComponents(state, cmp) {
      if (!state.cacheComponents.includes(cmp)) state.cacheComponents.push(cmp)
    }
  },
  actions: {},
  modules: {}
})
