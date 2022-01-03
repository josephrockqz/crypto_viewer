import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BaseIcon from './components/BaseIcon'
import ExchangeModal from './components/ExchangeModal'
import DateFilter from './filters/date'

Vue.filter('date', DateFilter)

Vue.component('BaseIcon', BaseIcon)
Vue.component('ExchangeModal', ExchangeModal)

Vue.use(BootstrapVue)

Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
