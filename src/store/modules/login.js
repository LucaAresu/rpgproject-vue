import * as axios from '../../private/axioslogin'
import constants from '../../constants'
import router from '../../router/index'
import axiosSave from 'axios'

const state = {
  logged: false,
  token: null,
  userId: null,
  refreshToken: null,
  error: null,
  alreadyLogged: false
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
  },
  'SET_ALREADY_LOGGED' (state, logged) {
    state.alreadyLogged = logged
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
      dispatch('SET_ALREADY_LOGGED', true)
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
        dispatch('loadGameData')
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
      commit('SET_ALREADY_LOGGED', true)
    })
  },

  refreshLogin ({ commit, dispatch, state }, refreshToken) {
    axios.refresh.post('', {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }).then(async resp => {
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
        if (!state.alreadyLogged) {
          await dispatch('loadGameData')
        }
      } else {
        dispatch('endLoading')
      }
    }).catch(() => {
      dispatch('endLoading')
    })
  },
  clearLoginErrors ({ commit }) {
    commit('CLEAR_ERROR')
  },

  logout ({ commit }) {
    commit('LOGOUT')
  },
  saveGameData ({ getters, rootState }) {
    // eslint-disable-next-line no-unreachable
    const saveUrl = getters.getUserId + '/save.json?auth=' + getters.getToken
    axiosSave.put(saveUrl, rootState)
  },

  loadGameData ({ commit, getters, dispatch }) {
    const loadUrl = getters.getUserId + '/save.json?auth=' + getters.getToken
    axiosSave.get(loadUrl).then(data => {
      if (data.data) {
        commit('SET_CHARACTER_CREATED')
        commit('SET_ALL_CHARACTER_DATA', data.data.character)
        commit('SET_ALL_GAME_DATA', data.data.game)
        commit('SET_ALL_INVENTORY_DATA', data.data.inventory)
        dispatch('saveBackupData')
      }
      dispatch('endLoading')
    }).catch()
  },

  saveBackupData ({ getters, rootState }) {
    const saveUrl = getters.getUserId + '/backup.json?auth=' + getters.getToken
    axiosSave.post(saveUrl, rootState)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
