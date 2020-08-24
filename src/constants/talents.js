export default {
  BITER: {
    class: 'WARRIOR',
    key: 'BITER',
    name: 'Morditore',
    color: '#e63946',
    maxTier: 4,
    viewcolor: '#e56b6f',
    talents: {
      MORSO: {
        key: 'MORSO',
        tier: 1,
        name: 'Morso',
        icon: 'bite.png',
        maxLevel: 1,
        description: [
          'ABILITA\': Fa danni in proporzione e applica Sanguinamento'
        ]
      },
      BITEDOT: {
        key: 'BITEDOT',
        name: 'Addentatore',
        tier: 2,
        icon: 'addentatore.png',
        maxLevel: 3,
        description: [
          'Morso ora applica 5 stack di dot',
          'Morso ora applica 10 stack di dot',
          'Morso ora applica 20 stack di dot'
        ],
        requires: { name: 'MORSO', level: 1 }
      },
      BITEHEAL: {
        key: 'BITEHEAL',
        name: 'Succhiatore di sangue',
        tier: 2,
        icon: 'biteheal.png',
        maxLevel: 3,
        description: [
          'Sanguinamento ti cura di una piccola quantità di salute (1%) e ti da 1 Rage',
          'Sanguinamento ti cura una  quantità di salute (3%) maggiore e ti da 2 Rage',
          'Sanguinamento ti cura una  quantità di salute (5%) discreta e ti da 5 Rage'
        ],
        requires: { name: 'MORSO', level: 1 }
      },
      SCHIACCIANOCI: {
        key: 'SCHIACCIANOCI',
        name: 'Schiaccianoci',
        tier: 3,
        icon: 'schiaccianoci.jpg',
        maxLevel: 1,
        description: [
          'ABILITà: Fa danni moderati, e se si è full rage fa un dot dai danni elevati. Consuma tutta la Rage'
        ],
        requires: { name: 'BITEHEAL', level: 3 }
      },
      SONOPOTENTE: {
        key: 'SONOPOTENTE',
        name: 'SONO POTENTE',
        tier: 4,
        icon: 'sonopotente.jpg',
        maxLevel: 3,
        description: [
          'Sanguinamento ticka più velocemente.',
          'Sanguinamento ticka ancora più velocemente e Dolore alle palle ha 1 tick in più',
          'Sanguinamento ticka velocissimo e Dolore alle palle ha 2 tick in più'
        ],
        requires: { name: 'SCHIACCIANOCI', level: 1 }
      }
    }
  },
  ASSASSIN: {
    class: 'WARRIOR',
    key: 'ASSASSIN',
    name: 'Assassino',
    color: '#ffcc00',
    viewcolor: '#e9ff70',
    maxTier: 4,
    talents: {
      SWIFTNESS: {
        key: 'SWIFTNESS',
        name: 'La potenza dell\' elusione',
        tier: 1,
        icon: 'swiftness.png',
        maxLevel: 3,
        description: [
          'La statistica AGI fornisce anche attacco e critico e quando la barra ATB è piena rigeneri 5 Rage',
          'Quando la barra ATB è piena rigeneri 10 Rage',
          'Quando la barra ATB è piena rigeneri 20 rage'
        ]
      },
      INTOSSICATION: {
        key: 'INTOSSICATION',
        name: 'Intossicazione',
        tier: 1,
        icon: 'intossicazione.jpg',
        maxLevel: 1,
        description: [
          'ABILITA\': Un colpo che avvelena il nemico'
        ]
      },
      DEADLYDODGE: {
        key: 'DEADLYDODGE',
        name: 'Schivata Mortale',
        tier: 2,
        icon: 'deadlydodge.png',
        maxLevel: 3,
        description: [
          'Quando schivi rifletti una piccola quantità di danni che ti sarebbe arrivata',
          'Quando schivi rifletti una media quantità di danni che ti sarebbe arrivata',
          'Quando schivi rifletti una grande quantità di danni che ti sarebbe arrivata'
        ],
        requires: { name: 'SWIFTNESS', level: 3 }
      },
      POISONED: {
        key: 'POISONED',
        name: 'Avvelenamento',
        tier: 2,
        icon: 'poisoned.png',
        maxLevel: 3,
        description: [
          'Ogni tick di avvelenamento mette uno stack di Distrutto. A 50 stack il mostro prende un danno alto',
          'Ogni tick di avvelanamento mette 2 stacks',
          'Ogni tick di avvelenamento mette 3 stacks'
        ],
        requires: { name: 'INTOSSICATION', level: 1 }
      },
      BACKSTAB: {
        key: 'BACKSTAB',
        name: 'Attacco alle spalle',
        tier: 3,
        icon: 'backstab.png',
        maxLevel: 1,
        description: [
          'ABILITA\': Alto costo di energy, avvelena il nemico con un veleno fortissimo, applica 10 stack di Distrutto, e 5 ad ogni tick di dot'
        ],
        requires: { name: 'POISONED', level: 3 }
      },
      CRITPOWER: {
        key: 'CRITPOWER',
        name: 'Re del critico',
        tier: 4,
        icon: 'critpower.png',
        maxLevel: 1,
        description: [
          'La tua probabilità di critico può andare oltre al 100%, I supercritici fanno dei danni devastanti'
        ],
        requires: { name: 'BACKSTAB', level: 1 }
      }

    }
  },

  TANK: {
    class: 'WARRIOR',
    key: 'TANK',
    name: 'Tank',
    color: '#895737',
    viewcolor: '#c97c5d',
    maxTier: 4,
    talents: {
      DEFENDER: {
        key: 'DEFENDER',
        name: 'Difensore',
        tier: 1,
        icon: 'defender.png',
        maxLevel: 3,
        description: [
          'Difendere ti fa riflettere una parte dei danni del mostro e rigenerare 5 rage',
          'Difendere ti fa riflettere una parte dei danni del mostro e rigenerare 10 rage',
          'Difendere ti fa riflettere una parte dei danni del mostro e rigenerare 20 rage'
        ]
      },
      DURABLE: {
        key: 'DURABLE',
        name: 'Resistente',
        tier: 1,
        icon: 'durable.jpg',
        maxLevel: 3,
        description: [
          'Hai il 10% in più degli HP',
          'Hai il 20% in più degli HP',
          'Hai il 50% in più degli HP'
        ]
      },
      THORNS: {
        key: 'THORNS',
        name: 'Spine',
        icon: 'thorns.png',
        tier: 2,
        maxLevel: 3,
        description: [
          'Quando subisci danni rifletti il 5%',
          'Quando subisci danni rifletti il 10%',
          'Quando subisci danni rifletti il 15%'
        ],
        requires: { name: 'DEFENDER', level: 3 }
      },
      BUFFERING: {
        key: 'BUFFERING',
        name: 'Pensa con calma',
        icon: 'buffering.jpg',
        tier: 2,
        maxLevel: 1,
        description: [
          'Quando La barra ATB è piena si attiva da sola difesa fino a che non agisci'
        ],
        requires: { name: 'DEFENDER', level: 3 }
      },
      BERSERK: {
        key: 'BERSERK',
        name: 'Berserk',
        icon: 'berserk.jpg',
        tier: 3,
        maxLevel: 3,
        description: [
          'ABILITA\': Dopo averla usata attacchi senza sosta il nemico fino alla morte di uno dei due',
          'Berserk ti cura',
          'Aumenta i danni e la cura di Berserk'
        ],
        requires: { name: 'THORNS', level: 3 }
      },
      AUTODEF: {
        key: 'AUTODEF',
        name: 'Difesa Automatica',
        icon: 'autodefense.jpg',
        tier: 4,
        maxLevel: 1,
        description: [
          'Qualunque azione tu faccia, la difesa si attiva da sola'
        ],
        requires: { name: 'BERSERK', level: 3 }
      }
    }
  },

  TOXICOLOGIST: {
    class: 'MAGE',
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

        ],
        requires: { name: 'SHORTARMS', level: 3 }
      }
    }
  },

  FARTER: {
    class: 'MAGE',
    key: 'FARTER',
    name: 'Petatore',
    color: '#997b66',
    viewcolor: '#b2967d',
    maxTier: 4,
    talents: {
      SMELL: {
        key: 'SMELL',
        tier: 1,
        name: 'Odorino',
        icon: 'smell.png',
        maxLevel: 3,
        description: [
          'Ogni peto aumenta i danni del peto successivo dal 10% fino a che non subisci le conseguenze',
          'Ogni peto aumenta i danni del peto successivo dal 20% fino a che non subisci le conseguenze',
          'Ogni peto aumenta i danni del peto successivo dal 50% fino a che non subisci le conseguenze'
        ]
      },
      GAVETTONE: {
        key: 'GAVETTONE',
        tier: 1,
        name: 'Gavettone alla merda',
        icon: 'gavettone.png',
        maxLevel: 1,
        description: [
          'ABILITA\': Rimuove il rischio di effetti collaterali dei peti, fa danni ridotti e mette un dot'
        ]
      },
      TANFO: {
        key: 'TANFO',
        tier: 2,
        name: 'Tanfo',
        icon: 'tanfo.png',
        maxLevel: 3,
        description: [
          'Peto applica un dot dalla durata di 5 secondi',
          'Aumenta la durata a 10 secondi',
          'Aumenta la durata a 20 secondi'
        ],
        requires: { name: 'SMELL', level: 3 }
      },
      STICKYGAVETTONE: {
        key: 'STICKYGAVETTONE',
        tier: 2,
        name: 'Gavettone appiccicoso',
        icon: 'sticky.png',
        maxLevel: 3,
        description: [
          'Aumenta la durata del dot di Gavettone a 10 secondi',
          'Il dot ora dura 15 secondi',
          'Il dot dura 20 secondi'
        ],
        requires: { name: 'GAVETTONE', level: 3 }
      },
      SHITARMOR: {
        key: 'SHITARMOR',
        tier: 3,
        name: 'Armatura alla popò',
        icon: 'shitarmor.jpg',
        maxLevel: 3,
        description: [
          'Quando subisci danno mentre difendi il mostro aumenta i suoi stacks di dot di 1 secondo',
          'Ora i dot vengono aumentati di 2 secondi',
          'I dot vengono aumentati di 5 secondi'
        ],
        requires: { name: 'TANFO', level: 3 }
      },
      APOOCALYPSE: {
        key: 'APOOCALYPSE',
        tier: 4,
        name: 'aPOOcalisse',
        icon: 'apoocalypse.png',
        maxLevel: 1,
        description: [
          'ABILITA\': Fa danni in base alla durata dei dot e li consuma, rigeneri tutto il mana e la vita'
        ],
        requires: { name: 'SHITARMOR', level: 3 }
      }
    }
  },

  MAGEWARRIOR: {
    class: 'MAGE',
    key: 'MAGEWARRIOR',
    name: 'Mago Guerriero',
    color: '#7bdff2',
    viewcolor: '#caf0f8',
    maxTier: 4,
    talents: {
      HYDRO: {
        key: 'HYDRO',
        tier: 1,
        name: 'Hydro',
        icon: 'hydro.jpg',
        maxLevel: 1,
        description: [
          'ABILITA\': Fa danni al nemico e lo bagna...'
        ]
      },
      GLACIAZIONE: {
        key: 'GLACIAZIONE',
        tier: 2,
        name: 'Glaciazione',
        icon: 'glaciazione.jpg',
        maxLevel: 1,
        description: [
          'ABILITA\': Fa danni a un nemico bagnato, e potrebbe congelarlo, in base a quanto è bagnato'
        ],
        requires: { name: 'HYDRO', level: 1 }
      },
      TSUNAMI: {
        key: 'TSUNAMI',
        tier: 3,
        name: 'Tsunami',
        icon: 'tsunami.png',
        maxLevel: 3,
        description: [
          'Hydro applica 2 stack di bagnato e gli stack massimi sono 10',
          'Hydro applica 3 stack di bagnato e gli stack massimi sono 12',
          'Hydro applica 5 di bagnato stack e gli stack massimi sono 15'
        ],
        requires: { name: 'GLACIAZIONE', level: 1 }
      },
      SHATTER: {
        key: 'SHATTER',
        tier: 3,
        name: 'Frammentazione',
        icon: 'shatter.png',
        maxLevel: 3,
        description: [
          'Tirare ceffone a un nemico congelato ha il 25% di spaccare il ghiaccio e provocare ingenti danni fisici',
          'Ceffone ha il 50% di rompere il ghiaccio',
          'Ceffone rompe sempre il ghiaccio'
        ],
        requires: { name: 'GLACIAZIONE', level: 1 }
      },
      ICEAGE: {
        key: 'ICEAGE',
        tier: 4,
        name: 'Era Glaciale',
        icon: 'iceage.png',
        maxLevel: 2,
        description: [
          'Quando Ceffone rompe un nemico congelato ti curi di metà vita e metà mana',
          'Quando Ceffone rompe un nemico congelato ti curi di tutta la vita e mana'
        ],
        requires: { name: 'SHATTER', level: 3 }
      },
      BRAINFREEZE: {
        key: 'BRAINFREEZE',
        tier: 4,
        name: 'Blocco Mentale',
        icon: 'brainfreeze.jpg',
        maxLevel: 3,
        description: [
          'Quando rompi il ghiaccio blocchi la barra ATB del nemico per 1 secondo',
          'Quando rompi il ghiaccio blocchi la barra ATB del nemico per 2 secondi',
          'Quando rompi il ghiaccio blocchi la barra ATB del nemico per 3 secondi'
        ],
        requires: { name: 'SHATTER', level: 3 }
      }
    }
  },

  JUNGLEKING: {
    class: 'ZOOLOGIST',
    key: 'JUNGLEKING',
    name: 'Re della giungla',
    color: '#ff006e',
    viewcolor: '#ffcad4',
    maxTier: 3,
    talents: {
      TIGRE: {
        key: 'TIGRE',
        name: 'Igor',
        tier: 1,
        maxLevel: 3,
        icon: 'tigre.png',
        description: [
          'COMPAGNO: Tigre. Quando la barra ATB è piena attacca il nemico facendo medi danni',
          'Igor mette un DOT al nemico ogni volta che attacca',
          'Aumenta i danni di Igor'
        ]
      },
      MAGICBIRD: {
        key: 'MAGICBIRD',
        name: 'Citrullo',
        tier: 1,
        icon: 'bird.jpg',
        maxLevel: 3,
        description: [
          'COMPAGNO: Uccello Magico. Quando la barra atb è piena attacca il nemico facendo danni lievi',
          'Citrullo quando fa danno ti cura  di una piccola quantità di vita',
          'Citrullo ti cura ancora di più e i suoi danni sono leggermente aumentati'
        ]
      },
      MIMETIZZAZIONE: {
        key: 'MIMETIZZAZIONE',
        name: 'Mimetizzazione',
        tier: 2,
        icon: 'mimetizzazione.jpg',
        maxLevel: 3,
        description: [
          'Quando Igor attacca, e la tua affinità fisica è al massimo la consuma tutta per assaltare il nemico, provoca ingenti danni e un dot ancora più forte',
          'ABILITà CHE GENERA AFFINITà MAGICA NE GENERA DI PIù',
          'Quando Igor usa mimetizzazione applica uno stack di Igor Power'
        ],
        requires: { name: 'TIGRE', level: 3 }
      },

      BIRDPOWER: {
        key: 'BIRDPOWER',
        name: 'L\'inarrestabile Citrullo',
        tier: 2,
        icon: 'birdpower.jpg',
        maxLevel: 3,
        description: [
          'Quando Citrullo attacca, e la tua affinità magica è al massimo la consumi tutta, e applichi un dot',
          'ABILITà CHE GENERA AFFINITà MAGICA NE GENERA DI PIù',
          'Quando Citrullo sfoga la sua Ira applica uno stack di Citrullo Power'
        ],
        requires: { name: 'MAGICBIRD', level: 3 }
      },

      CITRULLIGOR: {
        key: 'CITRULLIGOR',
        tier: 3,
        icon: 'citrulligor.jpg',
        name: 'Citrulligor',
        maxLevel: 3,
        description: [
          'Quando un mostro ha 3 stacks Citrullo Power e 3 di Igor Power, Citrullo e Igor si uniscono e diventano una bestia implacabile con le abilità di entrambi per 20 secondi',
          'Citrullo e Igor generano 2 stacks',
          'Ora Citrullo e Igor generano 3 stacks'
        ],
        requires: { name: 'BIRDPOWER', level: 3 }
      }
    }
  },

  SNAKE: {
    class: 'ZOOLOGIST',
    key: 'SNAKE',
    name: 'Serpentologo',
    color: '#679436',
    maxTier: 4,
    viewcolor: '#a5be00',
    talents: {
      VIKTOR: {
        key: 'VIKTOR',
        name: 'Viktor',
        tier: 1,
        icon: 'viktor.jpg',
        maxLevel: 3,
        description: [
          'COMPAGNO: Viktor fa danni ridotti e avvelena il nemico',
          'Viktor applica più stack',
          'Aumenta i danni veleno e gli stack applicati'
        ]
      },
      POISONER: {
        key: 'POISONER',
        name: 'Avvelenatore',
        tier: 2,
        icon: 'poisoned.png',
        maxLevel: 3,
        description: [
          'I tick del dot di Viktor generano affinità magica',
          'I tick del dot di Viktor generano 2 affinità magica',
          'I tick del dot di Viktor generano 3 affinità magica'
        ],
        requires: { name: 'VIKTOR', level: 3 }
      },
      DEADLYPHIAL: {
        key: 'DEADLYPHIAL',
        name: 'Fialetta Mortale',
        tier: 2,
        icon: 'fialettamortale.png',
        maxLevel: 1,
        description: [
          'ABILITA\': Consuma tutta l\'affinità magica e porta al massimo la fisica, fa danni in base a quanto consuma e applica un veleno se è al massimo'
        ],
        requires: { name: 'VIKTOR', level: 3 }
      },

      GENTLESNAKE: {
        key: 'GENTLESNAKE',
        tier: 3,
        name: 'Gentilserpente',
        icon: 'gentlesnake.jpg',
        maxLevel: 3,
        description: [
          'Quando il dot di Fialetta Mortale ticka ti curi e generi affinità magica',
          'Ti curi di più e generi più affinità magica',
          'Aumenta enormemente le cure e l\'affinità magica generata'
        ],
        requires: { name: 'DEADLYPHIAL', level: 1 }
      },
      TIMEPOISON: {
        key: 'TIMEPOISON',
        name: 'Veleno Temporale',
        tier: 4,
        maxLevel: 3,
        icon: 'snaketime.jpg',
        description: [
          'Ogni volta che il dot della fialetta normale ticka riduce la barra ATB di 0.3 secondi',
          'Ogni volta che il dot della fialetta normale ticka riduce la barra ATB di 0.6 secondi',
          'Ogni volta che il dot della fialetta normale ticka riduce la barra ATB di 1 secondo'
        ],
        requires: { name: 'GENTLESNAKE', level: 3 }
      }
    }
  },

  SAVANNAMASTER: {
    class: 'ZOOLOGIST',
    key: 'SAVANNAMASTER',
    name: 'Domatore della savana',
    color: '#fdb833',
    viewcolor: '#faae7b',
    maxTier: 4,
    talents: {
      BERTOLDO: {
        key: 'BERTOLDO',
        name: 'Bertoldo',
        tier: 1,
        icon: 'bertoldo.jpg',
        maxLevel: 3,
        description: [
          'COMPAGNO: Bertoldo. Un temibile elefante, l\'affinità fisica aumenta i suoi danni, quella magica le sue cure',
          'Aumenta ulteriormente danni e cure',
          'Danni e cure sono aumentati ancora'
        ]
      },
      RESETBERTOLDO: {
        key: 'RESETBERTOLDO',
        name: 'Urlo del rinnovo',
        maxLevel: 1,
        tier: 2,
        icon: 'resetbertoldo.png',
        description: [
          'ABILITA\': Annulla l\'affinità magica e fisica e fa danni in base all\'affinità fisica, o cura in base a quella magica'
        ],
        requires: { name: 'BERTOLDO', level: 3 }
      },

      BERTOLDODEFENDER: {
        key: 'BERTOLDODEFENDER',
        name: 'Difensore',
        maxLevel: 3,
        icon: 'bertoldodefender.jpg',
        tier: 2,
        description: [
          'Quando subisci danno c\'è il 25% di probabilità che bertoldo intervenga picchiando il nemico. Il suo attacco ha gli stessi effetti dell\'attacco normale',
          'Bertoldo può intervenire al 50%',
          'Bertoldo interviene sempre'
        ],
        requires: { name: 'BERTOLDO', level: 3 }
      },
      NEEDLESCALE: {
        key: 'NEEDLESCALE',
        name: 'L\'ago della bilancia',
        maxLevel: 3,
        icon: 'needlescale.jpg',
        tier: 3,
        description: [
          'Le abilità che generano affinità ora ne generano 10',
          'Le abilità che generano affinità ora ne generano 20',
          'Le abilità che generano affinità ora ne generano 30'
        ],
        requires: { name: 'BERTOLDODEFENDER', level: 3 }
      },
      EXTREMEPOWER: {
        key: 'EXTREMEPOWER',
        name: 'La forza degli estremi',
        maxLevel: 1,
        icon: 'extremepower.jpg',
        tier: 4,
        description: [
          'Quando l\'affinità magica è al massimo Bertoldo ti attiva la difesa fino a che non compi un azione, quando la fisica è al massimo il suo attacco è ancora più potente'
        ],
        requires: { name: 'NEEDLESCALE', level: 3 }
      }
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
