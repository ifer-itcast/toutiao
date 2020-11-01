import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// dayjs 默认语言是中文，这里全局配置为中文
dayjs.locale('zh-cn')

// 定义一个全局过滤器，然后就可以在任何组件的模板中使用了，相当于一个全局的仅供模板使用的方法
// {{表达式|过滤器名称}}
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
// console.log(dayjs().format('YYYY-MM-DD'))
