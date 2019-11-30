import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "./styles/global.scss"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPaw, faBus, faUtensils, faParking, faMugHot, faThumbsUp, faReply } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faPaw, faBus, faUtensils, faParking, faMugHot, faThumbsUp, faReply)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
