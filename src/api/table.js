import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/xdFriend/list',
    method: 'post',
    data: params
  })
}
export function addFriend(params) {
  return request({
    url: '/xdFriend/add',
    method: 'post',
    data: params
  })
}
export function editFriend(params) {
  return request({
    url: '/xdFriend/edit',
    method: 'post',
    data: params
  })
}
export function detailFriend(id) {
  return request({
    url: '/xdFriend/detail/' + id,
    method: 'get'
  })
}
