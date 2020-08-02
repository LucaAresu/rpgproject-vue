import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    character: {
      created: false,
      name: '',
      avatar: null,
    }
  },
  getters: {
    getName: state => state.character.name,
    getAvatar: state => state.character.avatar,
    getCharacter: state => state.character,
    isCharacterCreated: state => state.character.created,
  },
  mutations: {
    'SET_NAME'(state, name) {
      state.character.name = name
    },
    'SET_AVATAR'(state, avatar) {
      state.character.avatar = avatar;
    },
    'CREATE_CHARACTER'(state, payload) {
      state.character = { ...payload };
      state.character.created = true;
    }
  },
  actions: {
    setName({ commit }, name) {
      commit('SET_NAME', name);
    },
    setAvatar({ commit }, avatar) {
      commit('SET_AVATAR', avatar);
    },
    createCharacter({ commit }, payload) {
      commit('CREATE_CHARACTER', payload);
    }
  },
  modules: {
  }
})
