const bosses = {
  KING_MERDINO: {
    levels: {
      start: 1,
      end: 20
    },
    name: 'King Merdino',
    icon: 'boss/kingmerdino.png',
    description: 'Il re dei merdini, ruolo acquisito grazie al ritrovamento della sua inseparabile corona, si dice che sconfiggendolo si può acquisire la sua corona, e una gran saggezza',
    defeatedSentence: 'I merdini sono finalmente liberi di girovagare per il castello, apri la porta e finalmente aria fresca... ',
    stats: {
      HP: 10000,
      ATK: 15,
      MAG: 15,
      DEF: 30
    },
    cooldown: 8000,
    drop: {
      exp: 100,
      money: 2000,
      talents: 3,
      keys: 1,
      item: {
        dropRate: 25,
        info: {
          rarity: 4,
          slot: null
        }
      },
      fixedItem: {
        dropRate: 100,
        info: {
          slot: 'weapon',
          rarity: 0,
          icon: 'head/cascoprotettivo.png',
          name: 'Furiatonante, lama benedetta del pessimo traduttore',
          description: 'Quando il pericolo è che google translate ti rubi il lavoro...',
          stats: {
            STR: 0,
            MAG: 0,
            AGI: 0,
            VIT: 0,
            LUCK: 5
          },
          cost: 1
        }
      }
    },
    attacks: ['SUPERPETO', 'PETOSORPRESA'],
    firstAttack: 'PETO'
  }
}

export default bosses
