const state = {
  created: false,
  name: '',
  avatar: null
}

const getters = {
  getName: state => state.name,
  getAvatar: state => state.avatar,
  getCharacter: state => state,
  isCharacterCreated: state => state.created
}

const mutations = {
  'SET_NAME' (state, name) {
    state.name = name
  },
  'SET_AVATAR' (state, avatar) {
    state.avatar = avatar
  },
  'CREATE_CHARACTER' (state, payload) {
    state.name = payload.name
    state.avatar = payload.avatar
    state.created = true
  }
}
const actions = {
  setName ({ commit }, name) {
    commit('SET_NAME', name)
  },
  setAvatar ({ commit }, avatar) {
    commit('SET_AVATAR', avatar)
  },
  createCharacter ({ commit }, payload) {
    commit('CREATE_CHARACTER', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
