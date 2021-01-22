import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // Main layout
    {
      path: '/',
      component: () => import('@/layouts/Main.vue')
    },

    // Full Page layout
    {
      path: '/',
      component: () => import('@/layouts/FullPage.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/Auth/Login/Index')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/Auth/Register/Index')
        },
        {
          path: 'verify-account/:token',
          name: 'verify-account',
          component: () => import('@/views/Auth/VerifyAccount/Index')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isRequiredAuth = to.matched.some(route => route.meta.requiredAuth)
  const isAuthenticated = store.getters['Auth/IsAuthenticated']

  if (isRequiredAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
