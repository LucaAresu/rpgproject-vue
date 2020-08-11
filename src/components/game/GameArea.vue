<template>
  <div class="gamearea">
    <game-resources />
    <game-map />
    <div class="maplog">
      Log di mappa
    </div>
    <map-log mode="getMapLog" />
  </div>
</template>
<script>
import gameMap from './Map'
import gameResources from './Resources'
import mapLog from './Log'
export default {
  components: {
    gameMap,
    gameResources,
    mapLog
  }
}
</script>
<style scoped>
.gamearea {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.maplog {
  margin: 2rem;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px #ccc;
  padding: 1rem;
  width: 100%;
  text-align: center;
  background-color: #2a9d8f;
}
@media (min-width: 800px) {
  .maplog{
    width: 50%;
  }
}
@media (min-width: 1200px) {
  .maplog{
    width: 30%;
  }
}
</style>
