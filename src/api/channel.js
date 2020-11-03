// 频道请求模块
import request from '@/utils/request'

export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
