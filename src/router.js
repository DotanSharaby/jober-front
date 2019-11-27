import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
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
    path: '/job',
    name: 'jobPage',
    component: JobPage
  },
  {
    path: '/job/:id',
    name: 'jobDetails',
    component: JobDetails
  },
  {
    path: '/job/edit/:id?',
    name: 'jobEdit',
    component: JobEdit
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
