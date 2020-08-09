export default {
  rooms: {
    NORMAL: {
      icon: null,
      color: '#90be6d',
      click: {
        name: 'addMoney',
        value: 20
      }
    },
    BOSS: {
      icon: 'boss',
      color: '#011627'
    },
    BILLY: {
      icon: null,
      color: 'blue',
      click: {
        name: 'addMoney',
        value: 50
      }
    },
    RETARD: {
      color: 'pink',
      click: {
        name: 'addMoney',
        value: 500
      }
    }
  },
  options: {
    minRows: 3,
    minColumns: 3,
    rowDivider: 4,
    columnDivider: 5
  },
  rarity: {
    NORMAL: 20,
    BILLY: 20,
    RETARD: 50
  }
}
