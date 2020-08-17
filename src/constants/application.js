export default {
  appName: 'Infested Castle',
  dotMillisecondsTick: 1000,
  atb: {
    tick: 50,
    color: '#ffc857'
  },
  runAwayProbability: 10,
  healthbarTransition: '500ms',
  dropViewDelay: 300,
  messages: {
    takeMapDamage: 'Sono stati ricevuti {DAMAGE} danni da parte di {MONSTER}',
    dodgeMapDamage: 'Prendi una trappola, ma abilmente la schivi',
    heal: 'Ti curi di {HEAL}',
    mapHeal: 'Ti curi di {HEAL}',
    noKeysForchest: 'Non hai chiavi a sufficienza per aprire questa chest!'
  },
  logActions: {
    DAMAGE_RECEIVED: {
      color: '#e63946'
    },
    MONEY: {
      color: '#fcbf49'
    },
    KEYS: {
      color: '#fcbf49'
    },
    TALENT: {
      color: '#b48291'
    },
    EXPERIENCE: {
      color: '#0096c7'
    },
    LEVEL_UP: {
      color: '#83c5be'
    },
    HEAL: {
      color: '#90be6d'
    },
    DISCOVER_MONSTER: {
      color: '#9d0208'
    },
    DODGE: {
      color: '#0096c7'
    },
    ADD_STAT: {
      color: '#9bc53d'
    },
    PLAYER_ATTACK: {
      color: '#3a86ff'
    },
    DEBUFF_DAMAGE: {
      color: '#3a86ff'
    },
    CHEST: {
      color: '#84a98c'
    },
    LEGGENDARYCHEST: {
      color: '#ffd166'
    },
    ERROR: {
      color: '#d90429'
    },
    SHOP_OPEN: {
      color: '#bee3db'
    }
  },
  shopPrices: {
    key: 500,
    talent: 10000,
    stat: 1000
  }
}
