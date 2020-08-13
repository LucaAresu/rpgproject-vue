const bosses = {
  KING_MERDINO: {
    levels: {
      start: 1,
      end: 1
    },
    name: 'King Merdino',
    icon: 'boss/kingmerdino.png',
    description: 'Il re dei merdini, ruolo acquisito grazie al ritrovamento della sua inseparabile corona, si dice che sconfiggendolo si può acquisire la sua corona, e una gran saggezza',
    defeatedSentence: 'I merdini sono finalmente liberi di girovagare per il castello, apri la porta e finalmente aria fresca... ',
    stats: {
      HP: 10000,
      ATK: 1522,
      MAG: 111115,
      DEF: 30
    },
    cooldown: 8000,
    drop: {
      exp: 500,
      money: 2000
    },
    attacks: ['SUPERPETO', 'PETOSORPRESA'],
    firstAttack: 'PETO'
  }
}

export default bosses
