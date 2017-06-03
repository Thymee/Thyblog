import Vue from 'vue'
import Vuex from 'vuex'
import drafts from './modules/drafts.js'
import token from './modules/token.js'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {},
  getters: {},
  modules: {
    drafts,
    token
  },
  strict: process.env.NODE_ENV !== 'production'
})
