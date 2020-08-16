<template>
  <div class="item-view">
    <div class="name" :style="{backgroundColor: rarityInfo.bg}">{{item.name}}</div>
    <div class="item-info">
      <div class="image"><img :src="require('@/assets/equip/' + item.icon)" /></div>
      <div class="stats">
        <div class="item-slot">Slot: {{item.slot}}</div>
        <div class="rarity">Rarità: <span :style="{color: rarityInfo.color}">{{rarityInfo.name}}</span> </div>
        <div class="cost">Costo: {{item.cost}}</div>
          <div class="stats-view">
            <div class="stat" v-for="(stat, statName) in item.stats" :key="statName">
              <div class="stat-view" v-if="stat">{{statName}}: {{stat}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="description" v-if="item.description" :style="{color: rarityInfo.color}"> {{item.description}} </div>
  </div>
</template>
<script>
import constants from '../../../constants'
export default {
  props: ['item'],
  computed: {
    rarityInfo () {
      return constants.inventory.rarityInfo[this.item.rarity]
    }
  }
}
</script>
<style scoped>
.item-view {
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px #ccc;
}
.name {
  padding: 1rem;
  text-align: center;
}
img {
  width: 150px;
  height: 150px;
}
.image {
  max-height: 150px;
  padding: 0.2rem;
}
.item-info {
  display: flex;
  justify-content: space-between;
}
.stats {
  padding: 1rem;
}
.item-slot {
  text-transform: capitalize;
}
.description {
  text-align: center;
  margin-top: 0.5rem;
}
</style>
