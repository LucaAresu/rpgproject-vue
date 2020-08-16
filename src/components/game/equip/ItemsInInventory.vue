<template>
  <div class="inventory">
    <button @click="$store.dispatch('createAndAddItem')"> but </button>
    <transition name="slide" mode="out-in">
    <div class="da-indossare" v-if="selectedItem" :key="selectedItem.id">
      <item-view  :item="selectedItem" :key="selectedItem.id" />
      <div class="buttons">
        <button class="vendi" @click="sell">VENDI </button>
        <button class="indossa" @click="changeEquip">INDOSSA</button>
      </div>
      <div v-if="sellCounter === 1" class="sell-info">
        Clicca due volte per vendere
      </div>
    </div>
    <div v-else class="no-selected" key="no-item">
      Non hai selezionato nessun item dal tuo inventario
    </div>
    </transition>
    <div class="category-names">
      <div class="slot" v-for="(storedItems, category) in inventory" :key="category">
        <button @click="selected = category" :disabled="selected === category || !storedItems.length">{{category}} ({{storedItems.length}}) </button>
      </div>
    </div>
    <item-list :itemList="inventory[selected]" @clicked-item="selectedItem=$event" />
  </div>
</template>
<script>
import itemList from './ItemList'
import itemView from './ItemView'
export default {
  data () {
    return {
      selected: 'head',
      selectedItem: null,
      sellCounter: 0
    }
  },
  methods: {
    changeEquip () {
      this.$store.dispatch('equipThis', this.selectedItem)
      this.selectedItem = null
    },
    sell () {
      if (!this.sellCounter) {
        this.sellCounter++
      } else {
        this.$store.dispatch('sellItem', this.selectedItem)
        this.selectedItem = null
        this.sellCounter = 0
      }
    }
  },
  computed: {
    inventory () {
      return this.$store.getters.getStored
    }
  },
  components: {
    itemList,
    itemView
  }
}
</script>
<style scoped>
.category-names {
  display: flex;
  justify-content: space-around;
}
.no-selected {
  text-align: center;
  font-size: 1.2rem;
  margin: 1rem;
  border: 1px solid #ccc;
  padding: 1rem;
  box-shadow: 1px 1px 1px #ccc;
}
.da-indossare {
  margin-top: 1rem;
}
.buttons button {
  width: 50%;
}
.sell-info {
  color: #f15152;
  margin-bottom: 1rem;
}
</style>
