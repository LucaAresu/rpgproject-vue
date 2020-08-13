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
    VIT: 1,
    LUCK: 1
  },
  params: {
    ATK: 0,
    MAG: 0,
    DODGE: 0,
    CRIT: 0

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
    state.stats = {
      STR: 1,
      MAG: 1,
      AGI: 1,
      VIT: 1,
      LUCK: 1
    }
    state.level = 1
  },
  'DELETE_CHARACTER' (state) {
    state.created = false
  },
  'RECALCULATE_PARAMS' (state) {
    state.params.ATK = constants.character.paramFormulas.Attacco(state.level, state.stats)
    state.params.MAG = constants.character.paramFormulas.Magia(state.level, state.stats)
    state.params.DODGE = constants.character.paramFormulas.Schivata(state.level, state.stats)
    state.params.CRIT = constants.character.paramFormulas.Critico(state.level, state.stats)

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
  /* payload: {
  stat: str, dex ecc
  points: 1 2 ecc
  */
  'ADD_SINGLE_STAT' (state, payload) {
    state.stats[payload.stat] += payload.points
  },
  'SET_POINTS_TO_ALLOCATE' (state, points) {
    state.statsToAllocate = points
  },
  'ADD_POINTS_TO_ALLOCATE' (state, points) {
    state.statsToAllocate += points
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
  },
  'SPEND_MANA' (state, mana) {
    state.currentMana -= mana
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
    commit('RECALCULATE_PARAMS')
  },
  addStats ({ commit }, payload) {
    commit('SET_POINTS_TO_ALLOCATE', payload.points)
    commit('ADD_STATS', payload.stats)
    commit('RECALCULATE_PARAMS')
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
        commit('RECALCULATE_PARAMS')
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
  /*
  damage: {
    damage: i danni presi
    monster: chi li ha fatti
    message: constants.application.messages
    ability: il nome dell'abilità
  }

   */
  playerTakeDamage ({ commit, dispatch, state }, damage) {
    const dodge = state.params.DODGE * 1
    const roll = (Math.random() * 100).toFixed(2) * 1
    if (roll <= dodge) {
      dispatch('playerDodged', damage)
      return
    }
    commit('TAKE_DAMAGE', damage.damage)
    damage.message = damage.message.damage.replace('{DAMAGE}', damage.damage).replace('{MONSTER}', damage.monster).replace('{ABILITY}', damage.ability)
    dispatch('logAddEntry', {
      message: damage.message,
      type: 'COMBAT',
      action: constants.application.logActions.DAMAGE_RECEIVED
    })
    if (state.currentHp <= 0) {
      dispatch('characterDeath')
    }
  },

  characterDeath ({ commit, getters }) {
    commit('CHANGE_COMBAT_STATUS', true)
    const monster = getters.getMonster
    if (monster) {
      commit('MONSTER_DEATH')
    } else {
      commit('END_COMBAT')
    }
  },
  /*
     damage: {
    damage: i danni presi
    monster: chi li ha fatti
    message: constants.application.messages
    ability: il nome dell'abilità
  }
  */
  playerDodged ({ dispatch }, damage) {
    const message = damage.message.dodge.replace('{MONSTER}', damage.monster).replace('{ABILITY}', damage.ability)
    dispatch('logAddEntry', {
      message,
      type: 'COMBAT',
      action: constants.application.logActions.DODGE
    })
  },

  takeDamageInMap ({ dispatch, state }, payload) {
    const damage = payload.data.fun(state.maxHp)
    const message = payload.data.log.replace('{VALUE}', damage)
    const dodge = state.params.DODGE * 1
    const roll = (Math.random() * 100).toFixed(2) * 1
    if (roll <= dodge) {
      dispatch('playerDodged', {
        ability: 'Trappola',
        message: { dodge: constants.application.messages.dodgeMapDamage }
      })
      dispatch('logAddEntry', {
        message: constants.application.messages.dodgeMapDamage.replace('{ABILITY}', 'Trappola'),
        type: 'MAP',
        action: constants.application.logActions.DODGE
      })
      return
    }
    dispatch('logAddEntry', {
      message,
      type: 'MAP',
      action: constants.application.logActions.DAMAGE_RECEIVED
    })
    dispatch('playerTakeDamage', {
      message: {
        damage: constants.application.messages.takeMapDamage,
        dodge: constants.application.messages.dodgeMapDamage
      },
      monster: 'Trappola',
      damage
    })
  },
  /*
  message: constants.application.messages <
  heal: la quantità della cura
 */
  playerHeal ({ commit, dispatch, state }, heal) {
    if ((heal.heal + state.currentHp) >= state.maxHp) {
      commit('SET_HEALTH', state.maxHp)
    } else {
      commit('HEAL', heal.heal)
    }
    heal.message = heal.message.replace('{HEAL}', heal.heal)
    dispatch('logAddEntry', {
      message: heal.message,
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
    dispatch('playerHeal', {
      heal,
      message: constants.application.messages.mapHeal
    })
    dispatch('logAddEntry', {
      message,
      type: 'MAP',
      action: constants.application.logActions.HEAL
    })
  },
  /*
  actiontype {
    action: ATK MAG ecc, i bottoni
    type: nome dell'attacco tipo TESTATA
    */
  playerAction ({ dispatch }, actionType) {
    switch (actionType.action) {
      case 'ATK': dispatch('attackAction', actionType); break
    }
  },

  attackAction ({ commit, getters, state }, actionType) {
    const monster = getters.getMonster
    const attack = constants.playerattacks[actionType.action][actionType.type]
    const effects = attack.effect

    if (attack.cost.hp) {
      commit('TAKE_DAMAGE', attack.cost.hp)
    }
    if (attack.cost.mana) {
      commit('SPEND_MANA', attack.cost.mana)
    }

    if (effects.monster.damage) {
      const damageDone = effects.monster.damage(state.params, monster)
      if (damageDone >= monster.currentHp * 1) {
        commit('MONSTER_SET_HEALTH', 0)
        commit('MONSTER_DEATH')
      } else {
        commit('MONSTER_TAKE_DAMAGE', damageDone)
      }
    }
    // scrivere log
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
