const critFormula = (damage, crit) => {
  let extra = Math.floor(crit / 100)
  const remaining = crit % 100
  const roll = (Math.random() * 100).toFixed(2)
  if (roll <= remaining) { // ha crittato
    extra += 1
  }
  return (damage * (Math.pow(2, extra))).toFixed(0)
}
// prende il danno e aumenta o diminusce il valore di una percentuale (oscillation)
const damageOscillation = (damage, oscillation) => {
  const oscillatePercent = Math.random() * oscillation
  const damagePercent = (damage * oscillatePercent) / 100
  if (Math.random() * 100 > 50) {
    return damage + damagePercent
  }
  return damage - damagePercent
}
const MONSTER_ARMOR_MULTIPLIER = 1
const monsterArmorReduction = (monster, damage) => {
  damage -= Math.round(monster.stats.DEF * MONSTER_ARMOR_MULTIPLIER)
  if (damage < 0) {
    damage = 0
  }
  return damage
}

const calculateDamage = (monster, params, oscillation, damage) => monsterArmorReduction(monster, critFormula(damageOscillation(damage, oscillation), params.CRIT))
// aggiungere riduzione del danno in base all'armor

const ATK_CEFFONE_MULTIPLIER = 1.5
const CEFFONE_RESOURCE_GENERATE = 10

const ATK_TESTATA_MULTIPLIER = 10
const TESTATA_RESOURCE_GENERATE = 20

const ATK_MORSO_MULTIPLIER = 1
const MORSO_RESOURCE_GENERATE = 10

const ATK_SCHIACCIANOCI_MULTIPLIER = 10
const SCHIACCIANOCI_RESOURCE_GENERATE = 20

const ATK_INTOSSICAZIONE_MULTIPLIER = 3

const ATK_BACKSTAB_MULTIPLIER = 15

const ATK_DAMAGE_PETO_MULTIPLIER = 0.7
const MAG_DAMAGE_PETO_MULTIPLIER = 0.2
const ATK_HEAL_PETO_MULTIPLIER = 2
const MAG_HEAL_PETO_MULTIPLIER = 1

const MAG_DMG_INTOSSICAZIONE_MULTIPLIER = 2

export default {
  ATK: {
    CEFFONE: {
      key: 'CEFFONE',
      name: 'Ceffone',
      color: '#f6bd60',
      description: 'Un ceffone, moderatamente doloroso, ma capace di mettere in riga (quasi) chiunque. E\' ora di farsi rispettare!',
      log: 'Tiri un ceffone fortissimo a {MONSTER} e riceve {DAMAGE} danni',
      cost: {
        hp: 0,
        mana: 0
      },
      effect: {
        monster: {
          damage: (params, player, monster, commit) => calculateDamage(monster, params, 20, params.ATK * ATK_CEFFONE_MULTIPLIER)
        },
        player: {
          resource: player => CEFFONE_RESOURCE_GENERATE
        }
      }
    },
    TESTATA: {
      key: 'TESTATA',
      name: 'Testata',
      isClass: 'WARRIOR',
      color: '#d62828',
      description: 'Bisogna avere la testa davvero dura per poter pensare di usarla come arma... più forte e più dolorosa di un ceffone.',
      log: '{MONSTER} si becca una testata, gli fai {DAMAGE} danni ma ne subisci {COST}',
      cost: {
        hp: 10,
        mana: 0
      },
      effect: {
        monster: {
          damage: (params, player, monster, commit) => calculateDamage(monster, params, 20, params.ATK * ATK_TESTATA_MULTIPLIER)
        },
        player: {
          resource: player => TESTATA_RESOURCE_GENERATE
        }
      }
    },

    MORSO: {
      key: 'MORSO',
      name: 'Morso',
      color: '#edf2f4',
      isTalent: true,
      talentLocation: {
        tree: 'BITER',
        name: 'MORSO'
      },
      description: 'E\' ora di tirar fuori i denti e addentare i nemici, soffriranno di modesti danni subito, e una percentuale della loro vita successivamente',
      log: 'Addenti {MONSTER}, e non lo molli più, soffre {DAMAGE} danni',
      cost: {
        hp: 0,
        mana: 20
      },
      effect: {
        monster: {
          damage: (params, player, monster, commit) => calculateDamage(monster, params, 35, params.ATK * ATK_MORSO_MULTIPLIER),
          debuff: (player) => {
            let stacks
            switch (player.talents.BITER.BITEDOT) {
              case 1: stacks = 5; break
              case 2: stacks = 10; break
              case 3: stacks = 20; break
              default: stacks = 2; break
            }
            return {
              type: 'ADD',
              name: 'BLEED',
              quantity: stacks
            }
          }
        },
        player: {
          resource: player => MORSO_RESOURCE_GENERATE
        }
      }
    },
    SCHIACCIANOCI: {
      key: 'SCHIACCIANOCI',
      name: 'Schiaccianoci',
      color: '#efd3d7',
      isTalent: true,
      talentLocation: {
        tree: 'BITER',
        name: 'SCHIACCIANOCI'
      },
      description: 'Colpo che può essere davvero letale, dai danni ridotti in base a circostanze... esterne, Azzera la Rage, se si fa quando si ha la rabbia al massimo applica un dot',
      log: 'Tiri una padellata alle noccioline di {MONSTER}, gli fai {DAMAGE} danni',
      cost: {
        hp: 0,
        mana: 0
      },
      effect: {
        monster: {
          damage: (params, player, monster, commit) => {
            commit('SET_MANA', 0)
            return calculateDamage(monster, params, 70, params.ATK * ATK_SCHIACCIANOCI_MULTIPLIER)
          },
          debuff: (player) => {
            let stacks = 0
            if (player.currentMana === player.maxMana) {
              switch (player.talents.BITER.SONOPOTENTE) {
                case 2: stacks = 3; break
                case 3: stacks = 4; break
                default: stacks = 2; break
              }
            }
            return {
              type: 'ADD',
              name: 'BALLBUSTED',
              quantity: stacks
            }
          }
        },
        player: {
          resource: player => SCHIACCIANOCI_RESOURCE_GENERATE
        }
      }
    },

    INTOSSICAZIONE: {
      key: 'INTOSSICAZIONE',
      name: 'Intossicazione',
      color: '#ffd166',
      isTalent: true,
      talentLocation: {
        tree: 'ASSASSIN',
        name: 'INTOSSICATION'
      },
      description: 'Colpo dalla media potenza. Avvelena',
      log: 'Approfitti della distrazione di {MONSTER} per intossicarlo, gli fai {DAMAGE} danni',
      cost: {
        hp: 0,
        mana: 20
      },
      effect: {
        monster: {
          damage: (params, player, monster, commit) => calculateDamage(monster, params, 75, params.ATK * ATK_INTOSSICAZIONE_MULTIPLIER),
          debuff: (player) => ({
            type: 'ADD',
            name: 'INTOSSICATED',
            quantity: 5
          })
        }
      }
    },
    BACKSTAB: {
      key: 'BACKSTAB',
      name: 'Attacco alle spalle',
      color: '#f94144',
      isTalent: true,
      talentLocation: {
        tree: 'ASSASSIN',
        name: 'BACKSTAB'
      },
      description: 'Colpo di elevata potenza. Avvelena e applica distrutto. Ouch',
      log: 'Sfrutti l\'apertura lasciata da {MONSTER} e lo attacchi alle spalle facendo {DAMAGE} danno',
      cost: {
        hp: 0,
        mana: 50
      },
      effect: {
        monster: {
          damage: (params, player, monster, commit) => calculateDamage(monster, params, 75, params.ATK * ATK_BACKSTAB_MULTIPLIER),
          debuff: (player) => ({
            type: 'ADD',
            name: 'DEADLYPOISON',
            quantity: 5
          })
        }
      }
    }
  },

  MAG: {
    PETO: {
      key: 'PETO',
      name: 'Peto',
      color: '#b2967d',
      description: 'Anche se tecnicamente è una magia, si basa sulla forza, ma anche i maghi possono beneficiare della cura ricevuta. Attenzione a farne troppi, potrebbero esserci delle conseguenze...',
      log: 'Ti concentri e tiri un peto più forte che puoi. {MONSTER} subisce {DAMAGE} danni e ti curi di {HEAL}',
      cost: {
        hp: 0,
        mana: 5
      },
      effect: {
        monster: {
          damage: (params, player, monster, commit) => calculateDamage(monster, params, 30, (params.ATK * ATK_DAMAGE_PETO_MULTIPLIER) + (params.MAG * MAG_DAMAGE_PETO_MULTIPLIER))
        },
        player: {
          heal: (params, player) => Math.round((params.ATK * ATK_HEAL_PETO_MULTIPLIER) + (params.MAG * MAG_HEAL_PETO_MULTIPLIER)),
          debuff: (player) => ({
            type: 'ADD',
            name: 'PETOFALLITO',
            quantity: 1
          })
        }
      }
    },

    INTOSSICAZIONE: {
      key: 'INTOSSICAZIONE',
      name: 'Intossicazione',
      color: '#cc3399',
      description: 'Una magia basilare, i danni non sono eccezionali ma applica INTOSSICATO',
      log: '{MONSTER} subisce {DAMAGE} danni grazie ad intossicazione',
      isClass: 'MAGE',
      cost: {
        hp: 0,
        mana: 5
      },
      effect: {
        monster: {
          damage: (params, player, monster, commit) => calculateDamage(monster, params, 5, (params.MAG * MAG_DMG_INTOSSICAZIONE_MULTIPLIER)),
          debuff: (player) => {
            let quantity
            switch (player.talents.TOXICOLOGIST.MASTERDRUG) {
              case 1: quantity = 2; break
              case 2: quantity = 3; break
              case 3: quantity = 5; break
              default: quantity = 1; break
            }
            return {
              type: 'EFFECT',
              name: 'INTOSSICATO',
              quantity
            }
          }
        }
      }
    },
    OVERDOSE: {
      key: 'OVERDOSE',
      name: 'Overdose',
      color: '#ffc6ff',
      description: 'Consuma stack di INTOSSICATO e fa danni in proporzione',
      log: 'Scateni un malore in {MONSTER} e subisce {DAMAGE} danni',
      isTalent: true,
      talentLocation: {
        tree: 'TOXICOLOGIST',
        name: 'OVERDOSE'
      },
      cost: {
        hp: 0,
        mana: 25
      },
      effect: {
        monster: {
          damage: (params, player, monster, commit) => {
            const stacksIntossicato = monster.debuff.INTOSSICATO
            // talento SHORTARMS
            const shortArms = player.talents.TOXICOLOGIST.SHORTARMS
            if (!shortArms) {
              commit('RESET_MONSTER_DEBUFF', 'INTOSSICATO')
            } else {
              let reduction
              switch (shortArms) {
                case 1: reduction = 25; break
                case 2: reduction = 50; break
                case 3: reduction = 75; break
              }
              const quantity = Math.round(stacksIntossicato - (stacksIntossicato * reduction) / 100) * -1
              commit('ADD_MONSTER_DEBUFF', {
                name: 'INTOSSICATO',
                quantity
              })
            }
            return calculateDamage(monster, params, 25, (params.MAG * stacksIntossicato))
          }
        }
      }
    },
    TOXICADDICTED: {
      key: 'TOXICADDICTED',
      name: 'Asuefatto',
      color: '#06d6a0',
      description: 'Consuma stack di INTOSSICATO e cura in proporzione',
      log: 'Consumi tutta la tossicità di {MONSTER} per curarti di {HEAL}, ti senti meglio',
      isTalent: true,
      talentLocation: {
        tree: 'TOXICOLOGIST',
        name: 'TOXICADDICTED'
      },
      cost: {
        hp: 0,
        mana: 5
      },
      effect: {
        player: {
          heal: (params, player, monster, commit, dispatch) => {
            const stacksIntossicato = monster.debuff.INTOSSICATO
            // talento SHORTARMS
            const shortArms = player.talents.TOXICOLOGIST.SHORTARMS
            if (!shortArms) {
              commit('RESET_MONSTER_DEBUFF', 'INTOSSICATO')
            } else {
              let reduction
              switch (shortArms) {
                case 1: reduction = 25; break
                case 2: reduction = 50; break
                case 3: reduction = 75; break
              }
              const quantity = Math.round(stacksIntossicato - (stacksIntossicato * reduction) / 100) * -1
              commit('ADD_MONSTER_DEBUFF', {
                name: 'INTOSSICATO',
                quantity
              })
            }
            // talento ADDICTIONPOWER
            const addiction = player.talents.TOXICOLOGIST.ADDICTIONPOWER
            if (addiction) {
              let mana = 0
              switch (addiction) {
                case 1: mana = 5; break
                case 2: mana = 10; break
                case 3: mana = 20; break
              }
              dispatch('healMana', mana)
            }
            return Math.round(params.MAG * stacksIntossicato)
          }
        }
      }
    }

  }

}
