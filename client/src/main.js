// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './routes'

import'./assets/css/font-awesome.min.css'
import 'simplemde/dist/simplemde.min.css'

import './stylus/global.styl'
import 'github-markdown-css'
/* eslint-disable no-new */
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || {
      x: 0,
      y: 0
    }
  }
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
