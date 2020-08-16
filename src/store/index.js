import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import game from './modules/game'
import ui from './modules/ui'
import character from './modules/character'
import log from './modules/log'
import inventory from './modules/inventory'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ui,
    login,
    character,
    game,
    log,
    inventory
  }
})
