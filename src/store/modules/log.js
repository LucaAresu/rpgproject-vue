const state = {
  log: []
}

const getters = {
  getLog: state => state.log,
  getMapLog: state => state.log.filter(ele => ele.type === 'MAP').slice(0, 5)
}

const mutations = {
  'LOG_ADD_ENTRY' (state, entry) {
    state.log.unshift(entry)
  }
}

const actions = {
  logAddEntry ({ commit }, entry) {
    entry = { ...entry, id: Date.now() + ' ' + Math.random() }
    commit('LOG_ADD_ENTRY', entry)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
