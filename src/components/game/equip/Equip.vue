<template>
  <div class="equip-page">
    <currently-equipped />
    <items-in-inventory />
  </div>
</template>
<script>
import currentlyEquipped from './CurrentlyEquipped'
import itemsInInventory from './ItemsInInventory'
export default {
  components: {
    currentlyEquipped,
    itemsInInventory
  }
}
</script>
<style scoped>
.equip-page {
width: 100%
}
</style>
