import Vue from 'vue'
import Vuex from 'vuex'
import SocketStore from './modules/SocketStore'
import JobStore from './modules/JobStore'
import UserStore from './modules/UserStore.js'


Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    JobStore,
    SocketStore,
    UserStore
  }
})
