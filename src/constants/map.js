const MIN_MONEY_NORMAL = 20
const MAX_MONEY_NORMAL = 60

const MIN_MONEY_BIG = 50
const MAX_MONEY_BIG = 150

const MIN_EXP_NORMAL = 30
const MAX_EXP_NORMAL = 50

const EXP_BIG = 100

const MIN_TRAP_DAMAGE_PERCENTAGE = 10
const MAX_TRAP_DAMAGE_PERCENTAGE = 30

const MIN_HEAL_PERCENTAGE = 15
const MAX_HEAL_PERCENTAGE = 50

const MIN_STAT_INCREASE = 3
const MAX_STAT_INCREASE = 8

export default {
  rooms: {
    BOSS: {
      icon: 'boss.png',
      color: '#011627',
      click: {
        name: 'startCombat',
        data: {
          fun: () => 'BOSS',
          log: 'E\' ora di combattere col capo del piano {NAME}: fatti sotto!'
        }
      }
    },

    MONEY: {
      icon: 'money.png',
      color: '#f6f4d2',
      click: {
        name: 'addMoneyInMap',
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
        name: 'addMoneyInMap',
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
          fun: () => 'MONSTER',
          log: 'Apri la porta e scopri il terribile {NAME}. Bisogna combatterlo!'
        }
      }
    },

    ELITE: {
      icon: 'elite.png',
      color: '#540d6e',
      click: {
        name: 'startCombat',
        data: {
          fun: () => 'ELITE',
          log: 'Apri una porta e senti una sete di sangue, sei costretto a combattere un esemplare elite di {NAME}'
        }
      }
    },

    ADDSTR: {
      icon: 'str.png',
      color: '#540d6e',
      click: {
        name: 'incStats',
        data: {
          fun: () => ({
            tipo: 'STR',
            quantity: Math.round((Math.random() * ((MAX_STAT_INCREASE - MIN_STAT_INCREASE)) + MIN_STAT_INCREASE))
          }),
          log: 'Trovi un masso, spostarlo è stato difficile ma hai guadagnato {VALUE} punti in STR'
        }
      }
    },

    ADDMAG: {
      icon: 'mag.png',
      color: '#9cf6f6',
      click: {
        name: 'incStats',
        data: {
          fun: () => ({
            tipo: 'MAG',
            quantity: Math.round((Math.random() * ((MAX_STAT_INCREASE - MIN_STAT_INCREASE)) + MIN_STAT_INCREASE))
          }),
          log: 'Riesci a risolvere un complicato enigma e guadagni {VALUE} punti in MAG'
        }
      }
    },

    ADDAGI: {
      icon: 'agi.png',
      color: '#ffffff',
      click: {
        name: 'incStats',
        data: {
          fun: () => ({
            tipo: 'AGI',
            quantity: Math.round((Math.random() * ((MAX_STAT_INCREASE - MIN_STAT_INCREASE)) + MIN_STAT_INCREASE))
          }),
          log: 'Schivi all\'ultimo secondo un masso. La tua AGI migliora di {VALUE}'
        }
      }
    },

    ADDVIT: {
      icon: 'VIT.png',
      color: '#c5c392',
      click: {
        name: 'incStats',
        data: {
          fun: () => ({
            tipo: 'VIT',
            quantity: Math.round((Math.random() * ((MAX_STAT_INCREASE - MIN_STAT_INCREASE)) + MIN_STAT_INCREASE))
          }),
          log: 'Ti fermi a mangiare un toast, e la tua VIT non può che beneficiarne. LUNGA VITA AI TOAST E AI {VALUE} PUNTI GUADAGNATI'
        }
      }
    },

    ADDLUCK: {
      icon: 'luck.png',
      color: '#d11149',
      click: {
        name: 'incStats',
        data: {
          fun: () => ({
            tipo: 'VIT',
            quantity: Math.round((Math.random() * ((MAX_STAT_INCREASE - MIN_STAT_INCREASE)) + MIN_STAT_INCREASE))
          }),
          log: 'Fai un peto fortissimo, ma non fai nessun danno alla biancheria. Che fortuna! La luck sale di {VALUE}'
        }
      }
    },

    ADDLIBERO: {
      icon: 'libera.png',
      color: '#e6e8e6',
      click: {
        name: 'incStats',
        data: {
          fun: () => ({
            tipo: 'LIBERA',
            quantity: Math.round((Math.random() * ((MAX_STAT_INCREASE - MIN_STAT_INCREASE)) + MIN_STAT_INCREASE))
          }),
          log: 'Ti fermi a riflettere tutto ciò che hai imparato, hai {VALUE} punti stats da mettere liberamente'
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
    EXP: 10,
    MEGAEXP: 3,
    TRAP: 15,
    HEAL: 10,
    REFULL: 2,
    MONSTER: 10,
    ELITE: 2,
    ADDSTR: 3,
    ADDMAG: 3,
    ADDAGI: 3,
    ADDVIT: 3,
    ADDLUCK: 3,
    ADDLIBERO: 1

  }
}
