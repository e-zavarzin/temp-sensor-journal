import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from "./helpers/i18n.js"
import Vuesax from 'vuesax'
import _ from 'lodash';

Vue.use(Vuesax);

Object.defineProperty(Vue.prototype, '$_', { value: _ });

i18n.locale = 'en';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
