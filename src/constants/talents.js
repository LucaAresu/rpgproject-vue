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
    maxTier: 4,
    talents: {
      OVERDOSE: {
        key: 'OVERDOSE',
        tier: 1,
        name: 'Overdose',
        icon: 'overdose.png',
        maxLevel: 1,
        description: [
          'ABILITA\': Fa danni in proporzione agli stack di INTOSSICATO applicati al mostro. Li consuma tutti'
        ]
      },
      TOXICADDICTED: {
        key: 'TOXICADDICTED',
        tier: 1,
        name: 'Dipendente dalle tossine',
        icon: 'addicted.png',
        maxLevel: 1,
        description: [
          'ABILITA\': Ti cura e consuma stack di INTOSSICATO'
        ]
      },
      MASTERDRUG: {
        key: 'MASTERDRUG',
        tier: 2,
        name: 'Maestro delle sostanze',
        icon: 'masterdrug.png',
        maxLevel: 3,
        description: [
          'Ogni volta che fai Intossicazione applichi 2 stacks di INTOSSICATO',
          'Ogni volta che fai Intossicazione applichi 3 stacks di INTOSSICATO',
          'Ogni volta che fai Intossicazione applichi 5 stacks di INTOSSICATO'
        ],
        requires: { name: 'OVERDOSE', level: 1 }
      },
      ADDICTIONPOWER: {
        key: 'ADDICTIONPOWER',
        tier: 2,
        name: 'La forza della dipendenza',
        icon: 'addictionpower.jpg',
        maxLevel: 3,
        description: [
          'Ogni volta che usi Dipendente dalle tossine rigeneri 5 mana',
          'Ogni volta che usi Dipendente dalle tossine rigeneri 10 mana',
          'Ogni volta che usi Dipendente dalle tossine rigeneri 20 mana'
        ],
        requires: { name: 'TOXICADDICTED', level: 1 }
      },
      SHORTARMS: {
        key: 'SHORTARMS',
        tier: 3,
        name: 'Braccino corto',
        icon: 'shortarms.jpg',
        maxLevel: 3,
        description: [
          'Quando consumi gli stack di Intossicato ne consumi il 25% invece di consumarli tutti',
          'Quando consumi gli stack di Intossicato ne consumi il 50% invece di consumarli tutti',
          'Quando consumi gli stack di Intossicato ne consumi il 75% invece di consumarli tutti'
        ],
        requires: { name: 'ADDICTIONPOWER', level: 3 }
      },
      TRASCINATORE: {
        key: 'TRASCINATORE',
        tier: 4,
        name: 'Trascinatore',
        icon: 'trascinatore.png',
        maxLevel: 3,
        description: [
          'Il limite degli stack di intossicato sale a 20',
          'Il limite degli stack di intossicato sale a 30',
          'Il limite degli stack di intossicato sale a 50'

        ]
      }
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
          'Puoi vedere in anticipo il contenuto di 2 stanze a partire dal piano successivo',
          'Puoi vedere in anticipo il contenuto di 5 stanze a partire dal piano successivo',
          'Puoi vedere in anticipo il contenuto di tutte le stanze a partire dal piano successivo'
        ]
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
      EXPER: {
        key: 'EXPER',
        tier: 2,
        name: 'Maestro dell\' esperienza',
        icon: 'exper.jpg',
        maxLevel: 1,
        description: [
          'Radoppia l\'esperienza che ricevi (nei vari posti viene scritto il valore base perchè non ho voglia di controllare ovunque ho messo il log)'
        ],
        requires: { name: 'DISCOVER', level: 3 }
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
