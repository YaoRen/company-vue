import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index')
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/index',
    name: 'Example',
    meta: { title: '焦小姐的朋友', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: _import('index/index'),
        meta: { title: '焦小姐的朋友', icon: 'table' }
      },
      {
        path: 'table',
        name: 'Table',
        component: _import('table/index'),
        meta: { title: '朋友详情', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: _import('tree/index'),
        meta: { title: '编辑朋友', icon: 'tree' }
      }
    ]
  },
	{
		path: '/message',
		component: Layout,
		meta: { title: '小道消息', icon: 'example' },
		children: [{
				path: 'index',
				name: 'Index',
				component: _import('message/index'),
				meta: {
					title: '小道消息'
				}
			},
			{
				path: 'editContent',
				name: 'EditContent',
				component: _import('editContent/index'),
				meta: {
					title: '编辑消息内容'
				}
			},
			{
				path: 'editContact',
				name: 'EditContact',
				component: _import('editContact/index'),
				meta: {
					title: '编辑联系人信息'
				}
			}
		]
	},
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: _import('form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

