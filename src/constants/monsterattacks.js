const SUPERPETO_MULTIPLIER = 1.5
const PETOSORPRESA_MULTIPLIER_PLAYER_DAMAGE = 1
const PETO_SORPRESA_MULTIPLIER_MONSTER_DAMAGE = 100
export default {
  PETO: {
    label: 'Peto',
    message: {
      damage: '{MONSTER} trattiene il fiato e poi rilascia un {ABILITY}. Ricevi {DAMAGE} danni da vomito',
      dodge: 'Schivi incredibilemente {ABILITY}. O forse è semplicemente merito della molletta al naso?'
    },
    attack: (monster, player, dispatch) => ({
      player: {
        damage: Math.round(Math.random() * monster.stats.ATK + monster.stats.MAG)
      },
      monster: {
        heal: monster.stats.ATK + monster.stats.MAG
      }
    })
  },
  SUPERPETO: {
    label: 'Super Peto',
    message: {
      damage: '{MONSTER} trattiene il fiato e poi rilascia un {ABILITY}. Ricevi {DAMAGE} danni da vomito',
      dodge: 'Schivi incredibilemente {ABILITY}. O forse è semplicemente merito della molletta al naso?'
    },
    attack: (monster, player, dispatch) => ({
      player: {
        damage: Math.round(monster.stats.ATK + monster.stats.MAG * SUPERPETO_MULTIPLIER)
      },
      monster: {
        heal: (monster.stats.ATK + monster.stats.MAG * SUPERPETO_MULTIPLIER)
      }
    })
  },
  PETOSORPRESA: {
    label: 'Peto... con sorpresa',
    message: {
      damage: '{MONSTER} si gonfia incredibilmente per rilasciare un {ABILITY}. Ricevi {DAMAGE} danni, ma non perdi la dignità',
      dodge: 'La molletta al naso ti protegge da {ABILITY}, ma '
    },
    attack: (monster, player, dispatch) => ({
      player: {
        damage: monster.stats.ATK + monster.stats.MAG * PETOSORPRESA_MULTIPLIER_PLAYER_DAMAGE
      },
      monster: {
        damage: (monster.stats.ATK + monster.stats.MAG) * PETO_SORPRESA_MULTIPLIER_MONSTER_DAMAGE
      }
    })
  }
}
