import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    // name: 'layout', // 拥有默认子路由时，此 name 没有意义
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // 默认子路由，只能有一个
        name: 'home',
        component: () => import('@/views/home'),
        meta: { requiresAuth: false }
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa'),
        meta: { requiresAuth: true } // 测试
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video'),
        meta: { requiresAuth: false }
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my'),
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search'),
    meta: { requiresAuth: false }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true, // 开启 props 传参，把路由参数映射到组件的 props 数据中
    meta: { requiresAuth: false }
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile'),
    meta: { requiresAuth: false }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  // #1 判断路由是否是需要登录才能访问的
  if (to.meta.requiresAuth) {
    // #2 如果是则检测登录状态
    // #2.1 有登录信息直接放行
    if (store.state.user) {
      return next()
    }
    // #2.2 没有登录信息提示是否登录
    const r = await Dialog.confirm({
      title: '访问提示',
      message: '需要登录才能访问，确认登录？'
    }).then(r => r).catch(e => e)
    // #3 点击了确定则跳转到登录页
    if (r === 'confirm') {
      router.replace({
        name: 'login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    } else if (r === 'cancel') {
      // #4 点击了取消，则终止下一步，停在当前界面
      next(false)
    }
  } else {
    // 不需要登录权限的，直接放行
    next()
  }
})

export default router
