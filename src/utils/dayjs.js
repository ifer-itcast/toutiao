import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
// dayjs 默认语言是中文，这里全局配置为中文
dayjs.locale('zh-cn')

console.log(dayjs().format('YYYY-MM-DD'))
