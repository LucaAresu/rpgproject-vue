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
  getMaxMana: state => state.maxMana
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
  },
  'SET_POINTS_TO_ALLOCATE' (state, points) {
    state.statsToAllocate = points
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
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
