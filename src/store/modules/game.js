import constants from '../../constants'
const state = {
  map: {
    rows: 0,
    columns: 0,
    content: []
  },
  level: 0,
  resources: {
    money: 0
  },
  isInCombat: false,
  hasCombatStarted: false,
  monster: null,
  selectedButtonInCombat: 'ATK',
  atb: {
    player: {
      current: 0,
      total: 3000
    },
    monster: {
      current: 0,
      total: 0
    }
  },
  attackKey: 0
}

const getters = {
  getNumberOfRows: state => state.map.rows,
  getCurrentLevel: state => state.level,
  getNumberOfColumns: state => state.map.columns,
  getMap: state => state.map.content,
  getSlotValue: state => payload => state.map.content[payload.col][payload.row],
  getMoney: state => state.resources.money,
  isInCombat: state => state.isInCombat,
  hasCombatStarted: state => state.hasCombatStarted,
  getMonster: state => state.monster,
  isMonsterDefeated: state => state.monster ? state.monster.isDefeated : true,
  getSelectedButtonInCombat: state => state.selectedButtonInCombat,
  getAtbs: state => state.atb,
  getPlayerAtb: state => state.atb.player,
  getMonsterAtb: state => state.atb.monster,
  getNextAttack: state => state.monster.nextAttack,
  getAttackKey: state => state.attackKey,
  getActiveMonsterDebuff: state => Object.keys(state.monster.debuff).map(ele => ({ name: ele, value: state.monster.debuff[ele] })).filter(ele => ele.value)
}

const mutations = {
  'CREATE_MAP' (state, payload) {
    state.map.rows = payload.rows
    state.map.columns = payload.columns
    state.map.content = payload.content
  },
  'NEXT_LEVEL' (state) {
    state.level++
  },
  'SET_VISIBLE' (state, payload) {
    state.map.content[payload.col][payload.row].visible = true
  },
  'SET_CLICKED' (state, payload) {
    state.map.content[payload.col][payload.row].clicked = true
  },
  'ADD_MONEY' (state, value) {
    state.resources.money += value
  },
  'CHANGE_COMBAT_STATUS' (state, value) {
    state.isInCombat = value
  },
  'START_COMBAT' (state) {
    state.hasCombatStarted = true
  },
  'END_COMBAT' (state) {
    state.hasCombatStarted = false
  },
  'SET_MONSTER_TO_FIGHT' (state, monster) {
    state.monster = { ...monster }
    state.atb.monster.total = monster.cooldown
    state.atb.monster.current = 0
    state.attackKey = Math.random()
  },
  'DELETE_MONSTER' (state) {
    state.monster = null
  },
  'SET_SELECTED_COMBAT_BUTTON' (state, choice) {
    state.selectedButtonInCombat = choice
  },
  'SET_MONSTER_MAX_ATB' (state, value) {
    state.atb.monster.total = value
  },
  'RESET_ATB' (state, who) {
    state.atb[who].current = 0
  },
  'SET_ATB' (state, payload) {
    state.atb[payload.who].current = payload.value
  },
  'SET_MONSTER_NEXT_ATTACK' (state, attack) {
    state.monster.nextAttack = attack
    state.attackKey = Math.random()
  },
  'MONSTER_HEAL' (state, heal) {
    state.monster.currentHp += heal
  },
  'MONSTER_SET_HEALTH' (state, health) {
    state.monster.currentHp = health
  },
  'MONSTER_TAKE_DAMAGE' (state, damage) {
    state.monster.currentHp -= damage
  },
  'SET_MONSTER_DEBUFF' (state, debuff) {
    state.monster.debuff[debuff.name] = debuff.quantity
  },
  'ADD_MONSTER_DEBUFF' (state, debuff) {
    state.monster.debuff[debuff.name] += debuff.quantity
  },
  'REMOVE_MONSTER_DEBUFF' (state, debuff) {
    state.monster.debuff[debuff.name] = 0
  },
  'MONSTER_DEATH' (state) {
    state.monster.isDefeated = true
    state.hasCombatStarted = false
  },
  'START_AGAIN' (state) {
    state.isInCombat = false
    state.hasCombatStrated = false
    state.level = 0
  }
}

const actions = {
  createMap ({ commit, state }) {
    commit('NEXT_LEVEL')
    const level = state.level
    const rows = Math.round(level / constants.map.options.rowDivider) + constants.map.options.minRows
    const columns = Math.round(level / constants.map.options.columnDivider) + constants.map.options.minColumns
    const content = []
    const maxMapRarity = Object.keys(constants.map.rarity).reduce((acc, ele) => constants.map.rarity[ele] + acc, 0)
    const rand = () => Math.round(Math.random() * maxMapRarity)
    const giveMap = rand => {
      const rarities = Object.keys(constants.map.rarity)
      let prev = 0
      for (const idx of rarities) {
        if (rand >= prev && rand <= constants.map.rarity[idx] + prev) {
          return idx
        } else {
          prev += constants.map.rarity[idx]
        }
      }
    }

    for (let i = 0; i < columns; i++) {
      const row = []
      for (let j = 0; j < rows; j++) {
        const mapType = giveMap(rand())
        row.push({
          type: mapType,
          visible: false,
          clicked: false
        })
      }
      content.push(row)
    }
    const randomColumn = Math.round(Math.random() * (columns - 1))
    const randomRow = Math.round(Math.random() * (rows - 1))
    content[randomColumn][randomRow] = {
      type: 'BOSS',
      visible: true,
      clicked: false
    }
    commit('CREATE_MAP', {
      rows,
      columns,
      content
    })
  },

  setVisible ({ commit }, payload) {
    commit('SET_VISIBLE', payload)
  },
  setClicked ({ commit }, payload) {
    commit('SET_CLICKED', payload)
  },
  setSelectedButtonInCombat ({ commit }, choice) {
    commit('SET_SELECTED_COMBAT_BUTTON', choice)
  },

  addMoneyInMap ({ commit, state, dispatch }, payload) {
    if (payload.clicked) {
      return
    }
    const value = payload.data.fun(state.level)
    const str = payload.data.log.replace('{VALUE}', value)
    dispatch('logAddEntry', {
      message: str,
      type: 'MAP',
      action: constants.application.logActions.MONEY
    })
    commit('ADD_MONEY', value)
  },

  startCombat ({ commit, dispatch, state }, payload) {
    if (payload.clicked) {
      return
    }
    const monsterType = payload.data.fun()
    dispatch('getMonsterToFight', monsterType)
    const monster = state.monster
    const message = payload.data.log.replace('{NAME}', monster.name)
    dispatch('logAddEntry', {
      message,
      type: 'MAP',
      action: constants.application.logActions.DISCOVER_MONSTER
    })
    commit('CHANGE_COMBAT_STATUS', true)
  },

  getMonsterToFight ({ state, commit }, type) {
    const monsters = Object.keys(constants.monsters.monsters).map(ele => constants.monsters.monsters[ele])
    const bosses = Object.keys(constants.bosses).map(ele => constants.bosses[ele])
    const currentLevel = state.level
    let monsterList
    let monster
    if (type === 'BOSS') {
      monsterList = bosses.filter(ele => currentLevel >= ele.levels.start && currentLevel <= ele.levels.end)
    } else {
      monsterList = monsters.filter(ele => currentLevel >= ele.levels.start && currentLevel <= ele.levels.end)
    }
    const randomIndex = Math.floor(monsterList.length * Math.random())
    monster = monsterList[randomIndex]

    // faccio una copia totale del mostro per poter manipolare le stats senza avere effetti collaterali
    monster = {
      ...monster,
      attacks: [...monster.attacks],
      drop: { ...monster.drop },
      stats: { ...monster.stats },
      debuff: {
        ...Object.keys(constants.debuff).map(ele => ({ [ele]: 0 })).reduce((acc, ele) => ({ ...acc, ...ele }))
      }
    }
    if (type === 'ELITE') {
      Object.keys(monster.stats).forEach(ele => { monster.stats[ele] *= constants.monsters.paramsBonuses[ele].elite })
      monster.drop.exp *= constants.monsters.dropEliteBonuses.exp
      monster.drop.money *= constants.monsters.dropEliteBonuses.money
      monster.icon = 'elite/' + monster.icon
    }
    if (type === 'BOSS') {
      monster.isBoss = true
    }

    Object.keys(monster.stats).forEach(ele => { monster.stats[ele] *= constants.monsters.paramsBonuses[ele].level })
    monster.currentHp = monster.stats.HP
    monster.maxHp = monster.stats.HP
    monster.isDefeated = false
    monster.nextAttack = monster.firstAttack
    commit('SET_MONSTER_TO_FIGHT', monster)
  },
  setAtb ({ commit }, atbs) {
    commit('SET_ATB', {
      who: 'player',
      value: atbs.player
    })
    commit('SET_ATB', {
      who: 'monster',
      value: atbs.monster
    })
  },

  monsterTakeHeal ({ state, commit }, heal) {
    if ((heal + state.monster.currentHp) >= state.monster.maxHp) {
      commit('MONSTER_SET_HEALTH', state.monster.maxHp)
    } else {
      commit('MONSTER_HEAL', heal)
    }
  },

  monsterTakeDamage ({ state, commit }, damage) {
    const monster = state.monster
    if (damage >= monster.currentHp * 1) {
      commit('MONSTER_SET_HEALTH', 0)
      commit('MONSTER_DEATH')
    } else {
      commit('MONSTER_TAKE_DAMAGE', damage)
    }
  },

  monsterAttack ({ state, getters, dispatch, commit }) {
    const monster = state.monster
    const player = getters.getCharacter
    const nextAttack = Math.round((monster.attacks.length - 1) * Math.random())
    const currentAttack = constants.monsterattacks[monster.nextAttack]

    const effects = currentAttack.attack(monster, player, dispatch)
    if (effects.monster.debuff) {
      dispatch('handleDebuff', {
        ...effects.monster.debuff(monster),
        receivedBy: 'MONSTER'
      })
    }
    if (effects.player.damage) {
      dispatch('playerTakeDamage', {
        ability: currentAttack.label,
        damage: effects.player.damage,
        message: currentAttack.message,
        monster: monster.name
      })
    }
    if (effects.player.heal) {
      dispatch('playerHeal', effects.player.heal)
    }
    if (effects.monster.damage) {
      dispatch('monsterTakeDamage', effects.monster.damage)
    }
    if (effects.monster.heal) {
      dispatch('monsterTakeHeal', effects.monster.heal)
    }

    commit('SET_MONSTER_NEXT_ATTACK', monster.attacks[nextAttack])
    commit('RESET_ATB', 'monster')
  },

  endCombat ({ state, commit, dispatch }) {
    const monster = state.monster
    dispatch('handleDrops', monster.drop)
    commit('CHANGE_COMBAT_STATUS', false)
    commit('DELETE_MONSTER')
  },

  handleDrops ({ commit, dispatch, state }, drops) {
    dispatch('addExp', drops.exp)
    commit('ADD_MONEY', drops.money)
    if (state.monster.isBoss) {
      dispatch('createMap')
    }
  },
  /*
  /* payload: {
    clicked: true o false
    data: {
      fun: {
        stat: str, dex ecc
        points: 1 2 ecc
      }
      log: il messaggio
    }
  */
  incStats ({ commit, dispatch }, payload) {
    if (payload.clicked) {
      return
    }
    const stat = payload.data.fun()
    const message = payload.data.log.replace('{VALUE}', stat.quantity)
    if (stat.tipo === 'LIBERA') {
      commit('ADD_POINTS_TO_ALLOCATE', stat.quantity)
    } else {
      commit('ADD_SINGLE_STAT', {
        stat: stat.tipo,
        points: stat.quantity
      })
    }
    dispatch('logAddEntry', {
      type: 'MAP',
      message,
      action: constants.application.logActions.ADD_STAT
    })
  },

  startAgain ({ commit }) {
    commit('DELETE_CHARACTER')
    commit('DELETE_MONSTER')
    commit('START_AGAIN')
  },

  /*
    malus: {
      receivedBy: PLAYER - MONSTER
      type: ADD, SET, REMOVE
      name: il nome
      quantity: la quantità
    }
  */
  handleDebuff ({ dispatch }, malus) {
    const debuff = constants.debuff[malus.name]
    switch (debuff.type) {
      case 'STACK': dispatch('handleStackDebuff', { ...malus, values: debuff }); break
      case 'EFFECT': dispatch('handleEffectDebuff', { ...malus, values: debuff }); break
    }
  },
  /*
    debuff: {
      receivedBy: PLAYER - MONSTER
      type: ADD, SET, REMOVE
      name: il nome
      quantity: la quantità
      values : {} il valore della costante
  */
  handleEffectDebuff ({ commit, getters }, debuff) {
    console.log(debuff)
    const received = debuff.receivedBy
    const player = getters.getCharacter

    if (received === 'MONSTER') {
      commit('ADD_MONSTER_DEBUFF', debuff)
      const monster = state.monster
      const limit = debuff.values.limit(player)
      if (monster.debuff[debuff.name] > limit) {
        commit('SET_MONSTER_DEBUFF', {
          name: debuff.name,
          quantity: limit
        })
      }
    } else {
      commit('ADD_DEBUFF', debuff)
      const limit = debuff.values.limit()
      if (player.debuff[debuff.name] > limit) {
        commit('SET_DEBUFF', {
          name: debuff.name,
          quantity: limit
        })
      }
    }
  },
  /*
    debuff: {
      receivedBy: PLAYER - MONSTER
      type: ADD, SET, REMOVE
      name: il nome
      quantity: la quantità
      values : {} il valore della costante
  */
  handleStackDebuff ({ dispatch, getters, commit }, debuff) {
    const received = debuff.receivedBy

    if (received === 'PLAYER') {
      commit('ADD_DEBUFF', debuff)
      const player = getters.getCharacter
      if (player.debuff[debuff.name] >= debuff.values.limit(player)) {
        const damage = {
          damage: debuff.values.effect.player.damage(player),
          monster: '', //  placeholder
          message: debuff.values.log.player,
          ability: ''
        }
        dispatch('playerTakeDamage', damage)
        commit('REMOVE_DEBUFF', debuff)
      }
    } else {
      commit('ADD_MONSTER_DEBUFF', debuff)
      const monster = state.monster
      if (monster.debuff[debuff.name] >= debuff.values.limit()) {
        const damage = {
          damage: debuff.values.effect.monster.damage(monster),
          monster,
          message: debuff.values.log.monster
        }
        dispatch('debuffDamage', damage)
        commit('REMOVE_MONSTER_DEBUFF', debuff)
      }
    }
  },
  /* payload: {
    damage: il danno subito dal mostro
    monster: l'oggetto mostro
    message: il messaggio
  } */

  debuffDamage ({ commit, dispatch }, payload) {
    if (payload.damage >= payload.monster.currentHp * 1) {
      commit('MONSTER_SET_HEALTH', 0)
      commit('MONSTER_DEATH')
    } else {
      commit('MONSTER_TAKE_DAMAGE', payload.damage)
    }
    dispatch('logAddEntry', {
      message: payload.message.replace('{DAMAGE}', payload.damage).replace('{MONSTER}', payload.monster.name),
      type: 'COMBAT',
      action: constants.application.logActions.DEBUFF_DAMAGE
    })
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
