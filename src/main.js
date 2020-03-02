import Vue from 'vue'
import App from './App.vue'
import './utils/rem'
import './utils/reset.css'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
