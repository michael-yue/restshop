import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/updatepassword', component: () => import('@/views/login/updatepassword'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    meta: { title: '首页', icon: 'example' },
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      beforeRouteLeave(to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        // 该导航可以通过 next(false) 来取消。
        // 这里提示是英文
        const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
        if (answer) {
          next()
        } else {
        // 不支持传递回调(因为this实例已经创建可以获取到，所以没必要)
          next(false)
        }
      }
    }]
  }
]

export const asyncRouterMap = [
  // 管理员
  {
    path: '/pos',
    component: Layout,
    name: 'pos',
    meta: { title: '收银', icon: 'example', roles: ['admin', 'xzadmin', 'dwadmin'] },
    children: [
      {
        path: 'posindex',
        name: 'posindex',
        component: () => import('@/views/pos/posindex'),
        meta: { title: '收银', icon: 'table', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/report',
    component: Layout,
    name: 'report',
    meta: { title: '统计报表', icon: 'example', roles: ['admin', 'xzadmin', 'dwadmin'] },
    children: [
      {
        path: 'reportScheduleSummary',
        name: 'reportScheduleSummary',
        component: () => import('@/views/report/reportScheduleOrder'),
        meta: { title: '早餐预定统计', icon: 'table', roles: ['admin'] }
      },
      {
        path: 'reportSummary',
        name: 'reportSummary',
        component: () => import('@/views/report/reportSummary'),
        meta: { title: '人员就餐统计', icon: 'table', roles: ['admin'] }
      },
      {
        path: 'reportByPerson',
        name: 'reportByPerson',
        component: () => import('@/views/report/reportByPerson'),
        meta: { title: '明细', icon: 'table', roles: ['admin'] }
      },
    ]
  },
  {
    path: '/bld',
    component: Layout,
    name: 'bld',
    meta: { title: '人员设置', icon: 'example', roles: ['admin'] },
    children: [
      {
        path: 'tables',
        name: 'tables',
        component: () => import('@/views/bld/tables'),
        meta: { title: '桌台', icon: 'table', roles: ['admin'] }
      },
      {
        path: 'bldsale',
        name: 'bldsale',
        component: () => import('@/views/bld/pos'),
        meta: { title: '点餐', icon: 'table', roles: ['admin'] }
      }
    ]
  },
  
  {
    path: '/system',
    component: Layout,
    meta: { title: '系统设置', icon: 'example', roles: ['admin'] },
    children: [
      {
        path: 'PersonApprove',
        name: 'PersonApprove',
        component: () => import('@/views/personsetting/personApproveList'),
        meta: { title: '人员审核', icon: 'table', roles: ['admin'] }
      },
      {
        path: 'UserTypeList',
        name: 'UserTypeList',
        component: () => import('@/views/admin/usertypeList'),
        meta: { title: '用户类型', icon: 'table', roles: ['admin'] }
      },
      {
        path: 'branchList',
        name: 'branchList',
        component: () => import('@/views/admin/BranchList'),
        meta: { title: '单位设置', icon: 'table', roles: ['admin'] }
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
