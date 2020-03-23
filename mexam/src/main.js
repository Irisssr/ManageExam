import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

//axios
import apis from './axios/apis'
Vue.prototype.$api = apis;

import axios from 'axios'
Vue.prototype.$axios = axios;
//excel
import './excel/Blob'
import './excel/Export2Excel'
// Elementment-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
