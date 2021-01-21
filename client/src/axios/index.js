import axios from 'axios'
import store from '../store/'

const token = localStorage.getItem('user-token')
const baseURL = `${process.env.VUE_APP_BASE_URL}/api/v1/`

const SetToken = () => {
  return new Promise(resolve => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
    resolve()
  })
}

if (token) {
  SetToken(token).then(() => {
    store.dispatch('Auth/CheckToken').catch(() => {
      store.commit('Auth/Logout')
    })
  })
}
const instance = axios.create({
  baseURL
  // headers
})

instance.interceptors.response.use(undefined, err => {
  return new Promise(() => {
    if (err.response.status === 401) {
      store.commit('Auth/Logout')
    }
    throw err
  })
})

export default instance
