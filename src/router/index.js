import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/home.vue')
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login.vue')
  }, {
    path: '/shop',
    name: 'Shop',
    component: () => import('@/views/shop/shop_list.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
