import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    character: {
      created: false,
      name: '',
      avatar: null
    },
    loading: false
  },
  getters: {
    getName: state => state.character.name,
    getAvatar: state => state.character.avatar,
    getCharacter: state => state.character,
    isCharacterCreated: state => state.character.created,
    isLoading: state => state.loading
  },
  mutations: {
    'SET_NAME' (state, name) {
      state.character.name = name
    },
    'SET_AVATAR' (state, avatar) {
      state.character.avatar = avatar
    },
    'CREATE_CHARACTER' (state, payload) {
      state.character = { ...payload }
      state.character.created = true
    },
    'SET_LOADING' (state, isLoading) {
      state.loading = isLoading
    }
  },
  actions: {
    setName ({ commit }, name) {
      commit('SET_NAME', name)
    },
    setAvatar ({ commit }, avatar) {
      commit('SET_AVATAR', avatar)
    },
    createCharacter ({ commit }, payload) {
      commit('CREATE_CHARACTER', payload)
    },
    startLoading ({ commit, state }) {
      commit('SET_LOADING', true)
    },
    endLoading ({ commit }) {
      commit('SET_LOADING', false)
    }
  },
  modules: {
    login
  }
})
