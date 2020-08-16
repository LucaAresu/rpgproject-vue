<template>
  <div class="item-list">
    <div class="item" v-for="item in itemList" :key="item.id" @click="clickedItem(item)">
      <mini-item :item="item" :selected="item.id === selected" />
    </div>
  </div>
</template>
<script>
import miniItem from './MiniItem'
export default {
  props: ['itemList'],
  data () {
    return {
      selected: ''
    }
  },
  components: {
    miniItem
  },
  methods: {
    clickedItem (item) {
      this.selected = item.id
      this.$emit('clicked-item', item)
    }
  }
}
</script>
<style scoped>
.item-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
