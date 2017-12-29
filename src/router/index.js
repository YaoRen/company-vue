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
    path: '/friends',
    component: Layout,
    redirect: '/friends/index',
    children: [
      {
        path: 'index',
        component: _import('friends/index')
      },
      {
        path: 'create',
        component: _import('friends/createFriend')
      },
      {
        path: 'detail/:id',
        component: _import('friends/detailFriend')
      }
    ]
  },
   {
    path: '/message',
    component: Layout,
    name: 'Message',
    redirect: '/message/index',
    meta: { title: '小道消息', icon: 'form' },
    children: [
      {
        path: 'index',
        component: _import('message/index')
      },
      {
        path: 'editContent/:id',
        component: _import('editContent/index')
      },
	  {
        path: 'addContent',
        component: _import('addContent/index')
      },
      {
        path: 'editContact/:id',
        component: _import('editContact/index')
      },
	  {
        path: 'addContact',
        component: _import('addContact/index')
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
 	mode: 'history',
  	scrollBehavior: () => ({
  		y: 0
  	}),
  	routes: constantRouterMap
})

