import Vue from 'vue'

import components from '../components/'

const RegisterComponent = component => Vue.component(component.name, component)

if (components.length) {
  components.forEach(RegisterComponent)
}
