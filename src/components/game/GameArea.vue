<template>
  <div class="gamearea">
    <game-resources />
    <game-map />
  </div>
</template>
<script>
import gameMap from './Map'
import gameResources from './Resources'
export default {
  components: {
    gameMap,
    gameResources
  }
}
</script>
<style scoped>
.gamearea {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
