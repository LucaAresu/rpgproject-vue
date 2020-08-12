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
      canAttack: false,
      current: 0,
      total: 5000
    },
    monster: {
      canAttack: false,
      current: 0,
      total: 0
    }
  },
  attackKey: 0
}
const elaborateMonster = (monster, level) => {
  const monConst = constants.monsters.paramsBonuses
  const HP = (monster.monster.stats.HP * (monConst.HP.level * level)) + (monster.monster.stats.HP * (monConst.HP.elite * monster.isElite))
  const ATK = (monster.monster.stats.ATK * (monConst.ATK.level * level)) + (monster.monster.stats.ATK * (monConst.ATK.elite * monster.isElite))
  const MAG = (monster.monster.stats.MAG * (monConst.MAG.level * level)) + (monster.monster.stats.MAG * (monConst.MAG.elite * monster.isElite))
  const DEF = (monster.monster.stats.DEF * (monConst.DEF.level * level)) + (monster.monster.stats.DEF * (monConst.DEF.elite * monster.isElite))

  return {
    ...monster.monster,
    stats: {
      ATK,
      MAG,
      DEF
    },
    currentHp: HP,
    maxHp: HP,
    attacks: [...monster.monster.attacks],
    isDefeated: false,
    nextAttack: monster.monster.firstAttack
  }
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
  getAttackKey: state => state.attackKey

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
  'SET_MONSTER_TO_FIGHT' (state, monster) {
    state.monster = { ...monster }
    state.atb.monster.total = monster.cooldown
    state.atb.monster.current = 0
    state.attackKey = Math.random()
  },
  'SET_SELECTED_COMBAT_BUTTON' (state, choice) {
    state.selectedButtonInCombat = choice
  },
  'SET_MONSTER_MAX_ATB' (state, value) {
    state.atb.monster.total = value
  },
  'ADVANCE_ATB' (state, who) {
    state.atb[who].current += constants.application.atb.tick
  },
  'CHANGE_CAN_ATTACK' (state, payload) {
    state.atb[payload.who].canAttack = payload.can
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

  addMoney ({ commit, state, dispatch }, payload) {
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
    const monster = payload.data.fun()
    const message = payload.data.log.replace('{NAME}', monster.monster.name)
    dispatch('logAddEntry', {
      message,
      type: 'MAP',
      action: constants.application.logActions.DISCOVER_MONSTER
    })
    commit('CHANGE_COMBAT_STATUS', true)
    const elaboratedMonster = elaborateMonster(monster, state.level)
    commit('SET_MONSTER_TO_FIGHT', elaboratedMonster)
  },

  advanceAtb ({ commit, state, dispatch }) {
    const player = state.atb.player
    const monster = state.atb.monster
    const tick = constants.application.atb.tick

    if (!(player.current === player.total)) {
      commit('ADVANCE_ATB', 'player')
      player.current += tick
      if (player.current >= player.total) {
        commit('SET_ATB', {
          who: 'player',
          value: player.total
        })
        commit('CHANGE_CAN_ATTACK', {
          who: 'player',
          can: true
        })
      }
    }

    if (!(monster.current === monster.total)) {
      commit('ADVANCE_ATB', 'monster')
      monster.current += tick
      if (monster.current >= monster.total) {
        dispatch('monsterAttack')
      }
    }
  },

  monsterTakeHeal ({ state, commit }, heal) {
    if ((heal + state.monster.currentHp) >= state.monster.maxHp) {
      commit('MONSTER_SET_HEALTH', state.monster.maxHp)
    } else {
      commit('MONSTER_HEAL', heal)
    }
  },

  monsterAttack ({ state, getters, dispatch, commit }) {
    const monster = state.monster
    const player = getters.getCharacter
    const nextAttack = Math.round((monster.attacks.length - 1) * Math.random())
    const currentAttack = constants.monsterattacks[monster.nextAttack]

    const effects = currentAttack.attack(monster, player, dispatch)
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
      dispatch('monsterTakeDamage', monster.damage)
    }
    if (effects.monster.heal) {
      dispatch('monsterTakeHeal', effects.monster.heal)
    }

    commit('SET_MONSTER_NEXT_ATTACK', monster.attacks[nextAttack])
    commit('RESET_ATB', 'monster')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
