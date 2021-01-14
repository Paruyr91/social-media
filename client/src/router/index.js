import Vue from 'vue'
import VueRouter from 'vue-router'

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
        }
      ]
    }
  ]
})

export default router
