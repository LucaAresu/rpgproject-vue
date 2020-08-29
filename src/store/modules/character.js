import constants from '../../constants'
const state = {
  created: false,
  name: '',
  class: '',
  avatar: null,
  level: 1,
  isInBerserk: false,
  exp: 0,
  currentHp: 0,
  maxHp: 0,
  currentMana: 0,
  maxMana: 0,
  statsToAllocate: 0,
  talentsToAllocate: 0,
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

  },
  isDefending: 0,
  buff: {},
  debuff: {
    ...Object.keys(constants.debuff).map(ele => ({ [ele]: 0 })).reduce((acc, ele) => ({ ...acc, ...ele }))
  },
  talents: Object.keys(constants.talents).map(ele => ({
    [ele]: Object.keys(constants.talents[ele].talents).map(ele => (
      { [ele]: 0 })).reduce((acc, ele) => ({ ...acc, ...ele }), {})
  })).reduce((acc, ele) => ({ ...acc, ...ele }))

}

const getters = {
  getName: state => state.name,
  getAvatar: state => state.avatar,
  getClass: state => state.class,
  getCharacter: state => state,
  isCharacterCreated: state => state.created,
  getCurrentExp: state => state.exp,
  getStatsToAllocate: state => state.statsToAllocate,
  getTalentsToAllocate: state => state.talentsToAllocate,
  getIsInBerserk: state => state.isInBerserk,
  getStats: (state, getters) => {
    const currentStats = state.stats
    const equippedStats = getters.getEquippedStats
    return Object.keys(currentStats).map(ele => ({ [ele]: currentStats[ele] + equippedStats[ele] })).reduce((acc, ele) => ({ ...acc, ...ele }), {})
  },
  getTalents: state => state.talents,
  getSingleStat: (state, getters) => stat => getters.getStats[stat],
  getCharacterLevel: state => state.level,
  getCurrentHp: state => state.currentHp,
  getMaxHp: state => state.maxHp,
  getCurrentMana: state => state.currentMana,
  getMaxMana: state => state.maxMana,
  getExpRequired: state => constants.character.exp.base,
  getExpThisLevel: state => state.exp % constants.character.exp.base,
  getActivePlayerDebuff: state => Object.keys(state.debuff).map(ele => ({ name: ele, value: state.debuff[ele] })).filter(ele => ele.value),
  getPlayerDebuff: state => state.debuff,
  characterIsDefending: state => state.isDefending
}

const mutations = {
  'SET_ALL_CHARACTER_DATA' (state, data) {
    state.created = data.created
    state.avatar = data.avatar
    state.class = data.class
    state.currentHp = data.currentHp
    state.currentMana = data.currentMana
    state.debuff = { ...data.debuff }
    state.exp = data.exp
    state.isDefending = data.isDefending
    state.level = data.level
    state.maxHp = data.maxHp
    state.maxMana = data.maxMana
    state.name = data.name
    state.params = { ...data.params }
    state.stats = { ...data.stats }
    state.statsToAllocate = data.statsToAllocate
    state.talentsToAllocate = data.talentsToAllocate
  },
  'SET_CHARACTER_CREATED' (state) {
    state.created = true
  },
  'SET_NAME' (state, name) {
    state.name = name
  },
  'SET_AVATAR' (state, avatar) {
    state.avatar = avatar
  },
  'CREATE_CHARACTER' (state, payload) {
    state.name = payload.name
    state.avatar = payload.avatar
    state.class = payload.class
    state.created = true
    state.statsToAllocate = constants.character.stats.base + (state.level * constants.character.stats.perLevel)
    state.currentHp = constants.character.paramFormulas.HP(state.level, state.stats, state)
    state.maxHp = constants.character.paramFormulas.HP(state.level, state.stats, state)
    const mana = constants.character.paramFormulas.Mana(state.level, state.stats, state)
    state.currentMana = mana
    state.maxMana = mana
    state.talentsToAllocate = constants.character.baseTalents
    state.stats = {
      STR: 1,
      MAG: 1,
      AGI: 1,
      VIT: 1,
      LUCK: 1
    }
    state.level = 1
    state.buff = {}
    state.debuff = {
      ...Object.keys(constants.debuff).map(ele => ({ [ele]: 0 })).reduce((acc, ele) => ({ ...acc, ...ele }))
    }
    state.talents = Object.keys(constants.talents).map(ele => ({
      [ele]: Object.keys(constants.talents[ele].talents).map(ele => (
        { [ele]: 0 })).reduce((acc, ele) => ({ ...acc, ...ele }), {})
    })).reduce((acc, ele) => ({ ...acc, ...ele }))
  },
  'DELETE_CHARACTER' (state) {
    state.created = false
  },
  'RECALCULATE_PARAMS' (state, stats) {
    state.params.ATK = constants.character.paramFormulas.Attacco(state.level, stats, state)
    state.params.MAG = constants.character.paramFormulas.Magia(state.level, stats, state)
    state.params.DODGE = constants.character.paramFormulas.Schivata(state.level, stats, state)
    state.params.CRIT = constants.character.paramFormulas.Critico(state.level, stats, state)

    // calculate new mana
    const manaPercentage = Math.round(state.currentMana * 100 / state.maxMana)
    const newMana = constants.character.paramFormulas.Mana(state.level, stats, state)
    state.maxMana = newMana
    state.currentMana = Math.round(newMana * manaPercentage / 100)
    // calculate new hp
    const hpPercentage = Math.round(state.currentHp * 100 / state.maxHp)
    const newHp = constants.character.paramFormulas.HP(state.level, stats, state)
    state.maxHp = newHp
    state.currentHp = Math.round(newHp * hpPercentage / 100)
  },
  'ADD_STATS' (state, newstats) {
    state.stats = Object.keys(state.stats).map(ele => ({ [ele]: state.stats[ele] + newstats[ele] })).reduce((acc, ele) => ({ ...acc, ...ele }), {})
    // calculate new mana
    const manaPercentage = Math.round(state.currentMana * 100 / state.maxMana)
    const newMana = constants.character.paramFormulas.Mana(state.level, state.stats, state)
    state.maxMana = newMana
    state.currentMana = Math.round(newMana * manaPercentage / 100)
    // calculate new hp
    const hpPercentage = Math.round(state.currentHp * 100 / state.maxHp)
    const newHp = constants.character.paramFormulas.HP(state.level, state.stats, state)
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
  'ADD_TALENT' (state, payload) {
    state.talents[payload.tree][payload.name]++
    state.talentsToAllocate--
  },
  'SET_POINTS_TO_ALLOCATE' (state, points) {
    state.statsToAllocate = points
  },
  'ADD_POINTS_TO_ALLOCATE' (state, points) {
    state.statsToAllocate += points
  },
  'ADD_TALENTS_TO_ALLOCATE' (state, points) {
    state.talentsToAllocate += points
  },

  'ADD_EXP' (state, exp) {
    state.exp += exp
  },
  'ADD_LEVEL' (state) {
    state.level++
    state.statsToAllocate += constants.character.stats.perLevel
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
  'REFULL_HP' (state) {
    state.currentHp = state.maxHp
  },
  'SPEND_MANA' (state, mana) {
    state.currentMana -= mana
  },
  'SET_MANA' (state, mana) {
    state.currentMana = mana
  },
  'SET_DEBUFF' (state, debuff) {
    state.debuff[debuff.name] = debuff.quantity
  },
  'ADD_DEBUFF' (state, debuff) {
    state.debuff[debuff.name] += debuff.quantity
  },
  'DEBUFF_DOT_CHARACTER_TICK' (state, debuff) {
    state.debuff[debuff.name] -= 1
  },
  'REMOVE_DEBUFF' (state, debuff) {
    state.debuff[debuff.name] = 0
  },
  'CLEAR_DEBUFF' (state, debuff) {
    state.debuff = debuff
  },
  'SET_DEFENDING' (state, is) {
    state.isDefending = is
  },
  'SET_BERSERK' (state, is) {
    state.isInBerserk = is
  }
}
const actions = {
  setName ({ commit }, name) {
    commit('SET_NAME', name)
  },
  setAvatar ({ commit }, avatar) {
    commit('SET_AVATAR', avatar)
  },
  createCharacter ({ commit, getters }, payload) {
    commit('CREATE_CHARACTER', payload)
    commit('RECALCULATE_PARAMS', getters.getStats)
  },
  addStats ({ commit, getters }, payload) {
    commit('SET_POINTS_TO_ALLOCATE', payload.points)
    commit('ADD_STATS', payload.stats)
    commit('RECALCULATE_PARAMS', getters.getStats)
  },

  recalculateParams ({ commit, getters }) {
    commit('RECALCULATE_PARAMS', getters.getStats)
  },
  /* talent : {
    tree: il ramo
    name: il nome
  }
   */
  buyTalent ({ commit, dispatch }, talent) {
    commit('ADD_TALENT', talent)
    dispatch('recalculateParams')
  },

  addExp ({ commit, getters, dispatch }, exp) {
    if (state.talents.EXPLORER.EXPER) {
      exp *= 2
    }
    // uso un ciclo perchè l'assegnazione di exp potrebbe non essere linare, e quindi successivamente non risolvibile con una semplice divisione
    while (exp > 0) {
      const expRequiredToNextLevel = getters.getExpRequired
      const currentExpInLevel = getters.getExpThisLevel
      if ((currentExpInLevel + exp) >= expRequiredToNextLevel) {
        exp -= expRequiredToNextLevel
        commit('ADD_EXP', exp)
        commit('ADD_LEVEL')
        commit('REFULL_HP')
        commit('RECALCULATE_PARAMS', getters.getStats)
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
    dispatch('setClicked', { col: payload.coords.col, row: payload.coords.row })
    dispatch('setVisible', { col: payload.coords.col, row: payload.coords.row })
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
    if (state.isDefending) {
      const defenseReduction = constants.classes[state.class].defenseReduction
      damage.damage = damage.damage - Math.round((damage.damage * defenseReduction) / 100)
    }
    commit('TAKE_DAMAGE', damage.damage)
    dispatch('eventPlayerTookDamage', damage.damage)
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
    dispatch('eventPlayerDodged')
    dispatch('logAddEntry', {
      message,
      type: 'COMBAT',
      action: constants.application.logActions.DODGE
    })
  },

  takeDamageInMap ({ dispatch, state }, payload) {
    let damage = payload.data.fun(state.maxHp)
    const dodge = state.params.DODGE * 1
    const roll = (Math.random() * 100).toFixed(2) * 1
    dispatch('setClicked', { col: payload.coords.col, row: payload.coords.row })
    dispatch('setVisible', { col: payload.coords.col, row: payload.coords.row })
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
    // INIZIO TALENTO TRAPPOLA
    const talent = state.talents.EXPLORER.NOTRAP
    if (talent) {
      switch (talent) {
        case 1: damage -= Math.round((damage * 30) / 100); break // damage : 100 = x : 30
        case 2: damage -= Math.round((damage * 60) / 100); break
        case 3: damage = 0; break
      }
    }

    // FINE TALENTO TRAPPOLA
    const message = payload.data.log.replace('{VALUE}', damage)

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

  playerHealInDot ({ commit, state }, heal) {
    if (!heal) {
      return
    }
    if ((heal + state.currentHp) >= state.maxHp) {
      commit('SET_HEALTH', state.maxHp)
    } else {
      commit('HEAL', heal)
    }
  },

  healMana ({ commit, state, dispatch }, mana) {
    const maxMana = state.maxMana
    if (state.currentMana + mana > maxMana) {
      commit('SET_MANA', maxMana)
    } else {
      commit('SPEND_MANA', mana * -1)
    }
    if (state.currentMana === maxMana) {
      dispatch('eventMaxResource')
    }
  },

  healEnergyInAssassinSwiftnessTalent ({ state, dispatch }) {
    const swiftnessLevel = state.talents.ASSASSIN.SWIFTNESS
    if (!swiftnessLevel) {
      return
    }
    let heal = 0
    switch (swiftnessLevel) {
      case 1: heal = 10; break
      case 2: heal = 20; break
      case 3: heal = 30; break
    }
    if (heal) {
      dispatch('healMana', heal)
    }
  },

  takeHealInMap ({ dispatch, state }, payload) {
    if (payload.clicked) {
      return
    }
    dispatch('setClicked', { col: payload.coords.col, row: payload.coords.row })
    dispatch('setVisible', { col: payload.coords.col, row: payload.coords.row })
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
  playerAction ({ commit, dispatch }, actionType) {
    switch (actionType.action) {
      case 'ATK': dispatch('attackAction', actionType); break
      case 'MAG': dispatch('attackAction', actionType); break
    }
  },

  handleDebuffInAttackAction ({ dispatch, state, getters }, effects) {
    const monster = getters.getMonster
    if (effects.player) {
      if (effects.player.debuff) {
        dispatch('handleDebuff', {
          ...effects.player.debuff(state, monster),
          receivedBy: 'PLAYER'
        })
      }
    }
    if (effects.monster) {
      if (effects.monster.debuff) {
        dispatch('handleDebuff', {
          ...effects.monster.debuff(state, monster),
          receivedBy: 'MONSTER'
        })
      }
    }
  },
  /* actionType: {
    action: ATK O MAG
    type: il nome dell'attacco da playerattacks
  }
  */
  attackAction ({ commit, getters, state, dispatch }, actionType) {
    const monster = getters.getMonster
    const attack = constants.playerattacks[actionType.action][actionType.type]
    const effects = attack.effect
    let damageDone
    let percentualHpDamage = 0
    let heal = 0
    if (attack.cost(state).hp) {
      percentualHpDamage = Math.round(state.maxHp * attack.cost(state).hp / 100)
      commit('TAKE_DAMAGE', percentualHpDamage)
    }
    if (attack.cost(state).mana) {
      commit('SPEND_MANA', attack.cost(state).mana)
    }

    dispatch('handleDebuffInAttackAction', effects)
    if (effects.monster) {
      if (effects.monster.damage) {
        damageDone = effects.monster.damage(state.params, state, monster, commit, dispatch)
        if (damageDone >= monster.currentHp * 1) {
          commit('MONSTER_SET_HEALTH', 0)
          commit('MONSTER_DEATH')
        } else {
          commit('MONSTER_TAKE_DAMAGE', damageDone)
        }
      }
    }

    if (effects.player) {
      if (effects.player.heal) {
        heal = effects.player.heal(state.params, state, monster, commit, dispatch)
        dispatch('playerHeal', {
          heal,
          message: constants.application.messages.heal
        })
      }
      if (effects.player.resource) {
        dispatch('healMana', effects.player.resource(state))
      }
    }
    dispatch('logAddEntry', {
      type: 'COMBAT',
      message: attack.log.replace('{MONSTER}', monster.name).replace('{DAMAGE}', damageDone).replace('{COST}', percentualHpDamage).replace('{HEAL}', heal),
      action: constants.application.logActions.PLAYER_ATTACK
    })
  },

  defenseAction ({ commit, getters, dispatch, state }) {
    commit('SET_DEFENDING', true)
    if (state.class === 'MAGE') {
      const maxAtb = getters.getPlayerAtb.total
      commit('SET_ATB', {
        who: 'player',
        value: maxAtb / 2
      })
    }
  },

  clearDebuff ({ commit }) {
    const debuff = { ...Object.keys(constants.debuff).map(ele => ({ [ele]: 0 })).reduce((acc, ele) => ({ ...acc, ...ele })) }
    commit('CLEAR_DEBUFF', debuff)
  },

  dodgeDamageInAssassinDeadlydodgeTalent ({ dispatch, getters }) {
    const talentLevel = state.talents.ASSASSIN.DEADLYDODGE
    let damage = 0
    const DMG_LV1 = 0.35
    const DMG_LV2 = 0.70
    const DMG_LV3 = 1
    switch (talentLevel) {
      case 1: damage = state.params.ATK * DMG_LV1; break
      case 2: damage = state.params.ATK * DMG_LV2; break
      case 3: damage = state.params.ATK * DMG_LV3; break
    }
    dispatch('debuffDamage', {
      damage,
      monster: getters.getMonster,
      message: 'Esegui con perizia una schivata e riesci a fare {DAMAGE} danni'
    })
  },

  reflectDamageInTankDefenderTalent ({ dispatch, getters }, damage) {
    if (!state.talents.TANK.DEFENDER) {
      return
    }
    const defenderLevel = state.talents.TANK.DEFENDER
    if (state.isDefending) {
      const REFLECT_LV1 = 10
      const REFLECT_LV2 = 20
      const REFLECT_LV3 = 50
      const REGENERATED_RAGE_LV1 = 5
      const REGENERATED_RAGE_LV2 = 10
      const REGENERATED_RAGE_LV3 = 20
      let regeneratedRage
      let reflectedDamage
      switch (defenderLevel) {
        case 1: reflectedDamage = REFLECT_LV1; regeneratedRage = REGENERATED_RAGE_LV1; break
        case 2: reflectedDamage = REFLECT_LV2; regeneratedRage = REGENERATED_RAGE_LV2; break
        case 3: reflectedDamage = REFLECT_LV3; regeneratedRage = REGENERATED_RAGE_LV3; break
      }
      const damageDone = Math.round((damage * reflectedDamage) / 100)
      dispatch('healMana', regeneratedRage)
      dispatch('debuffDamage', {
        damage: damageDone,
        monster: getters.getMonster,
        message: '{MONSTER} attacca la tua difesa ferrea, riceve indietro {DAMAGE} danni'
      })
    }
  },

  reflectDamageInTankThornsTalent ({ dispatch, getters }, damage) {
    if (!state.talents.TANK.THORNS) {
      return
    }
    const defenderLevel = state.talents.TANK.THORNS
    const REFLECT_LV1 = 5
    const REFLECT_LV2 = 10
    const REFLECT_LV3 = 15
    let reflectedDamage
    switch (defenderLevel) {
      case 1: reflectedDamage = REFLECT_LV1; break
      case 2: reflectedDamage = REFLECT_LV2; break
      case 3: reflectedDamage = REFLECT_LV3; break
    }
    const damageDone = Math.round((damage * reflectedDamage) / 100)
    dispatch('debuffDamage', {
      damage: damageDone,
      monster: getters.getMonster,
      message: 'Rifletti {DAMAGE} danni su {MONSTER}'
    })
  },

  autoDefenseInTankBufferingTalent ({ state, commit }) {
    if (!state.talents.TANK.BUFFERING) {
      return
    }
    commit('SET_DEFENDING', true)
  },

  autoAttackInBufferingTankDamage ({ getters, state, dispatch, commit }) {
    if (!state.talents.TANK.BUFFERING || state.talents.TANK.BUFFERING < 2) {
      return
    }
    const talentLevel = state.talents.TANK.BUFFERING
    const AUTOATTACK_MULTIPLIER = 1.25
    const damage = Math.round(state.params.ATK * AUTOATTACK_MULTIPLIER)
    dispatch('debuffDamage', {
      damage,
      monster: getters.getMonster,
      message: 'Sfoghi la tua rabbia facendo {DAMAGE} danni a {MONSTER}'
    })
    if (talentLevel > 2) {
      const message = 'Sfogare la rabbia fa bene! Ti curi di {HEAL}'
      const AUTOATTACK_HEAL_MULTIPLIER = 1
      const heal = state.params.ATK * AUTOATTACK_HEAL_MULTIPLIER
      dispatch('playerHeal', {
        heal,
        message
      })
    }
    commit('SET_MANA', 0)
  },

  berserkTime ({ state, commit }) {
    if (!state.isInBerserk) {
      commit('SET_BERSERK', true)
    }
  },

  berserkTankTalent ({ dispatch, commit, state }) {
    if (!state.talents.TANK.BERSERK || !state.isInBerserk) {
      return
    }
    commit('RESET_ATB', 'player')
    dispatch('attackAction', {
      action: 'ATK',
      type: 'BERSERK'
    })
  },

  autoDefTankTalent ({ commit, state }) {
    if (state.isDefending) {
      return
    }
    if (!state.talents.TANK.AUTODEF) {
      return
    }
    commit('SET_DEFENDING', true)
  },

  increaseDotInFarterShitarmorTalent ({ state, dispatch, getters }) {
    if (!state.talents.FARTER.SHITARMOR || !state.isDefending) {
      return
    }
    const monsterDebuff = getters.getMonsterDebuff
    const tanfoStacks = monsterDebuff.TANFO
    const gavettoneStacks = monsterDebuff.STICKYGAVETTONE
    const SA_LV1 = 4
    const SA_LV2 = 7
    const SA_LV3 = 10
    let stacks
    switch (state.talents.FARTER.SHITARMOR) {
      case 1: stacks = SA_LV1; break
      case 2: stacks = SA_LV2; break
      case 3: stacks = SA_LV3; break
      default: stacks = 0; break
    }

    if (tanfoStacks) {
      dispatch('handleDebuff', {
        name: 'TANFO',
        quantity: stacks,
        receivedBy: 'MONSTER'
      })
    }

    if (gavettoneStacks) {
      dispatch('handleDebuff', {
        name: 'STICKYGAVETTONE',
        quantity: stacks,
        receivedBy: 'MONSTER'
      })
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
