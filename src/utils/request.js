import axios from 'axios'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

export default request
