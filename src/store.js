import Vue from 'vue'
import Vuex from 'vuex'
import JobStore from './modules/Job.Store'
import SocketStore from './modules/Socket.Store'

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
  }
})
