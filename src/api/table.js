import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/xdFriend/detail/1',
    method: 'get',
    params
  })
}
