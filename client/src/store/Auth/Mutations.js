// Mutations

// Vue Router
import router from '@/router/'

export default {
  SuccessLogin (state, payload) {
    const { token, expTime, userInfo } = payload

    // Set payload in store
    state.userToken = token
    state.expTime = expTime
    state.userInfo = userInfo

    // Set payload in local storage
    localStorage.setItem('user-token', token)
    localStorage.setItem('exp-time', expTime)
    localStorage.setItem('user-info', userInfo)

    // Redirect to user page
    // router.push({ name: 'login' }).catch(() => {})
  },
  Logout (state) {
    // Clear from store
    state.userToken = ''
    state.expTime = 0
    state.userInfo = {}

    // Clear from local storage
    localStorage.removeItem('user-token')
    localStorage.removeItem('exp-time')
    localStorage.removeItem('user-info')

    // Redirect to login page
    router.push({ name: 'login' }).catch(() => {})
  }
}
