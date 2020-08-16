<template>
  <div class="mini-item" :style="{border: selected ? '3px solid red': '3px solid '+ rarityInfo.bg}">
      <img :src="require('@/assets/equip/' + item.icon)" />
  </div>
</template>
<script>
import constants from '../../../constants'
export default {
  props: ['item', 'selected'],
  data () {
    return {
      rarityInfo: constants.inventory.rarityInfo[this.item.rarity]
    }
  }
}
</script>
<style scoped>
.mini-item {
  width: 5rem;
  border: 1px solid black;
  padding: 0.2rem;
  border-radius: 4px;
}
img {
  width: 5rem;
  height: 5rem;
}
.selected {
  border: 1px solid red;
}
</style>
