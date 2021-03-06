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

const BASTONATA_MANA_REGEN = 50
const BASTONATA_DAMAGE = 1
const BASTONATA_SHATTER_DAMAGE = 5

const ATK_MORSO_MULTIPLIER = 1
const MORSO_RESOURCE_GENERATE = 10

const ATK_SCHIACCIANOCI_MULTIPLIER = 10
const SCHIACCIANOCI_RESOURCE_GENERATE = 20

const ATK_INTOSSICAZIONE_MULTIPLIER = 3

const ATK_BACKSTAB_MULTIPLIER = 15

const ATK_BERSERK_MULTIPLIER_PLEB = 3
const ATK_HEAL_BERSERK_PLEB = 2
const ATK_BERSERK_MULTIPLIER_BUFF = 8
const ATK_HEAL_BERSERK_BUFF = 5

const COLPOMAGNETICO_ATK_MULTIPLIER = 6.42

const IGOR_ATK_MULTIPLIER_PLEB = 2.12
const IGOR_ATK_MULTIPLIER_BUFF = 4.25

const IGORPOWER_ATK_MULTIPLIER_PLEB = 15.24

const ATK_DAMAGE_PETO_MULTIPLIER = 2
const MAG_DAMAGE_PETO_MULTIPLIER = 2
const ATK_HEAL_PETO_MULTIPLIER = 2
const MAG_HEAL_PETO_MULTIPLIER = 1

const MAG_DMG_INTOSSICAZIONE_MULTIPLIER = 2

const MAG_DMG_GAVETTONEALLAMERDA_MULTIPLIER = 0.5

const MAG_DMG_HYDRO_MULTIPLIER = 2

const SCARICACINETICA_MAG_MULTIPLIER = 1.96

const CITRULLO_MAG_MULTIPLIER_PLEB = 0.59
const CITRULLO_MAG_MULTIPLIER_BUFF = 0.89
const CITRULLO_HEAL_MAG_MULTIPLIER_PLEB = 0.12
const CITRULLO_HEAL_MAG_MULTIPLIER_BUFF = 0.45

export default {
  ATK: {
    CEFFONE: {
      key: 'CEFFONE',
      name: 'Ceffone',
      isClass: 'WARRIOR',
      color: '#f6bd60',
      description: 'Un ceffone, moderatamente doloroso, ma capace di mettere in riga (quasi) chiunque. E\' ora di farsi rispettare!',
      log: 'Tiri un ceffone fortissimo a {MONSTER} e riceve {DAMAGE} danni',
      cost: player => ({
        hp: 0,
        mana: 0
      }),
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
      cost: player => ({
        hp: 10,
        mana: 0
      }),
      effect: {
        monster: {
          damage: (params, player, monster, commit) => calculateDamage(monster, params, 20, params.ATK * ATK_TESTATA_MULTIPLIER)
        },
        player: {
          resource: player => TESTATA_RESOURCE_GENERATE
        }
      }
    },
    BASTONATA: {
      key: 'BASTONATA',
      name: 'Bastonata',
      isClass: 'MAGE',
      color: '#dda15e',
      description: 'Anche i maghi possono farsi rispettare con una bella bastonata... danni ridicoli, ma almeno ti fa recuperare un po di mana',
      log: 'Tiri una "potentissima" bastonata a {MONSTER} e soffre ben {DAMAGE} danno',
      cost: player => ({
        hp: 0,
        mana: 0
      }),
      effect: {
        monster: {
          damage: (params, player, monster, commit, dispatch) => {
            if (player.talents.MAGEWARRIOR.SHATTER) {
              const shatterLevel = player.talents.MAGEWARRIOR.SHATTER
              let breakPercentage
              switch (shatterLevel) {
                case 1: breakPercentage = 25; break
                case 2: breakPercentage = 50; break
                case 3: breakPercentage = 100; break
              }
              if (Math.random() * 100 < breakPercentage) {
                commit('SET_MONSTER_DEBUFF', {
                  name: 'CONGELATO',
                  quantity: 0
                })
                // TALENTO ICEAGE
                if (player.talents.MAGEWARRIOR.ICEAGE) {
                  let heal
                  let mana
                  switch (player.talents.MAGEWARRIOR.ICEAGE) {
                    case 1: heal = player.maxHp / 2; mana = player.maxMana / 2; break
                    case 2: heal = player.maxHp; mana = player.maxMana; break
                  }
                  dispatch('healMana', mana)
                  dispatch('playerHeal', {
                    message: 'Gli effetti dell\'era glaciale ti fanno rigenerare vita e mana',
                    heal: heal
                  })
                }
                // FINE ICEAGE
                // TALENTO BRAINFREEZE
                if (player.talents.MAGEWARRIOR.BRAINFREEZE) {
                  const talentLevel = player.talents.MAGEWARRIOR.BRAINFREEZE
                  let duration
                  switch (talentLevel) {
                    case 1: duration = 1000; break
                    case 2: duration = 2000; break
                    case 3: duration = 3000; break
                    default: duration = 0; break
                  }
                  dispatch('freezeMonsterAtb', duration)
                }
                // FINE BRAINFREEZE
                return calculateDamage(monster, params, 20, params.MAG * BASTONATA_SHATTER_DAMAGE)
              }
            }
            return BASTONATA_DAMAGE
          }
        },
        player: {
          resource: player => BASTONATA_MANA_REGEN
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
      cost: player => ({
        hp: 0,
        mana: 20
      }),
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
      cost: player => ({
        hp: 0,
        mana: 0
      }),
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
      cost: player => ({
        hp: 0,
        mana: 20
      }),
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
      cost: player => ({
        hp: 0,
        mana: 50
      }),
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
    },

    BERSERK: {
      key: 'BERSERK',
      name: 'Berserk',
      color: '#6930c3',
      description: 'Beh è ora di picchiare in autorun... una volta andato in berserk o muori tu o il mostro',
      log: 'Carichi {MONSTER} ciecamente e riceve {DAMAGE} danni',
      isTalent: true,
      talentLocation: {
        tree: 'TANK',
        name: 'BERSERK'
      },
      cost: player => {
        let hp = 50
        if (player.isInBerserk) {
          hp = 0
        }
        return {
          hp,
          mana: 0
        }
      },
      effect: {
        monster: {
          damage: (params, player, monster, commit, dispatch) => {
            dispatch('berserkTime')
            dispatch('healMana', 10)
            if (player.talents.TANK.BERSERK >= 3) {
              return calculateDamage(monster, params, 90, params.ATK * ATK_BERSERK_MULTIPLIER_BUFF)
            }
            return calculateDamage(monster, params, 90, params.ATK * ATK_BERSERK_MULTIPLIER_PLEB)
          }
        },
        player: {
          heal: (params, player) => {
            const berserkLevel = player.talents.TANK.BERSERK
            switch (berserkLevel) {
              case 1: return 0
              case 2: return Math.round(params.ATK * ATK_HEAL_BERSERK_PLEB)
              case 3: return Math.round(params.ATK * ATK_HEAL_BERSERK_BUFF)
              default: return 0
            }
          }
        }
      }
    },
    COLPOMAGNETICO: {
      key: 'COLPOMAGNETICO',
      name: 'Colpo Magnetico',
      isClass: 'ZOOLOGIST',
      color: '#adb5bd',
      description: 'Danni moderati, genera affinità fisica',
      log: 'Sfrutti la forza magnetica dell\'aria per infliggere {DAMAGE} danni a {MONSTER}',
      cost: player => ({
        hp: 0,
        mana: 0
      }),
      effect: {
        monster: {
          damage: (params, player, monster, commit, dispatch) => {
            const mimetizzazione = player.talents.JUNGLEKING.MIMETIZZAZIONE
            let affinityGenerated = 10
            if (mimetizzazione >= 2) {
              affinityGenerated += 10
            }
            dispatch('generateAffinity', {
              type: 'FIS',
              quantity: affinityGenerated
            })
            return calculateDamage(monster, params, 20, params.ATK * COLPOMAGNETICO_ATK_MULTIPLIER)
          }
        }
      }
    },
    IGOR: {
      key: 'IGOR',
      name: 'Igor',
      isClass: 'COMPANION',
      color: '#f6bd60',
      description: 'Un ceffone, moderatamente doloroso, ma capace di mettere in riga (quasi) chiunque. E\' ora di farsi rispettare!',
      log: 'Igor attacca {MONSTER} e riceve {DAMAGE} danni. ROAR',
      cost: player => ({
        hp: 0,
        mana: 0
      }),
      effect: {
        monster: {
          damage: (params, player, monster, commit) => {
            const igor = player.talents.JUNGLEKING.TIGRE
            if (igor < 3) {
              return calculateDamage(monster, params, 20, params.ATK * IGOR_ATK_MULTIPLIER_PLEB)
            } else {
              return calculateDamage(monster, params, 20, params.ATK * IGOR_ATK_MULTIPLIER_BUFF)
            }
          },
          debuff: player => {
            const igor = player.talents.JUNGLEKING.TIGRE
            let quantity = 0
            if (igor >= 2) {
              quantity = 5
            }
            return {
              type: 'ADD',
              name: 'GRAFFIO',
              quantity
            }
          }
        }
      }
    },
    IGORPOWER: {
      key: 'IGORPOWER',
      name: 'Igor Power',
      isClass: 'COMPANION',
      color: '#f6bd60',
      description: 'Un ceffone, moderatamente doloroso, ma capace di mettere in riga (quasi) chiunque. E\' ora di farsi rispettare!',
      log: 'Igor consuma tutta l\'affinità fisica per  attaccare {MONSTER} e infliggere {DAMAGE} danni. ROAR',
      cost: player => ({
        hp: 0,
        mana: 0
      }),
      effect: {
        monster: {
          damage: (params, player, monster, commit, dispatch) => {
            const mimetizzazione = player.talents.JUNGLEKING.MIMETIZZAZIONE
            console.log(mimetizzazione)
            if (mimetizzazione >= 3) {
              dispatch('handleDebuff', {
                type: 'ADD',
                name: 'IGORPOWER',
                quantity: 1,
                receivedBy: 'MONSTER'
              })
            }
            commit('SET_MANA', 0)
            return calculateDamage(monster, params, 20, params.ATK * IGORPOWER_ATK_MULTIPLIER_PLEB)
          },
          debuff: player => ({
            type: 'ADD',
            name: 'MEGAGRAFFIO',
            quantity: 3
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
      cost: player => ({
        hp: 0,
        mana: 5
      }),
      effect: {
        monster: {
          damage: (params, player, monster, commit) => {
            let petoDamage = (params.ATK * ATK_DAMAGE_PETO_MULTIPLIER) + (params.MAG * MAG_DAMAGE_PETO_MULTIPLIER)
            if (player.talents.FARTER.SMELL && player.debuff.PETOFALLITO) {
              const petoStacks = player.debuff.PETOFALLITO
              const SMELL_LV1 = 10
              const SMELL_LV2 = 20
              const SMELL_LV3 = 50
              let bonus
              switch (player.talents.FARTER.SMELL) {
                case 1: bonus = SMELL_LV1; break
                case 2: bonus = SMELL_LV2; break
                case 3: bonus = SMELL_LV3; break
              }
              bonus *= petoStacks
              petoDamage += Math.round(petoDamage * bonus / 100)
            }
            return calculateDamage(monster, params, 30, petoDamage)
          },
          debuff: (player) => {
            let stacks
            switch (player.talents.FARTER.TANFO) {
              case 1: stacks = 5; break
              case 2: stacks = 10; break
              case 3: stacks = 20; break
              default: stacks = 0; break
            }
            return {
              type: 'ADD',
              name: 'TANFO',
              quantity: stacks
            }
          }
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
      cost: player => ({
        hp: 0,
        mana: 5
      }),
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
              type: 'ADD',
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
      cost: player => ({
        hp: 0,
        mana: 25
      }),
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
      cost: player => ({
        hp: 0,
        mana: 5
      }),
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
    },

    GAVETTONEALLAMERDA: {
      key: 'GAVETTONEALLAMERDA',
      name: 'Gavettone alla Merda',
      color: '#8a5a44',
      description: 'Abilità dai danni ridotti, mettte un dot e toglie gli effetti collaterali dei peti',
      log: '{MONSTER} un bel Gavettone alla merda... e {DAMAGE} danni',
      isTalent: true,
      talentLocation: {
        tree: 'FARTER',
        name: 'GAVETTONE'
      },
      cost: player => ({
        hp: 0,
        mana: 15
      }),
      effect: {
        monster: {
          damage: (params, player, monster, commit) => {
            commit('SET_DEBUFF', {
              name: 'PETOFALLITO',
              quantity: 0
            })
            return calculateDamage(monster, params, 5, (params.MAG * MAG_DMG_GAVETTONEALLAMERDA_MULTIPLIER))
          },
          debuff: (player) => {
            let quantity
            switch (player.talents.FARTER.STICKYGAVETTONE) {
              case 1: quantity = 10; break
              case 2: quantity = 15; break
              case 3: quantity = 20; break
              default: quantity = 5; break
            }
            return {
              type: 'ADD',
              name: 'STICKYGAVETTONE',
              quantity
            }
          }
        }
      }
    },

    APOOCALYPSE: {
      key: 'APOOCALYPSE',
      name: 'aPOOcalisse',
      color: '#8a5a44',
      description: 'Danni in base agli stacks dei debuff dei peti, rigenera tutto il mana e la vita',
      log: '{MONSTER} subisce gli effetti di una shitexplosion e subisce {DAMAGE} danni',
      isTalent: true,
      talentLocation: {
        tree: 'FARTER',
        name: 'APOOCALYPSE'
      },
      cost: player => ({
        hp: 0,
        mana: 0
      }),
      effect: {
        monster: {
          damage: (params, player, monster, commit, dispatch) => {
            const tanfo = monster.debuff.TANFO
            const gavettone = monster.debuff.STICKYGAVETTONE
            const multiplier = tanfo + gavettone
            dispatch('healMana', player.maxMana)
            dispatch('playerHeal', {
              message: 'Recuperi tutta la vita grazie alla devastante aPOOcalisse',
              heal: player.maxHp
            })
            commit('SET_MONSTER_DEBUFF', {
              name: 'STICKYGAVETTONE',
              quantity: 1
            })
            commit('SET_MONSTER_DEBUFF', {
              name: 'TANFO',
              quantity: 1
            })
            return calculateDamage(monster, params, 5, (params.MAG * multiplier))
          }
        }
      }
    },
    HYDRO: {
      key: 'HYDRO',
      name: 'Hydro',
      color: '#48bfe3',
      description: 'Danni normali, bagna il nemico',
      log: '{MONSTER} viene bagnato e subisce {DAMAGE} danni',
      isTalent: true,
      talentLocation: {
        tree: 'MAGEWARRIOR',
        name: 'HYDRO'
      },
      cost: player => ({
        hp: 0,
        mana: 10
      }),
      effect: {
        monster: {
          damage: (params, player, monster, commit, dispatch) => calculateDamage(monster, params, 20, (params.MAG * MAG_DMG_HYDRO_MULTIPLIER)),
          debuff: player => {
            let quantity
            switch (player.talents.MAGEWARRIOR.TSUNAMI) {
              case 1: quantity = 2; break
              case 2: quantity = 3; break
              case 3: quantity = 5; break
              default: quantity = 1; break
            }
            return {
              type: 'ADD',
              name: 'BAGNATO',
              quantity
            }
          }
        }
      }
    },

    GLACIAZIONE: {
      key: 'GLACIAZIONE',
      name: 'Glaciazione',
      color: '#9bf6ff',
      description: 'Danni normali, potrebbe congelare un nemico bagnato',
      log: '{MONSTER} viene bagnato e subisce {DAMAGE} danni',
      isTalent: true,
      talentLocation: {
        tree: 'MAGEWARRIOR',
        name: 'HYDRO'
      },
      cost: player => ({
        hp: 0,
        mana: 10
      }),
      effect: {
        monster: {
          damage: (params, player, monster, commit, dispatch) => {
            const bagnatoStacks = monster.debuff.BAGNATO
            if (Math.random() * 100 < bagnatoStacks * 5) {
              commit('SET_MONSTER_DEBUFF', {
                name: 'BAGNATO',
                quantity: 0
              })
              dispatch('handleDebuff', {
                name: 'CONGELATO',
                quantity: 1,
                receivedBy: 'MONSTER'
              })
            }
            return calculateDamage(monster, params, 20, (params.MAG * MAG_DMG_HYDRO_MULTIPLIER))
          }
        }
      }
    },
    SCARICACINETICA: {
      key: 'SCARICACINETICA',
      name: 'Scarica Cinetica',
      isClass: 'ZOOLOGIST',
      color: '#90c2e7',
      description: 'Danni moderati, genera affinità magica',
      log: 'Scarichi l\'energia cinetica ambientale su  {MONSTER} e riceve {DAMAGE} danni.',
      cost: player => ({
        hp: 0,
        mana: 0
      }),
      effect: {
        monster: {
          damage: (params, player, monster, commit, dispatch) => {
            dispatch('generateAffinity', {
              type: 'MAG',
              quantity: 10
            })
            return calculateDamage(monster, params, 20, params.MAG * SCARICACINETICA_MAG_MULTIPLIER)
          }
        }
      }
    },
    CITRULLO: {
      key: 'CITRULLO',
      name: 'Citrullo',
      isClass: 'COMPANION',
      color: '#f6bd60',
      description: 'Un ceffone, moderatamente doloroso, ma capace di mettere in riga (quasi) chiunque. E\' ora di farsi rispettare!',
      log: 'Citrullo attacca {MONSTER} e riceve {DAMAGE} danni.',
      cost: player => ({
        hp: 0,
        mana: 0
      }),
      effect: {
        monster: {
          damage: (params, player, monster, commit) => {
            const citrullo = player.talents.JUNGLEKING.MAGICBIRD
            if (citrullo >= 3) {
              return calculateDamage(monster, params, 10, params.MAG * CITRULLO_MAG_MULTIPLIER_BUFF)
            }
            return calculateDamage(monster, params, 10, params.MAG * CITRULLO_MAG_MULTIPLIER_PLEB)
          }
        },
        player: {
          heal: (params, player) => {
            const citrullo = player.talents.JUNGLEKING.MAGICBIRD
            switch (citrullo) {
              case 1: return 0
              case 2: return Math.round(params.MAG * CITRULLO_HEAL_MAG_MULTIPLIER_PLEB)
              case 3: return Math.round(params.MAG * CITRULLO_HEAL_MAG_MULTIPLIER_BUFF)
              default: return 0
            }
          }
        }
      }
    }
  }
}
