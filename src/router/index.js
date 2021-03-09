import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { Dialog } from 'vant'
import { login } from '@/utils/request'

// 解决报错
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

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
        meta: { requiresAuth: false }
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video'),
        meta: { requiresAuth: true }
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

// 路由导航守卫
// to 去哪里的路由信息
// from 从哪里来的路由信息
// next() 直接放行、next(false)停留在当前页面、next('/article') 跳转到哪里
router.beforeEach(async (to, from, next) => {
  // !#1 如果是 true 代表是需要登录才能访问的
  if (to.meta.requiresAuth) {
    // !#2 看一下有没有登录，说白了看一下 vuex 中的 user 有没有数据
    if (store.state.user) return next()
    // !#3 弹框提示是否需要登录，确定就跳转到登录页，取消就卡在当前页
    const r = await Dialog.confirm({
      title: '提示',
      message: '是否需要登录呢'
    }).catch(e => e)
    if (r === 'confirm') {
      // 点击确定，直接跳转到登录页
      login()
    } else {
      next(false)
    }
  } else {
    // 直接放行
    next()
  }
})
export default router
