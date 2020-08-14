const PETOFALLITO_PLAYER_PERCENTDAMAGE = 15
const PETOFALLITO_MONSTER_PERCENTDAMAGE = 20
/*
tipi debuff
STACK una volta raggiunto il limite si subiscono danni
EFFECT non può superare il limite ma viene usato per altre cose

*/
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
    limit: player => limit(player, 10)
  }
}
