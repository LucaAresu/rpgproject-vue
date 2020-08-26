import application from './application'
const PETOFALLITO_PLAYER_PERCENTDAMAGE = 15
const PETOFALLITO_MONSTER_PERCENTDAMAGE = 20

const BLEED_PERCENTUAL_PLAYER_DAMAGE = 3
const BLEED_MONSTER_DAMAGE = 1.34
const BLEED_HEAL_BITEHEAL_ATK1 = 0.50
const BLEED_HEAL_BITEHEAL_ATK2 = 0.75
const BLEED_HEAL_BITEHEAL_ATK3 = 1.05

const BALLBUSTED_PERCENTUAL_PLAYER_DAMAGE = 15
const BALLBUSTED_PERCENTUAL_MONSTER_DAMAGE = 5

const INTOSSICATED_MONSTER_DAMAGE = 3.25

const DEADLYPOSON_MONSTER_DAMAGE = 7.50

const DISTRUTTO_MONSTER_DAMAGE = 12.52
/*
tipi debuff
STACK una volta raggiunto il limite si subiscono danni
EFFECT non può superare il limite ma viene usato per altre cose
DOT percentuale di vita come danno nel tempo

*/
const percentualHealthDamage = (maxHp, percentDamage) => Math.round((maxHp * percentDamage) / 100)
const limit = (player, base) => {
  if (player) {
    return base
  }
  return base
}

export default {
  PETOFALLITO: {
    name: 'Peto fallito',
    icon: 'petofallito.png',
    type: 'STACK',
    limit: player => limit(player, 5),
    log: {
      player: {
        damage: 'Hai fatto troppi peti e ora ne subirai le conseguenze... e {DAMAGE} danni',
        dodge: 'Grazie alla tua abilità riesci a schivare le conseguenze dei troppi peti'
      },
      monster: '{MONSTER} ha esagerato con tutti quei peti e subisce {DAMAGE} danni'
    },
    effect: {
      player: {
        damage: player => Math.round((player.maxHp * PETOFALLITO_PLAYER_PERCENTDAMAGE) / 100)
      },
      monster: {
        damage: monster => Math.round((monster.maxHp * PETOFALLITO_MONSTER_PERCENTDAMAGE) / 100)
      }
    }
  },

  INTOSSICATO: {
    name: 'Intossicato',
    icon: 'intossicazione.png',
    type: 'EFFECT',
    limit: player => {
      const trascinatore = player.talents.TOXICOLOGIST.TRASCINATORE
      switch (trascinatore) {
        case 1: return 20
        case 2: return 30
        case 3: return 50
        default: return 10
      }
    }
  },

  BLEED: {
    name: 'Sanguinamento',
    icon: 'bleed.png',
    type: 'DOT',
    tick: player => {
      switch (player.talents.BITER.SONOPOTENTE) {
        case 1: return 850
        case 2: return 700
        case 3: return 500
        default: return 1000
      }
    },
    limit: player => limit(player, 99),
    log: {
      player: {
        damage: 'Sanguini e subisci {DAMAGE} danni',
        dodge: 'Resisti ai danni di sanguinamento grazie alla tua schivata... wat'
      },
      monster: '{MONSTER} soffre {DAMAGE} danni da sanguinamento'
    },
    effect: {
      player: {
        damage: player => percentualHealthDamage(player.maxHp, BLEED_PERCENTUAL_PLAYER_DAMAGE)
      },
      monster: {
        damage: (monster, player) => Math.round(BLEED_MONSTER_DAMAGE * player.params.ATK),
        playerHeal: player => {
          switch (player.talents.BITER.BITEHEAL) {
            case 1: return BLEED_HEAL_BITEHEAL_ATK1 * player.params.ATK
            case 2: return BLEED_HEAL_BITEHEAL_ATK2 * player.params.ATK
            case 3: return BLEED_HEAL_BITEHEAL_ATK3 * player.params.ATK
            default: return 0
          }
        },
        playerResource: player => {
          switch (player.talents.BITER.BITEHEAL) {
            case 1: return 2
            case 2: return 5
            case 3: return 10
            default: return 0
          }
        }
      }
    }
  },

  BALLBUSTED: {
    name: 'Dolore alle palle',
    icon: 'ballbusted.png',
    type: 'DOT',
    tick: player => application.dotMillisecondsTick,
    limit: player => limit(player, 5),
    log: {
      player: {
        damage: 'Ti butti per terra dal dolore ai gioiellini... ricevi {DAMAGE} danni',
        dodge: 'Tieni duro anche se il dolore ai gioiellini è devastante'
      },
      monster: '{MONSTER} soffre {DAMAGE} danni da dolore ai gioiellini'
    },
    effect: {
      player: {
        damage: player => percentualHealthDamage(player.maxHp, BALLBUSTED_PERCENTUAL_PLAYER_DAMAGE)
      },
      monster: {
        damage: monster => percentualHealthDamage(monster.maxHp, BALLBUSTED_PERCENTUAL_MONSTER_DAMAGE)
      }
    }
  },

  INTOSSICATED: {
    name: 'Intossicato',
    icon: 'ballbusted.png',
    type: 'DOT',
    tick: player => application.dotMillisecondsTick,
    limit: player => limit(player, 5),
    log: {
      player: {
        damage: 'Ti butti per terra dal dolore ai gioiellini... ricevi {DAMAGE} danni',
        dodge: 'Tieni duro anche se il dolore ai gioiellini è devastante'
      },
      monster: '{MONSTER} è intossicato. Soffre {DAMAGE} danni'
    },
    effect: {
      monster: {
        damage: (monster, player) => Math.round(INTOSSICATED_MONSTER_DAMAGE * player.params.ATK),
        debuff: (monster, player) => {
          const poisonedLevel = player.talents.ASSASSIN.POISONED
          if (!poisonedLevel) {
            return 0
          }
          let quantity
          switch (poisonedLevel) {
            case 1: quantity = 1; break
            case 2: quantity = 2; break
            case 3: quantity = 3; break
          }
          return ({
            name: 'DISTRUTTO',
            type: 'ADD',
            quantity
          })
        }
      }
    }
  },

  DISTRUTTO: {
    name: 'Distrutto',
    icon: 'petofallito.png',
    type: 'STACK',
    limit: player => limit(player, 50),
    log: {
      player: {
        damage: 'Hai fatto troppi peti e ora ne subirai le conseguenze... e {DAMAGE} danni',
        dodge: 'Grazie alla tua abilità riesci a schivare le conseguenze dei troppi peti'
      },
      monster: '{MONSTER} sente gli effetti delle sostanze velenose. Riceve {DAMAGE} danni'
    },
    effect: {
      player: {
        damage: player => Math.round((player.maxHp * PETOFALLITO_PLAYER_PERCENTDAMAGE) / 100)
      },
      monster: {
        damage: (monster, player) => Math.round(DISTRUTTO_MONSTER_DAMAGE * player.params.ATK)
      }
    }
  },

  DEADLYPOISON: {
    name: 'Veleno Mortale',
    icon: 'ballbusted.png',
    type: 'DOT',
    tick: player => application.dotMillisecondsTick,
    limit: player => limit(player, 5),
    log: {
      player: {
        damage: 'Ti butti per terra dal dolore ai gioiellini... ricevi {DAMAGE} danni',
        dodge: 'Tieni duro anche se il dolore ai gioiellini è devastante'
      },
      monster: '{MONSTER} subisce gli effetti del Veleno Mortale. Soffre {DAMAGE} danni'
    },
    effect: {
      monster: {
        damage: (monster, player) => Math.round(DEADLYPOSON_MONSTER_DAMAGE * player.params.ATK),
        debuff: (monster, player) => ({
          name: 'DISTRUTTO',
          type: 'ADD',
          quantity: 5
        })
      }
    }
  }
}
