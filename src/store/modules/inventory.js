/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
import constants from '../../constants'
const state = {
  equipped: {
    head: {
      id: 2,
      slot: 'head',
      rarity: 0,
      icon: 'head/cascoprotettivo.png',
      name: 'Caschetto protettivo',
      description: 'Un caschetto molto elegante, perchè la sicurezza non è mai troppa!',
      stats: {
        STR: 0,
        MAG: 0,
        AGI: 0,
        VIT: 2,
        LUCK: 0
      },
      cost: 10
    },
    body: {
      id: 5,
      slot: 'body',
      rarity: 0,
      icon: 'body/magliettatigre.png',
      name: 'Magliettina con una tigre speciale',
      description: 'Raffigura una tigre dall\'aspetto... saggio',
      stats: {
        STR: 1,
        MAG: 0,
        AGI: 1,
        VIT: 1,
        LUCK: 0

      },
      cost: 10
    },
    pants: {
      id: 3,
      slot: 'pants',
      rarity: 0,
      icon: 'pants/mutandemarchiate.png',
      name: 'Mutande marchiate',
      description: 'Delle mutande con una certa chiazza... si dice portino fortuna',
      stats: {
        STR: 0,
        MAG: 0,
        AGI: 0,
        VIT: 0,
        LUCK: 2
      },
      cost: 10
    },
    feet: {
      id: 4,
      slot: 'feet',
      rarity: 0,
      icon: 'feet/scarpette.png',
      name: 'Scarpette da ballerina',
      description: 'Elegantissime!',
      stats: {
        STR: 0,
        MAG: 0,
        AGI: 1,
        VIT: 0,
        LUCK: 0
      },
      cost: 10
    },
    weapon: {
      id: 1,
      slot: 'weapon',
      rarity: 0,
      icon: 'weapon/lamamerdino.png',
      name: 'Lama del Merdino',
      description: 'Espulsa da un Merdino vagante sembra un\'arma... lo è?',
      stats: {
        STR: 1,
        MAG: 1,
        AGI: 1,
        VIT: 0,
        LUCK: 0
      },
      cost: 10
    }
  },
  stored: {
    head: [{
      id: 27431,
      slot: 'head',
      rarity: 0,
      icon: 'weapon/lamamerdino.png',
      name: 'Caschetto protettivo',
      description: 'Un caschetto molto elegante, perchè la sicurezza non è mai troppa!',
      stats: {
        STR: 10,
        MAG: 30,
        AGI: 30,
        VIT: 20,
        LUCK: 30
      },
      cost: 2000

    },
    {
      id: 214124142241,
      slot: 'head',
      rarity: 0,
      icon: 'weapon/lamamerdino.png',
      name: 'Caschetto protettivo',
      description: 'Un caschetto molto elegante, perchè la sicurezza non è mai troppa!',
      stats: {
        STR: 210,
        MAG: 320,
        AGI: 0,
        VIT: 220,
        LUCK: 30
      },
      cost: 2000
    },
    {
      id: 217432,
      slot: 'head',
      rarity: 0,
      icon: 'weapon/lamamerdino.png',
      name: 'Caschetto protettivo',
      description: 'Un caschetto molto elegante, perchè la sicurezza non è mai troppa!',
      stats: {
        STR: 210,
        MAG: 320,
        AGI: 0,
        VIT: 220,
        LUCK: 25
      },
      cost: 2000
    }
    ],
    body: [],
    pants: [],
    feet: [],
    weapon: []
  }

}

const getters = {
  getEquipped: state => state.equipped,
  getEquippedStats: state => {
    return Object.keys(state.equipped).map(ele => state.equipped[ele].stats).reduce((acc, ele) => {
      return Object.keys(acc).map(stat => ({ [stat]: acc[stat] + ele[stat] })).reduce((acc, ele) => ({ ...acc, ...ele }))
    })
  },
  getStored: state => state.stored
}

const mutations = {
  /* slot : {
    name: il nome
    items: la lista degli item
    */
  'SET_STORED_SLOT' (state, slot) {
    state.stored[slot.name] = slot.items
  },
  'EQUIP_ITEM' (state, item) {
    state.equipped = { ...state.equipped, [item.slot]: { ...item } }
  },
  'ADD_NEW_ITEM' (state, item) {
    state.stored[item.slot].push(item)
  }
}

const actions = {
  equipThis ({ state, commit, dispatch }, item) {
    const slot = item.slot
    const newInventory = state.stored[slot].filter(ele => ele.id !== item.id)
    const oldItem = state.equipped[slot]
    newInventory.push(oldItem)
    commit('SET_STORED_SLOT', {
      name: slot,
      items: newInventory
    })
    commit('EQUIP_ITEM', item)
    dispatch('recalculateParams')
  },

  sellItem ({ state, commit }, item) {
    const slot = item.slot
    const newInventory = state.stored[slot].filter(ele => ele.id !== item.id)
    commit('SET_STORED_SLOT', {
      name: slot,
      items: newInventory
    })
    commit('ADD_MONEY', item.cost)
  },
  /* itemInfo : {
    slot: lo slot,
    rarity: la rarità (numero)
  } */
  generateRandomItem ({ commit, getters, state }, itemInfo) {
    const statKeys = Object.keys(getters.getStats)
    const currentLevel = getters.getCurrentLevel
    const itemSlots = Object.keys(state.equipped)
    const randomSlot = Math.round(Math.random() * (itemSlots.length - 1))
    let selectedSlot = itemInfo.slot
    if (!selectedSlot) {
      selectedSlot = itemSlots[randomSlot]
    } 
    // roll per assegnare la rarità dell'oggetto
    const rarityPool = Object.keys(constants.inventory.rarity).reduce((acc, ele) => constants.inventory.rarity[ele] + acc, 0)
    const randomRollForRarity = Math.round(Math.random() * rarityPool)
    const rarities = Object.keys(constants.inventory.rarity)
    let chosenRarity = itemInfo.rarity
    if (!chosenRarity) {
      chosenRarity = 0
      let prev = 0
      for (const idx of rarities) {
        if (randomRollForRarity >= prev && randomRollForRarity <= constants.inventory.rarity[idx] + prev) {
          chosenRarity = idx
        }
        prev += constants.inventory.rarity[idx]
      }
    }
    // fine
    // controllo stat pool
    let statNumberDivisor = Math.ceil(currentLevel / constants.inventory.increaseStatEveryLevel)
    if (statNumberDivisor > itemSlots.length) {
      statNumberDivisor = itemSlots.length
    }
    const statPool = Math.ceil(((constants.inventory.statPool[selectedSlot] * currentLevel * currentLevel) / constants.inventory.statPoolDivision) * constants.inventory.rarityInfo[chosenRarity].multiplier)
    const midStat = Math.ceil(statPool / statNumberDivisor)
    // fine
    const statOscillation = (stat, oscillation) => {
      const oscillatePercent = Math.random() * oscillation
      const damagePercent = (stat * oscillatePercent) / 100
      if (Math.random() * 100 > 50) {
        return Math.ceil(stat + damagePercent)
      }
      return Math.ceil(stat - damagePercent)
    }
    let i = 0
    const stats = statKeys.map(ele => ({ [ele]: 0 })).reduce((acc, ele) => ({ ...acc, ...ele }), {})
    while (statNumberDivisor) {
      const random = Math.round(Math.random() * (statKeys.length - 1))
      if (!stats[statKeys[random]]) {
        stats[statKeys[random]] = statOscillation(midStat, constants.inventory.statOscillation)
        statNumberDivisor--
      }
      i++
    }
    const createdItem = {
      id: Date.now(),
      name: 'boh',
      icon: 'feet/scarpette.png',
      slot: selectedSlot,
      rarity: chosenRarity,
      cost: statPool * constants.inventory.statPoolCostMultiplier,
      stats: { ...stats }
    }
    return createdItem
  },

  createAndAddItem ({ dispatch, commit }) {
    dispatch('generateRandomItem').then(item => {
      commit('ADD_NEW_ITEM', item)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
