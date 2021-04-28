import Vue from 'vue'
import Vuex from'vuex'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Vuex)

import { storeConfig } from './store'



new Vue({
  store: new Vuex.Store(storeConfig),
  render: h => h(App),
}).$mount('#app')
