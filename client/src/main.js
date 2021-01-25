import Vue from 'vue'
import App from './App.vue'

// Styles: SCSS
import './assets/scss/main.scss'

// Globally Registered Components
import './utils/GlobalComponents'

// VeeValidate
import VeeValidate from 'vee-validate'

// Vue Router
import router from './router'

// Vuex store
import store from './store'

Vue.use(VeeValidate)

Vue.prototype.$eventEmitter = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
