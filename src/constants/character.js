const ATK_STR_MULTIPLIER = 4.34
const ATK_LVL_MULTIPLIER = 1.16

const MAG_MAG_MULTIPLIER = 1.584
const MAG_LVL_MULTIPLIER = 1.0064

const BASE_MANA = 200
const BASE_RAGE = 100

const BASE_DODGE = 10
const DODGE_DIVIDER = 25

const BASE_HP = 250
const HP_VIT_MULTIPLIER = 98
const HP_LVL_MULTIPLIER = 25

const BASE_CRITICAL = 20
const CRITICAL_DIVIDER = 8

export default {
  totalCharacters: 6,
  exp: {
    base: 100
  },
  stats: {
    base: 10,
    perLevel: 5
  },
  baseTalents: 15,
  statOrder: [
    'STR', 'MAG', 'AGI', 'VIT', 'LUCK'
  ],
  paramOrder: [
    'Attacco', 'Magia', 'Mana', 'Schivata', 'HP', 'Critico'
  ],
  paramFormulas: {
    Attacco: (level, { STR }) => Math.round(STR * ATK_STR_MULTIPLIER + level * ATK_LVL_MULTIPLIER),
    Magia: (level, { MAG }) => Math.round(Math.pow(MAG, MAG_MAG_MULTIPLIER) * Math.pow(level, MAG_LVL_MULTIPLIER)),
    Mana: (level, { MAG }, character) => {
      switch (character.class) {
        case 'WARRIOR': return BASE_RAGE
        case 'MAGE': return BASE_MANA
      }
    },
    Schivata: (level, { AGI }) => (BASE_DODGE + ((AGI * AGI) / (DODGE_DIVIDER * level))).toFixed(2),
    HP: (level, { VIT }) => BASE_HP + (HP_LVL_MULTIPLIER * level) + (HP_VIT_MULTIPLIER * VIT),
    Critico: (level, { LUCK }) => (BASE_CRITICAL + ((LUCK * LUCK) / (CRITICAL_DIVIDER * level))).toFixed(2)
  },
  strings: {
    nextLevel: 'Complimenti! Hai appena raggiunto il livello {LEVEL}'
  }
}
