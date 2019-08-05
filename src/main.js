import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
import '@/styles/index.less'

import myCom from '@/components'

import axios from '@/api'

Vue.prototype.$http = axios
Vue.use(myCom)
Vue.use(ElementUi)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
