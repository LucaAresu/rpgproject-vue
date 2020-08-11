<template>
<div class="map">
  <div v-for="(c, column) in columns" class="map-col" :key="'col'+column" >
    <div v-for="(r, row) in rows"
      class="map-row"
      :key="column + '-' + row"
      :style="{
        backgroundColor: getBg(column, row)
        }"
        @click="clickMap($event,column, row)"
    >
      <img :src="getIcon(column, row)" />
    </div>
  </div>
</div>
</template>
<script>
import constants from '../../constants'
export default {
  data () {
    return {
      map: this.$store.getters.getMap,
      columns: this.$store.getters.getNumberOfColumns,
      rows: this.$store.getters.getNumberOfRows,
      roomTypes: constants.map.rooms,
      canClick: true
    }
  },
  methods: {
    getBg (col, row) {
      const slot = this.$store.getters.getSlotValue({ col, row })
      return slot.clicked ? this.roomTypes[slot.type].color : '#888'
    },
    clickMap (event, col, row) {
      if (!this.canClick) {
        return
      }
      this.blockClick()
      const slot = this.$store.getters.getSlotValue({ col, row })
      const slotFun = constants.map.rooms[slot.type].click
      this.$store.dispatch(slotFun.name, {
        data: slotFun.data,
        clicked: slot.clicked
      })
      this.$store.dispatch('setClicked', { col, row })
      this.$store.dispatch('setVisible', { col, row })
    },
    blockClick () {
      this.canClick = false
      setTimeout(() => { this.canClick = true }, 500)
    },
    getIcon (col, row) {
      const slot = this.$store.getters.getSlotValue({ col, row })
      let img = require('@/assets/mapicons/qm.png')
      if (slot.visible) {
        img = require('@/assets/mapicons/' + constants.map.rooms[slot.type].icon)
      }
      return img
    }
  }
}
</script>
<style scoped>
.map {
  background-color: black;
  border-radius: 4px;
}
.map-row {
  width: 100px;
  height: 100px;
  display: inline-flex;
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 4px;
  transition: 1s;
  justify-content: center;
  align-items: center;
}
.map-col {
  margin: 0;
  padding: 0;
  height: 100px;
}
img {
  width: 50px;
  height: 50px;
  transition: 1s;
}
</style>
