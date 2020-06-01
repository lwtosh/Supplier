import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: false               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/reg', component: () => import('@/views/user/reg'),hidden: true},
  {path: '/sele', component: () => import('@/views/user/sele'),hidden: true},
  {path: '/forget-login', component: () => import('@/views/user/forget-login'), hidden: true},
  {path: '/sele', component: () => import('@/views/user/sele'), hidden: true},
  {path: '/apply', component: () => import('@/views/apply/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  },
  {
    path: '/info',
    component: Layout,
    redirect: '/info/daseInfo',
    name: 'info',
    meta: {title: '供应商信息', icon: 'product'},
    children: [{
      path: 'daseInfo',
      name: 'daseInfo',
      component: () => import('@/views/info/baseInfo'),
      meta: {title: '供应商基本信息', icon: 'product-list'}
    },
    {
      path: 'contact',
      name: 'contact',
      component: () => import('@/views/info/contact'),
      meta: {title: '供应商成员', icon: 'product-add'}
    },
      {
        path: 'address',
        name: 'address',
        component: () => import('@/views/info/address'),
        meta: {title: '退货地址管理', icon: 'product-add'}
      }
    ]
  },
  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/product',
    name: 'pms',
    alwaysShow: true,
    meta: {title: '商品管理', icon: 'product'},
    children: [{
      path: 'product',
      name: 'product',
      component: () => import('@/views/pms/product/index'),
      meta: {title: '商品列表', icon: 'product-list'}
    },
      {
        path: 'add1',
        name: 'add1',
        component: () => import('@/views/pms/product/add1'),
        meta: {title: '添加豪享拍商品', icon: 'product-add'},
        hidden: true
      },
      {
        path: 'add2',
        name: 'add2',
        component: () => import('@/views/pms/product/add2'),
        meta: {title: '添加食为源商品', icon: 'product-add'},
        hidden: true
      },
      {
        path: 'add3',
        name: 'add3',
        component: () => import('@/views/pms/product/add3'),
        meta: {title: '添加茶为源商品', icon: 'product-add'},
        hidden: true
      },
      {
        path: 'add4',
        name: 'add4',
        component: () => import('@/views/pms/product/add4'),
        meta: {title: '添加豪享购商品', icon: 'product-add'},
        hidden: true
      },
      {
        path: 'updateProduct',
        name: 'updateProduct',
        component: () => import('@/views/pms/product/update'),
        meta: {title: '修改商品', icon: 'product-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/oms',
    component: Layout,
    redirect: '/oms/order',
    name: 'oms',
    meta: {title: '订单管理', icon: 'order'},
    children: [
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/oms/order/index'),
        meta: {title: '订单列表', icon: 'product-list'}
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        component: () => import('@/views/oms/order/orderDetail'),
        meta: {title: '订单详情'},
        hidden:true
      },
      {
        path: 'deliverOrderList',
        name: 'deliverOrderList',
        component: () => import('@/views/oms/order/deliverOrderList'),
        meta: {title: '发货列表'},
        hidden:true
      },
      {
        path: 'returnApply',
        name: 'returnApply',
        component: () => import('@/views/oms/apply/index'),
        meta: {title: '退货申请处理', icon: 'order-return'}
      },
      {
        path: 'returnReason',
        name: 'returnReason',
        component: () => import('@/views/oms/apply/reason'),
        meta: {title: '退货原因设置', icon: 'order-return-reason'}
      },
      {
        path: 'returnApplyDetail',
        name: 'returnApplyDetail',
        component: () => import('@/views/oms/apply/applyDetail'),
        meta: {title: '退货原因详情'},
        hidden:true
      }
    ]
  },
  {
    path: '/financeInfo',
    component: Layout,
    redirect: '/financeInfo/info',
    // name: 'info',
    meta: {title: '财务信息', icon: 'product'},
    children: [{
      path: 'info',
      name: 'info',
      component: () => import('@/views/financeInfo/info'),
      meta: {title: '账户信息', icon: 'product-list'}
    },
    {
      path: 'fundDetails',
      name: 'fundDetails',
      component: () => import('@/views/financeInfo/fundDetails'),
      meta: {title: '资金结算明细', icon: 'product-add'}
    },
      {
        path: 'drawApply',
        name: 'drawApply',
        component: () => import('@/views/financeInfo/drawApply'),
        meta: {title: '提现申请', icon: 'product-add'}
      },
      {
        path: 'changeDetails',
        name: 'changeDetails',
        component: () => import('@/views/financeInfo/changeDetails'),
        meta: {title: '资金变动明细', icon: 'product-add'}
      },
        {
          path: 'applyDetails',
          name: 'applyDetails',
          component: () => import('@/views/financeInfo/applyDetails'),
          meta: {title: '提现明细', icon: 'product-add'}
        }
    ]
  },
  {
    path: '/report',
    component: Layout,
    // redirect: '/financeInfo/info',
    // name: 'info',
    meta: {title: '报表管理', icon: 'product'},
    children: [{
      path: 'sales',
      name: 'sales',
      component: () => import('@/views/report/sales'),
      meta: {title: '商品销售报表', icon: 'product-list'}
    },
    {
      path: 'salesDay',
      name: 'salesDay',
      component: () => import('@/views/report/salesDay'),
      meta: {title: '销售日报表', icon: 'product-add'}
    },
      {
        path: 'SalesMonth',
        name: 'SalesMonth',
        component: () => import('@/views/report/SalesMonth'),
        meta: {title: '销售月报表', icon: 'product-add'}
      },
      {
        path: 'salesYear',
        name: 'salesYear',
        component: () => import('@/views/report/salesYear'),
        meta: {title: '销售年报表', icon: 'product-add'}
      },
        {
          path: 'SalesOrderTrend',
          name: 'SalesOrderTrend',
          component: () => import('@/views/report/SalesOrderTrend'),
          meta: {title: '销售订单走势', icon: 'product-add'}
        },
        {
          path: 'salesAmount',
          name: 'salesAmount',
          component: () => import('@/views/report/salesAmount'),
          meta: {title: '销售金额走势', icon: 'product-add'}
        },
          {
            path: 'salesProportion',
            name: 'salesProportion',
            component: () => import('@/views/report/salesProportion'),
            meta: {title: '商品销售占比', icon: 'product-add'}
          }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  // mode: 'hash',
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

