export default {
  monsters: {
    MERDINO: {
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
      exp: 20,
      attacks: ['PETO', 'PETO2'],
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

  }
}
