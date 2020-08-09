const state = {
  loading: false
}

const getters = {
  isLoading: state => state.loading
}

const mutations = {
  'SET_LOADING' (state, isLoading) {
    state.loading = isLoading
  }
}

const actions = {
  startLoading ({ commit }) {
    commit('SET_LOADING', true)
  },
  endLoading ({ commit }) {
    commit('SET_LOADING', false)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
