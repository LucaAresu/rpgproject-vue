import monsters from './monsters'
const MIN_MONEY_NORMAL = 20
const MAX_MONEY_NORMAL = 60

const MIN_MONEY_BIG = 50
const MAX_MONEY_BIG = 150

const MIN_EXP_NORMAL = 99
const MAX_EXP_NORMAL = 99

const EXP_BIG = 100

const MIN_TRAP_DAMAGE_PERCENTAGE = 10
const MAX_TRAP_DAMAGE_PERCENTAGE = 30

const MIN_HEAL_PERCENTAGE = 15
const MAX_HEAL_PERCENTAGE = 50

const monstersArray = Object.keys(monsters.monsters).map(ele => monsters.monsters[ele])

export default {
  rooms: {
    BOSS: {
      icon: 'boss.png',
      color: '#011627',
      click: {
        name: 'startCombat',
        data: {
          fun: maxHp => maxHp,
          log: 'Trovi una stanza sicura e riesci a curarti del tutto!'
        }
      }
    },

    MONEY: {
      icon: 'money.png',
      color: '#f6f4d2',
      click: {
        name: 'addMoney',
        data: {
          fun: level => Math.round((Math.random() * ((MAX_MONEY_NORMAL - MIN_MONEY_NORMAL)) + MIN_MONEY_NORMAL) * (Math.round(level / 2) + 1)),
          log: 'Hai scoperto una stanza con una piccola quantità di soldi! {VALUE} monete sono state aggiunte alla tua sacca'
        }
      }
    },

    BIGMONEY: {
      icon: 'bigmoney.png',
      color: '#2a9d8f',
      click: {
        name: 'addMoney',
        data: {
          fun: level => Math.round((Math.random() * ((MAX_MONEY_BIG - MIN_MONEY_BIG)) + MIN_MONEY_BIG) * (Math.round(level / 3) + 1)),

          log: 'Hai scoperto una stanza con un ENORME quantità di soldi!!! {VALUE} monete sono state aggiunte alla tua sacca'
        }
      }
    },

    EXP: {
      icon: 'exp.png',
      color: '#ade8f4',
      click: {
        name: 'addExpInMap',
        data: {
          fun: () => Math.round((Math.random() * ((MAX_EXP_NORMAL - MIN_EXP_NORMAL)) + MIN_EXP_NORMAL)),
          log: 'Nel cammino trovi una stanza che ti porta a... riflettere, hai guadagnato {VALUE} exp'
        }
      }
    },

    MEGAEXP: {
      icon: 'gwc.png',
      color: '#0096c7',
      click: {
        name: 'addExpInMap',
        data: {
          fun: () => EXP_BIG,
          log: 'E\' il momento di una riflessione COLOSSALE che ti porta a guadagnare {VALUE} exp e tanta felicità'
        }
      }
    },

    TRAP: {
      icon: 'trap.png',
      color: '#e63946',
      click: {
        name: 'takeDamageInMap',
        data: {
          fun: (maxHp) => {
            const percentageDamage = Math.round((Math.random() * ((MAX_TRAP_DAMAGE_PERCENTAGE - MIN_TRAP_DAMAGE_PERCENTAGE)) + MIN_TRAP_DAMAGE_PERCENTAGE))
            return Math.round((maxHp * percentageDamage) / 100)
          },
          log: 'Calpesti una trappola e subisci {VALUE} danni'
        }
      }
    },

    HEAL: {
      icon: 'heal.png',
      color: '#bee3db',
      click: {
        name: 'takeHealInMap',
        data: {
          fun: maxHp => {
            const percentageHeal = Math.round((Math.random() * ((MAX_HEAL_PERCENTAGE - MIN_HEAL_PERCENTAGE)) + MIN_HEAL_PERCENTAGE))
            return Math.round((maxHp * percentageHeal) / 100)
          },
          log: 'Entri in una stanza e hai del tempo per una cura. Ti curi di {VALUE}'
        }
      }
    },

    REFULL: {
      icon: 'refull.png',
      color: '#2a9d8f',
      click: {
        name: 'takeHealInMap',
        data: {
          fun: maxHp => maxHp,
          log: 'Trovi una stanza sicura e riesci a curarti del tutto!'
        }
      }
    },

    MONSTER: {
      icon: 'monster.png',
      color: '#e63946',
      click: {
        name: 'startCombat',
        data: {
          fun: () => ({
            monster: monstersArray[0],
            isElite: 0
          }),
          log: 'Apri la porta e scopri il terribile {NAME}. Bisogna combatterlo!'
        }
      }
    }

  },
  options: {
    minRows: 3,
    minColumns: 3,
    rowDivider: 10,
    columnDivider: 10
  },
  rarity: {
    MONEY: 20,
    BIGMONEY: 2,
    EXP: 20,
    MEGAEXP: 3,
    TRAP: 15,
    HEAL: 10,
    REFULL: 2,
    MONSTER: 1000
  }
}
