export default {
  PETO: {
    label: 'Peto',
    message: '{MONSTER} trattiene il fiato e poi rilascia un {ABILITY}. Ricevi {DAMAGE} danni da vomito',
    attack: (monster, player, dispatch) => ({
      player: {
        damage: Math.round(Math.random() * monster.stats.ATK + monster.stats.MAG)
      },
      monster: {
        heal: monster.stats.ATK + monster.stats.MAG
      }
    })
  },
  PETO2: {
    label: 'Peto2',
    message: '{MONSTER} trattiene il fiato e poi rilascia un {ABILITY}. Ricevi {DAMAGE} danni da vomito',
    attack: (monster, player, dispatch) => ({
      player: {
        damage: monster.stats.ATK + monster.stats.MAG
      },
      monster: {
        heal: monster.stats.ATK + monster.stats.MAG
      }
    })
  }
}
