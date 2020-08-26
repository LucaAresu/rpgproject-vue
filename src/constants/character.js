const ATK_STR_MULTIPLIER = 4.34
const ATK_AGI_MULTIPLIER = 1.35

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
const AGI_CRIT_MULTIPLIER = 3.45

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
    Attacco: (level, { STR, AGI }, player) => {
      if (player.talents.ASSASSIN.SWIFTNESS >= 1) {
        return Math.round(STR * ATK_STR_MULTIPLIER + level * ATK_LVL_MULTIPLIER + ATK_AGI_MULTIPLIER * AGI)
      }
      return Math.round(STR * ATK_STR_MULTIPLIER + level * ATK_LVL_MULTIPLIER)
    },
    Magia: (level, { MAG }, player) => Math.round(Math.pow(MAG, MAG_MAG_MULTIPLIER) * Math.pow(level, MAG_LVL_MULTIPLIER)),
    Mana: (level, { MAG }, character) => {
      switch (character.class) {
        case 'WARRIOR': return BASE_RAGE
        case 'MAGE': return BASE_MANA
      }
    },

    Schivata: (level, { AGI }, player) => {
      let schivata = (BASE_DODGE + ((AGI * AGI) / (DODGE_DIVIDER * level))).toFixed(2)
      if (schivata > 100) {
        schivata = 100
      }
      return schivata
    },

    HP: (level, { VIT }, player) => {
      let hp = BASE_HP + (HP_LVL_MULTIPLIER * level) + (HP_VIT_MULTIPLIER * VIT)
      if (player.talents.TANK.DURABLE) {
        const DURABLE_LV1 = 10
        const DURABLE_LV2 = 20
        const DURABLE_LV3 = 50
        let increase
        switch (player.talents.TANK.DURABLE) {
          case 1: increase = DURABLE_LV1; break
          case 2: increase = DURABLE_LV2; break
          case 3: increase = DURABLE_LV3; break
        }
        hp += Math.round((hp * increase) / 100)
      }
      return hp
    },

    Critico: (level, { LUCK, AGI }, player) => {
      let crit
      if (player.talents.ASSASSIN.SWIFTNESS >= 1) {
        crit = (BASE_CRITICAL + ((LUCK * LUCK) + (AGI * AGI_CRIT_MULTIPLIER) / (CRITICAL_DIVIDER * level))).toFixed(2)
      } else {
        crit = (BASE_CRITICAL + ((LUCK * LUCK) / (CRITICAL_DIVIDER * level))).toFixed(2)
      }
      if (!player.talents.ASSASSIN.CRITPOWER) {
        if (crit >= 100) {
          crit = 100
        }
      }

      return crit
    }
  },
  strings: {
    nextLevel: 'Complimenti! Hai appena raggiunto il livello {LEVEL}'
  }
}
