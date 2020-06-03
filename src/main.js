import Vue from 'vue'
import vuetify from './plugins/vuetify';
import App from './App.vue'
import router from './router'
import axios from 'axios'

export default axios.create({
  headers: {
    'Accept': 'application/json',
  'Content- Type': 'application/json; charset=UTF-8;'
 }
 })

Vue.config.productionTip = false
Vue.config.devtools = false
export const bus = new Vue();

Vue.prototype.$axios = axios;
var vue = new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

window.vue = vue