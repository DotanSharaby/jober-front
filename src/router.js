import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'

import JobPage from './views/JobPage.vue'
import JobDetails from './views/JobDetails.vue'
import JobEdit from './views/JobEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/job',
    name: 'jobPage',
    component: JobPage
  },
  {
    path: '/job/edit/:id?',
    name: 'jobEdit',
    component: JobEdit
  },
  {
    path: '/job/:id',
    name: 'jobDetails',
    component: JobDetails
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
