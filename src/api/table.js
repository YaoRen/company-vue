import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/xdFriend/list',
    method: 'post',
    params: { params }
  })
}
export function addFriend(params) {
  return request({
    url: '/xdFriend/add',
    method: 'post',
    params: { params }
  })
}
export function editFriend(params) {
  return request({
    url: '/xdFriend/edit',
    method: 'post',
    params: { params }
  })
}
export function detailFriend(params) {
  return request({
    url: '/xdFriend/edit',
    method: 'get',
    params
  })
}
