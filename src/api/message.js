import request from '@/utils/request'
//获取消息列表
export function getList(params) {
  return request({
    url: '/xdXiaoxi/list',
    method: 'post',
    data: { params }
  })
}
//添加消息列表
export function addMessage(params) {
	return request({
	    url: '/xdXiaoxi/add',
	    method: 'post',
	    data: {params}
	})
}
//编辑消息
export function editMessage(params) {
	return request({
	    url: '/xdXiaoxi/edit',
	    method: 'post',
	    data: params
	})
}
//消息详情
export function detailMessage(id) {
	return request({
	    url: '/xdXiaoxi/detail/'+id,
	    method: 'get'
	})
}
//验真
export function confirmMessage(params) {
	return request({
	    url: '/xdXiaoxi/verify',
	    method: 'post',
	    data: {params}
	})
}
//发布消息
//export function detailMessage(params) {
//return request({
//  url: '/xdXiaoxi/publish/{id}',
//  method: 'get',
//  data: {params}
//})
//}
