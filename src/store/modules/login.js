import * as axios from '../../private/axioslogin'
import constants from '../../constants'
import router from '../../router/index'

const state = {
  logged: false,
  token: null,
  userId: null,
  refreshToken: null,
  error: null
}

const getters = {
  getLogged: state => state.logged,
  getToken: state => state.token,
  getUserId: state => state.userId,
  getError: state => state.error,
  getRefreshToken: state => state.refreshToken,
  getExpiresIn: state => state.expiresIn
}

const mutations = {
  'LOGIN_AUTH' (state, data) {
    state.logged = true
    state.token = data.token
    state.userId = data.id
    state.error = null
    state.refreshToken = data.refreshToken
    localStorage.setItem('refresh_token', data.refreshToken)
    const currentRoute = router.currentRoute.name
    if (currentRoute === 'auth' || currentRoute === 'Login' || currentRoute === 'Register') {
      router.push({ name: 'Home' })
    }
  },
  'LOGIN_ERROR' (state, error) {
    state.error = error
  },
  'CLEAR_ERROR' (state) {
    state.error = null
  },
  'LOGOUT' (state) {
    state.logged = false
    state.token = null
    state.userId = null
    state.error = null
    state.refreshToken = null
    localStorage.removeItem('refresh_token')
    router.push({ name: 'auth' })
  }
}

const actions = {

  register ({ commit, dispatch }, data) {
    dispatch('startLoading')
    axios.registration.post('', {
      email: data.email,
      password: data.password,
      returnSecureToken: true
    }).then(resp => {
      const token = resp.data.idToken
      const userId = resp.data.localId
      const refreshToken = resp.data.refreshToken
      const expiresIn = resp.data.expiresIn
      if (token && userId) {
        commit('LOGIN_AUTH', {
          token,
          id: userId,
          refreshToken,
          expiresIn
        })
        setTimeout(() => dispatch('refreshLogin', refreshToken), (expiresIn - 1) * 1000)
        dispatch('endLoading')
      } else {
        commit('LOGIN_ERROR', constants.errors.RISPOSTA_INVALIDA)
        dispatch('endLoading')
      }
    }).catch(err => {
      const error = err.response.data.error
      let [errorCode, errorMessage] = error.message.split(':').map(ele => ele.trim())
      if (typeof errorMessage === 'undefined') {
        errorMessage = constants.errors[errorCode] ? constants.errors[errorCode] : errorCode
      }
      commit('LOGIN_ERROR', errorMessage)
      dispatch('endLoading')
    })
  },

  login ({ commit, dispatch }, data) {
    dispatch('startLoading')
    axios.login.post('', {
      email: data.email,
      password: data.password,
      returnSecureToken: true
    }).then(resp => {
      const token = resp.data.idToken
      const userId = resp.data.localId
      const refreshToken = resp.data.refreshToken
      const expiresIn = resp.data.expiresIn
      if (token && userId) {
        commit('LOGIN_AUTH', {
          token,
          id: userId,
          refreshToken,
          expiresIn
        })
        setTimeout(() => dispatch('refreshLogin', refreshToken), (expiresIn - 1) * 1000)
        dispatch('endLoading')
      } else {
        commit('LOGIN_ERROR', constants.errors.RISPOSTA_INVALIDA)
        dispatch('endLoading')
      }
    }).catch(err => {
      const error = err.response.data.error
      let [errorCode, errorMessage] = error.message.split(':').map(ele => ele.trim())
      if (typeof errorMessage === 'undefined') {
        errorMessage = constants.errors[errorCode] ? constants.errors[errorCode] : errorCode
      }
      commit('LOGIN_ERROR', errorMessage)
      dispatch('endLoading')
    })
  },

  refreshLogin ({ commit, dispatch }, refreshToken) {
    axios.refresh.post('', {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }).then(resp => {
      const token = resp.data.id_token
      const userId = resp.data.user_id
      const refreshToken = resp.data.refresh_token
      const expiresIn = resp.data.expires_in
      if (token && userId) {
        commit('LOGIN_AUTH', {
          token,
          id: userId,
          refreshToken,
          expiresIn
        })
        setTimeout(() => dispatch('refreshLogin', refreshToken), (expiresIn - 1) * 1000)
      }
      dispatch('endLoading')
    }).catch(() => {
      dispatch('endLoading')
    })
  },
  clearLoginErrors ({ commit }) {
    commit('CLEAR_ERROR')
  },

  logout ({ commit }) {
    commit('LOGOUT')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}