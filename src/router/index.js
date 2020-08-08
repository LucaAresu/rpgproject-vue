import Vue from 'vue'
import Home from '../views/Home.vue'
import store from '../store/index'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter (to, from, next) {
      if (store.getters.getLogged) {
        next()
      } else {
        next({ name: 'auth' })
      }
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/auth',
    component: () => import('../views/Login.vue'),
    children: [
      {
        path: '/',
        name: 'auth',
        component: () => import('../components/login/Home.vue')
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('../components/login/Login.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('../components/login/Register.vue')
      }
    ]

  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
