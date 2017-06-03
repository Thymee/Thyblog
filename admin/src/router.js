import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import store from './store'

const routes = [
  {
    path: '/posts',
    component: resolve => require(['@/components/posts'], resolve)
  }, {
    path: '/tags',
    component: resolve => require(['@/components/tags'], resolve)
  }, {
    path: '/login',
    component: resolve => require(['@/components/login'], resolve)
  }, {
    path: '/',
    redirect: '/posts'
  }, {
    path: '/me',
    component: resolve => require(['@/components/me'], resolve)
  }
]

const router = new VueRouter({routes, mode: 'history'})
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    store.state.token.token
      ? next()
      : next('login')
    // next()
  } else {
    if (!store.state.token.token) {
      next()
    } else {
      from.path
        ? next(from.path)
        : next('/posts')
    }
  }
})

export default router
