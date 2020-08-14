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

const ATK_TESTATA_MULTIPLIER = 10

const ATK_DAMAGE_PETO_MULTIPLIER = 0.7
const MAG_DAMAGE_PETO_MULTIPLIER = 0.2
const ATK_HEAL_PETO_MULTIPLIER = 2
const MAG_HEAL_PETO_MULTIPLIER = 1

const MAG_DMG_INTOSSICAZIONE_MULTIPLIER = 2
export default {
  ATK: {
    CEFFONE: {
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
        }
      }
    },
    TESTATA: {
      name: 'Testata',
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
        }
      }
    }
  },

  MAG: {
    PETO: {
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
      name: 'Intossicazione',
      color: '#cc3399',
      description: 'Una magia basilare, i danni non sono eccezionali ma applica INTOSSICATO',
      log: '{MONSTER} subisce {DAMAGE} danni grazie ad intossicazione',
      cost: {
        hp: 0,
        mana: 5
      },
      effect: {
        monster: {
          damage: (params, player, monster, commit) => calculateDamage(monster, params, 5, (params.MAG * MAG_DMG_INTOSSICAZIONE_MULTIPLIER)),
          debuff: (player) => ({
            type: 'EFFECT',
            name: 'INTOSSICATO',
            quantity: 1
          })
        }
      }
    }
  }

}
