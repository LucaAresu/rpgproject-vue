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
        exp: 50,
        money: 100
      },
      attacks: ['PETO', 'SUPERPETO'],
      firstAttack: 'PETO'
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
    money: 4
  }
}
