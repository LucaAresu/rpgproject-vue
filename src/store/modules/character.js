import constants from '../../constants'
const state = {
  created: false,
  name: '',
  avatar: null,
  level: 1,
  exp: 0,
  currentHp: 0,
  maxHp: 0,
  currentMana: 0,
  maxMana: 0,
  statsToAllocate: 0,
  stats: {
    STR: 1,
    MAG: 1,
    AGI: 1,
    STAM: 1,
    VIT: 1,
    LUCK: 1
  }
}

const getters = {
  getName: state => state.name,
  getAvatar: state => state.avatar,
  getCharacter: state => state,
  isCharacterCreated: state => state.created,
  getCurrentExp: state => state.exp,
  getStatsToAllocate: state => state.statsToAllocate,
  getStats: state => state.stats,
  getSingleStat: state => stat => state.stats[stat],
  getCharacterLevel: state => state.level,
  getCurrentHp: state => state.currentHp,
  getMaxHp: state => state.maxHp,
  getCurrentMana: state => state.currentMana,
  getMaxMana: state => state.maxMana,
  getExpRequired: state => constants.character.exp.base,
  getExpThisLevel: state => state.exp % constants.character.exp.base
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
    state.statsToAllocate = constants.character.stats.base + (state.level * constants.character.stats.perLevel)
    state.currentHp = constants.character.paramFormulas.HP(state.level, state.stats)
    state.maxHp = constants.character.paramFormulas.HP(state.level, state.stats)
    state.currentMana = constants.character.paramFormulas.Mana(state.level, state.stats)
    state.maxMana = constants.character.paramFormulas.Mana(state.level, state.stats)
  },
  'ADD_STATS' (state, newstats) {
    state.stats = Object.keys(state.stats).map(ele => ({ [ele]: state.stats[ele] + newstats[ele] })).reduce((acc, ele) => ({ ...acc, ...ele }), {})
    // calculate new mana
    const manaPercentage = Math.round(state.currentMana * 100 / state.maxMana)
    const newMana = constants.character.paramFormulas.Mana(state.level, state.stats)
    state.maxMana = newMana
    state.currentMana = Math.round(newMana * manaPercentage / 100)
    // calculate new hp
    const hpPercentage = Math.round(state.currentHp * 100 / state.maxHp)
    const newHp = constants.character.paramFormulas.HP(state.level, state.stats)
    state.maxHp = newHp
    state.currentHp = Math.round(newHp * hpPercentage / 100)
  },
  'SET_POINTS_TO_ALLOCATE' (state, points) {
    state.statsToAllocate = points
  },
  'ADD_EXP' (state, exp) {
    state.exp += exp
  },
  'ADD_LEVEL' (state) {
    state.level++
    state.statsToAllocate += constants.character.stats.perLevel
    const newHp = constants.character.paramFormulas.HP(state.level, state.stats)
    state.currentHp = newHp
    state.maxHp = newHp
    const newMana = constants.character.paramFormulas.Mana(state.level, state.stats)
    state.currentMana = newMana
    state.maxMana = newMana
  },
  'TAKE_DAMAGE' (state, damage) {
    state.currentHp -= damage
  },
  'HEAL' (state, heal) {
    state.currentHp += heal
  },
  'SET_HEALTH' (state, newHealth) {
    state.currentHp = newHealth
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
  },
  addStats ({ commit }, payload) {
    commit('SET_POINTS_TO_ALLOCATE', payload.points)
    commit('ADD_STATS', payload.stats)
  },
  addExp ({ commit, getters, dispatch }, exp) {
    // uso un ciclo perchè l'assegnazione di exp potrebbe non essere linare, e quindi successivamente non risolvibile con una semplice divisione
    while (exp > 0) {
      const expRequiredToNextLevel = getters.getExpRequired
      const currentExpInLevel = getters.getExpThisLevel
      if ((currentExpInLevel + exp) >= expRequiredToNextLevel) {
        exp -= expRequiredToNextLevel
        commit('ADD_EXP', exp)
        commit('ADD_LEVEL')
        const levelMessage = constants.character.strings.nextLevel.replace('{LEVEL}', getters.getCharacterLevel)
        dispatch('logAddEntry', {
          message: levelMessage,
          type: 'MAP',
          action: constants.application.logActions.LEVEL_UP
        })
      } else {
        commit('ADD_EXP', exp)
        exp = 0
      }
    }
  },
  addExpInMap ({ dispatch }, payload) {
    if (payload.clicked) {
      return
    }
    const exp = payload.data.fun()
    const str = payload.data.log.replace('{VALUE}', exp)
    dispatch('logAddEntry', {
      message: str,
      type: 'MAP',
      action: constants.application.logActions.EXPERIENCE
    })
    dispatch('addExp', exp)
  },

  takeDamage ({ commit, dispatch, state }, damage) {
    commit('TAKE_DAMAGE', damage.damage)
    const message = constants.application.messages.takeDamage.replace('{DAMAGE}', damage.damage).replace('{ENTITY}', damage.entity)
    dispatch('logAddEntry', {
      message,
      type: 'COMBAT',
      action: constants.application.logActions.DAMAGE_RECEIVED
    })
    // TODO FARE COSA PER LA MORTE
  },
  takeDamageInMap ({ dispatch, state }, payload) {
    const damage = payload.data.fun(state.maxHp)
    const message = payload.data.log.replace('{VALUE}', damage)
    dispatch('logAddEntry', {
      message,
      type: 'MAP',
      action: constants.application.logActions.DAMAGE_RECEIVED
    })
    dispatch('takeDamage', {
      entity: 'Trappola',
      damage
    })
  },

  heal ({ commit, dispatch, state }, heal) {
    if ((heal + state.currentHp) >= state.maxHp) {
      commit('SET_HEALTH', state.maxHp)
    } else {
      commit('HEAL', heal)
    }
    const message = constants.application.messages.heal.replace('{HEAL}', heal)
    dispatch('logAddEntry', {
      message,
      type: 'COMBAT',
      action: constants.application.logActions.HEAL
    })
  },

  takeHealInMap ({ dispatch, state }, payload) {
    if (payload.clicked) {
      return
    }
    const heal = payload.data.fun(state.maxHp)
    const message = payload.data.log.replace('{VALUE}', heal)
    dispatch('heal', heal)
    dispatch('logAddEntry', {
      message,
      type: 'MAP',
      action: constants.application.logActions.HEAL
    })
  }

}

export default {
  state,
  getters,
  mutations,
  actions
}
