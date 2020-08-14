export default {
  WARRIOR: {
    key: 'WARRIOR',
    name: 'Guerriero',
    color: '#895737',
    viewcolor: '#c97c5d',
    talents: {

    }
  },
  TOXICOLOGIST: {
    key: 'TOXICOLOGIST',
    name: 'Tossicologo',
    color: '#957fef',
    viewcolor: '#dee2ff',
    talents: {

    }
  },
  ASSASSIN: {
    key: 'ASSASSIN',
    name: 'Assassino',
    color: '#ffcc00',
    viewcolor: '#e9ff70',
    talents: {

    }
  },
  EXPLORER: {
    key: 'EXPLORER',
    name: 'Esploratore',
    color: '#386641',
    viewcolor: '#90be6d',
    maxTier: 3,
    talents: {
      SCAN: {
        key: 'SCAN',
        tier: 1,
        name: 'Scan',
        icon: 'scan.png',
        maxLevel: 3,
        description: [
          'Ti permette di vedere le stat del mob',
          'Ti permette di vedere la barra ATB del mob e il suo attacco successivo',
          'Ti permette di vedere gli attacchi del mob e i suoi drop'
        ]
      },
      DISCOVER: {
        key: 'DISCOVER',
        tier: 1,
        name: 'Analizzatore',
        icon: 'discover.png',
        maxLevel: 3,
        description: [
          'Puoi vedere in anticipo il contenuto di 2 stanze',
          'Puoi vedere in anticipo il contenuto di 5 stanze',
          'Puoi vedere in anticipo il contenuto di tutte le stanze'
        ]
      },
      EXPER: {
        key: 'EXPER',
        tier: 2,
        name: 'Maestro dell\' esperienza',
        icon: 'exper.jpg',
        maxLevel: 1,
        description: [
          'Radoppia l\'esperienza che ricevi'
        ],
        requires: { name: 'DISCOVER', level: 3 }
      },
      NOTRAP: {
        key: 'NOTRAP',
        tier: 2,
        name: 'Sesto senso',
        icon: 'notrap.jpg',
        maxLevel: 3,
        description: [
          'Prendi il 30% di danni in meno dalle trappole',
          'Prendi il 60% di danni in meno dalle trappole',
          'Sei immune ai danni delle trappole'
        ],
        requires: { name: 'SCAN', level: 3 }
      },
      LUCKER: {
        key: 'LUCKER',
        tier: 3,
        name: 'Fortunello',
        icon: 'lucker.png',
        maxLevel: 3,
        description: [
          'Guadagni il doppio delle monete dalle stanze che ne forniscono',
          'Guadagni il doppio delle statistiche dalle stanze che ne forniscono',
          'Guadagni il doppio dei talenti dalle stanze che ne forniscono'
        ],
        requires: { name: 'NOTRAP', level: 3 }
      }
    }
  }
}
