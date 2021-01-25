// Actions

import axios from '@/axios/'

export default {
  Login ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        url: '/login',
        data: payload,
        method: 'POST'
      }).then(res => {
        commit('SuccessLogin', res)
        console.log(res)
        resolve(res)
      }).catch(err => {
        commit('Logout')
        reject(err)
      })
    })
  },
  Register ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        url: '/register',
        data: payload,
        method: 'POST'
      }).then(res => {
        // commit('SuccessLogin', res)
        resolve(res.data)
      }).catch(err => {
        reject(err.response.data)
      })
    })
  },
  CheckToken ({ commit }) {
    return new Promise((resolve, reject) => {
      // console.log('a')
      axios({
        url: '/check-token',
        data: {},
        method: 'POST'
      }).then(res => {
        // commit('SuccessLogin', res)
        console.log(res)
        resolve(res)
      }).catch(err => {
        // commit('Logout')
        reject(err)
      })
    })
  },
  VerifyAccount ({ commit }, token) {
    return new Promise((resolve, reject) => {
      axios({
        url: 'user',
        data: { activate: true },
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: 'PATCH'
      }).then(res => resolve(res)).catch(err => reject(err.response.data))
    })
  }
}
