import Vue from 'vue'

Vue.prototype.$loading = {
  open () {
    console.log('open')
    Vue.prototype.$eventEmitter.$emit('toggle-loading', true)
  },
  close () {
    Vue.prototype.$eventEmitter.$emit('toggle-loading', false)
  }
}
