import Vue from 'vue'
import Vuex from 'vuex'
import JobStore from './modules/JobStore'
import UserStore from './modules/UserStore'
import SocketStore from './modules/SocketStore'


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
    UserStore,
    SocketStore
  }
})
