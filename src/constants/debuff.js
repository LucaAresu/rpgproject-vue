const PETOFALLITO_PLAYER_PERCENTDAMAGE = 15
const PETOFALLITO_MONSTER_PERCENTDAMAGE = 20

const BLEED_PERCENTUAL_PLAYER_DAMAGE = 3
const BLEED_PERCENTUAL_MONSTER_DAMAGE = 3

const BALLBUSTED_PERCENTUAL_PLAYER_DAMAGE = 15
const BALLBUSTED_PERCENTUAL_MONSTER_DAMAGE = 5
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
        damage: monster => percentualHealthDamage(monster.maxHp, BLEED_PERCENTUAL_MONSTER_DAMAGE)
      }
    }
  },

  BALLBUSTED: {
    name: 'Dolore alle palle',
    icon: 'ballbusted.png',
    type: 'DOT',
    limit: player => limit(player, 2),
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
  }
}