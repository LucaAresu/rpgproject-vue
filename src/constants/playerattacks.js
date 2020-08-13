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

const calculateDamage = (params, oscillation, damage) => critFormula(damageOscillation(damage, oscillation), params.CRIT)
// aggiungere riduzione del danno in base all'armor

const ATK_BASE_MULTIPLIER = 1.5
export default {
  ATK: {
    CEFFONE: {
      name: 'Ceffone',
      color: 'red',
      description: 'Un ceffone, moderatamente doloroso, ma capace di mettere in riga (quasi) chiunque. E\' ora di farsi rispettare!',
      cost: {
        hp: 0,
        mana: 0
      },
      effect: {
        monster: {
          damage: (params, monster) => calculateDamage(params, 20, params.ATK * ATK_BASE_MULTIPLIER)
        }
      }
    },
    TESTATA: {
      name: 'Testata',
      color: 'blue',
      description: 'Bisogna avere la testa davvero dura per poter pensare di usarla come arma... più forte e più dolorosa di un ceffone.',
      cost: {
        hp: 10,
        mana: 0
      },
      effect: {
        monster: {
          damage: (params, monster) => calculateDamage(params, 20, params.ATK * ATK_BASE_MULTIPLIER)
        }
      }
    }
  }

}
