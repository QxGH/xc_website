import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      roles: [],
    },
    component: () => import('@/views/home/home.vue')
  }, {
    path: '/login',
    name: 'Login',
    meta: {
      roles: [],
    },
    component: () => import('@/views/login/login.vue')
  }, {
    path: '/404',
    name: '404',
    meta: {
      roles: [],
    },
    component: () => import('@/views/login/404.vue')
  }, {
    path: '/platform',
    name: 'Platform',
    meta: {
      roles: [],
    },
    component: () => import('@/views/platform/platform.vue')
  }, {
    path: '/accountManage',
    name: 'AccountManage',
    meta: {
      roles: [],
    },
    component: () => import('@/views/account/account_manage.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
