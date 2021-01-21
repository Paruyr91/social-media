import Vue from 'vue'
import Vuex from 'vuex'

// Import modules
import General from './General/'
import Auth from './Auth/'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    // modules
    General,
    Auth
  }
})
