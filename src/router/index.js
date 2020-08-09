import Vue from 'vue'
import Home from '../views/Home.vue'
import store from '../store/index'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const requiredLogin = next => {
  if (store.getters.getLogged) {
    next()
  } else {
    next({ name: 'auth' })
  }
}
const requiredUnlogged = next => {
  if (!store.getters.getLogged) {
    next()
  } else {
    next({ name: 'Home' })
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter (to, from, next) {
      requiredLogin(next)
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
        component: () => import('../components/login/Home.vue'),
        beforeEnter (to, from, next) {
          requiredUnlogged(next)
        }
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('../components/login/Login.vue'),
        beforeEnter (to, from, next) {
          requiredUnlogged(next)
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('../components/login/Register.vue'),
        beforeEnter (to, from, next) {
          requiredUnlogged(next)
        }
      }
    ]
  },

  {
    path: '/options',
    name: 'Options',
    component: () => import('../views/Options.vue'),
    beforeEnter (to, from, next) {
      requiredLogin(next)
    }
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
