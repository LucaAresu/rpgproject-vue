export default {
  monsters: {
    MERDINO: {
      levels: {
        start: 1,
        end: 20
      },
      name: 'Merdino',
      icon: 'merdino.png',
      description: 'Il mostro più semplice da affrontare. Un semplice merdino, ha un semplice attacco naturale, e paga abbastanza bene in exp, una ventata d\'aria... fresca!',
      stats: {
        HP: 100,
        ATK: 5,
        MAG: 5,
        DEF: 5
      },
      cooldown: 10000,
      drop: {
        exp: 25,
        money: 100,
        item: {
          dropRate: 1,
          info: {
            rarity: null,
            slot: null
          }
        }
      },
      attacks: ['PETO', 'SUPERPETO'],
      firstAttack: 'PETO'
    },
    MIMIC: {
      levels: {
        start: 0,
        end: 0
      },
      name: 'Mimic',
      icon: 'mimic.png',
      description: 'Il mimic finge di essere una chest per attirare la sua preda, noto per la sua letalità sarà una sfida ardua, ma gli sforzi saranno ripagati...',
      stats: {
        HP: 500,
        ATK: 15,
        MAG: 15,
        DEF: 15
      },
      cooldown: 5000,
      drop: {
        exp: 100,
        money: 1000,
        keys: {
          dropRate: 25,
          quantity: 2
        },
        talents: {
          quantity: 1,
          dropRate: 10
        },
        item: {
          dropRate: 5,
          info: {
            rarity: null,
            slot: null
          }
        }
      },
      attacks: ['MORSO', 'STRETTALETALE', 'TESTATA', 'SCHIACCIANOCI'],
      firstAttack: 'MORSO'
    }
  },
  paramsBonuses: {
    HP: {
      level: 2,
      elite: 2
    },
    ATK: {
      level: 2,
      elite: 2
    },
    MAG: {
      level: 2,
      elite: 2
    },
    DEF: {
      level: 2,
      elite: 2
    }
  },
  dropEliteBonuses: {
    exp: 4,
    money: 2
  }
}
