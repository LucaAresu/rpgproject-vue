<template>
  <div class="currently-equipped">
    <div class="equipped">
      <div class="view-items" v-for="(item, slot) in equipped" :key="item.id" @click="selected=item" :style="{color: selected === item ? 'white' : rarityInfo[item.rarity].color}">
        <div class="slot">
          {{slot}}
        </div>
        <div class="image">
          <img :src="require('@/assets/equip/' + item.icon)">
        </div>
      </div>
    </div>
    <div class="selected-stats">
      <transition name="slide" mode="out-in">
        <item-view :item="selected" v-if="selected" :key="selected.id" />
        <div v-else class="no-selected">
          Seleziona un item tra quelli che hai addosso per vedere le stats
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import itemView from './ItemView'
import constants from '../../../constants'
export default {
  data () {
    return {
      selected: '',
      rarityInfo: constants.inventory.rarityInfo
    }
  },
  computed: {
    equipped () {
      return this.$store.getters.getEquipped
    }
  },
  watch: {
    equipped () {
      this.selected = ''
    }
  },
  components: {
    itemView
  }
}
</script>
<style scoped>
.currently-equipped {
  width: 100%;
}
.view-items img {
  width: 50px;
  height: 50px;
}
.slot {
  padding: 0.5rem;
  font-size: 1.2rem;
  text-align: center;
  text-transform: capitalize;
  background-color: #eee;
}
.view-items {
  border: 1px solid black;
  margin: 0.2rem;
}
.equipped {
  display: flex;
  justify-content: space-between;
}
.no-selected {
  text-align: center;
  font-size: 1.2rem;
  margin: 1rem;
  border: 1px solid #ccc;
  padding: 1rem;
  box-shadow: 1px 1px 1px #ccc;
}
@media (min-width: 800px) {
  .view-items img {
    width: 100px;
    height: 100px;
  }
  .view-items {
    border: 1px solid black;
    margin: 1rem;
  }
}
</style>
