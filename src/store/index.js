import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import game from './modules/game'
import ui from './modules/ui'
import character from './modules/character'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ui,
    login,
    character,
    game
  }
})
