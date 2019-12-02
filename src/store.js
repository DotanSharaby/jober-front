import Vue from 'vue'
import Vuex from 'vuex'
import JobStore from './modules/JobStore'
import UserStore from './modules/UserStore'
import PostStore from './modules/PostStore'


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
    PostStore
  }
})
