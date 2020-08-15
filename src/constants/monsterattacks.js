const SUPERPETO_MULTIPLIER = 1.5
const PETOSORPRESA_MULTIPLIER_PLAYER_DAMAGE = 1
const PETO_SORPRESA_MULTIPLIER_MONSTER_DAMAGE = 50
// eslint-disable-next-line no-unused-vars
const MORSO_MULTIPLIER_PLAYER_DAMAGE = 1.3

const STRETTALETALE_MULTIPLIER_PLAYER_DAMAGE = 2.5

const TESTATA_MULTIPLIER_PLAYER_DAMAGE = 3.5
const TESTATA_MULTIPLIER_MONSTER_DAMAGE = 5

const SCHIACCIANOCI_MULTIPLIER_PLAYER_DAMAGE = 5

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
        heal: monster.stats.ATK + monster.stats.MAG,
        debuff: () => ({
          type: 'ADD',
          name: 'PETOFALLITO',
          quantity: 2
        })
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
        heal: (monster.stats.ATK + monster.stats.MAG * SUPERPETO_MULTIPLIER),
        debuff: () => ({
          type: 'ADD',
          name: 'PETOFALLITO',
          quantity: 3
        })
      }
    })
  },
  PETOSORPRESA: {
    label: 'Peto... con sorpresa',
    message: {
      damage: '{MONSTER} si gonfia incredibilmente per rilasciare un {ABILITY}. Ricevi {DAMAGE} danni, ma non perdi la dignità',
      dodge: 'La molletta al naso ti protegge da {ABILITY}, ma non protegge {MONSTER} dall\'umiliazione'
    },
    attack: (monster, player, dispatch) => ({
      player: {
        damage: monster.stats.ATK + monster.stats.MAG * PETOSORPRESA_MULTIPLIER_PLAYER_DAMAGE
      },
      monster: {
        damage: (monster.stats.ATK + monster.stats.MAG) * PETO_SORPRESA_MULTIPLIER_MONSTER_DAMAGE
      }
    })
  },

  MORSO: {
    label: 'Morso',
    message: {
      damage: '{MONSTER} usa {ABILITY}. Ricevi {DAMAGE} danni e inizi a sanguinare',
      dodge: 'Schivi {ABILITY}. Il rumore dei denti risuona nel castello'
    },
    attack: (monster, player, dispatch) => ({
      player: {
        damage: Math.round(monster.stats.ATK * MORSO_MULTIPLIER_PLAYER_DAMAGE),
        debuff: () => ({
          type: 'ADD',
          name: 'BLEED',
          quantity: 5
        })
      }
    })
  },

  STRETTALETALE: {
    label: 'Stretta Letale',
    message: {
      damage: 'Ti senti soffocare dalla Stretta letale di {MONSTER}, subisci {DAMAGE} danni',
      dodge: 'Schivi abilmente {ABILITY}'
    },
    attack: (monster, player, dispatch) => ({
      player: {
        damage: (monster.stats.ATK + monster.stats.MAG) * STRETTALETALE_MULTIPLIER_PLAYER_DAMAGE
      }
    })
  },

  TESTATA: {
    label: 'Testata',
    message: {
      damage: '{MONSTER} ti da una testata e soffri per {DAMAGE} danni',
      dodge: 'Schivi abilmente {ABILITY}'
    },
    attack: (monster, player, dispatch) => ({
      player: {
        damage: monster.stats.ATK * TESTATA_MULTIPLIER_PLAYER_DAMAGE
      },
      monster: {
        damage: monster.stats.ATK * TESTATA_MULTIPLIER_MONSTER_DAMAGE
      }
    })
  },

  SCHIACCIANOCI: {
    label: 'Schiaccianoci',
    message: {
      damage: '{MONSTER} ti schiaccia le noci. Ti fa {DAMAGE} danni, ma annulla i danni da gravidanza inattesa',
      dodge: 'Schivi {ABILITY}. Ma non l\' idea del suo dolore'
    },
    attack: (monster, player, dispatch) => ({
      player: {
        damage: Math.round(monster.stats.ATK * SCHIACCIANOCI_MULTIPLIER_PLAYER_DAMAGE),
        debuff: () => ({
          type: 'ADD',
          name: 'BALLBUSTED',
          quantity: 2
        })
      }
    })
  }
}
