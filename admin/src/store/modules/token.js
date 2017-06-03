import * as types from '../mutation-types'
import api from '../../api'
import router from '../../router'
const sessionStorage = global.sessionStorage
const getters = {
  token: state => state.token
}

const state = {
  token: sessionStorage.getItem('token')
}

const mutations = {
  [types.TOKEN_CREATE] (state, token) {
    state.token = token
    sessionStorage.setItem('token', token)
  },
  [types.TOKEN_DELETE] (state, token) {
    sessionStorage.removeItem('token')
    state.token = null
  }
}

const actions = {
  async createToken (store, {username, password}) {
    const res = await api.createToken(username, password)
    if (res.success) {
      store.commit(types.TOKEN_CREATE, res.data.token)
      router.replace('posts')
    }
  },
  deleteToken (store) {
    store.commit(types.TOKEN_DELETE)
    router.replace('login')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
