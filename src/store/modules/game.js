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
  }
}

const getters = {
  getNumberOfRows: state => state.map.rows,
  getCurrentLevel: state => state.level,
  getNumberOfColumns: state => state.map.columns,
  getMap: state => state.map.content,
  getSlotValue: state => payload => state.map.content[payload.col][payload.row],
  getMoney: state => state.resources.money
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
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
