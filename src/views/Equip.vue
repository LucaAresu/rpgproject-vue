<template>
  <div class="equip-view">
    <equip />
  </div>
</template>
<script>
import equip from '../components/game/equip/Equip'
export default {
  components: {
    equip
  }
}
</script>
<style scoped>
.equip-view {
  width: 100%;
}
@media (min-width: 800px) {
  .equip-view {
    width: 80%;
    margin: auto;
  }
}
@media (min-width: 1200px) {
  .equip-view {
    width: 40%;
  }
}
</style>
