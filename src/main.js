import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// Vant 的样式
import 'vant/lib/index.css'
// 全局样式
import './styles/index.less'
// 动态设置根元素字体大小
import 'amfe-flexible'

// 加载 dayjs 的配置
import './utils/dayjs'

Vue.use(Vant)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
