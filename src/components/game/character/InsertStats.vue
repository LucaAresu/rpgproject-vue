<template>
  <div class="stats">
    <div v-for="stat in statOrder" :key="stat" class="stat">
      <div class="button">
        <button @click="$emit('remove', stat)" v-if="addedStats[stat]">-</button>
      </div>
      <div class="text">
        {{stat}} {{ $store.getters.getSingleStat(stat) }} <span v-if="addedStats[stat]">(+{{ addedStats[stat] }})</span>
      </div>
      <div class="button">
        <button @click="$emit('add', stat)" v-show="pointsToSpend">+</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['pointsToSpend', 'statOrder', 'addedStats']
}
</script>
<style scoped>
.stats {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: #fcf6bd;

}
.stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  height: 40px;
}
button {
  padding: 0.5rem;
  margin: 0;
}
.text {
  text-align: center;
}

</style>
