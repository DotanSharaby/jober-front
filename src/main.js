import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "./styles/global.scss"

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPaw, faBus, faUtensils, faParking, faMugHot, faThumbsUp, faReply, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faPaw, faBus, faUtensils, faParking, faMugHot, faThumbsUp, faReply, faCheck)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
