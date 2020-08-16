<template>
  <div class="insert-stats">
    <div v-for="stat in statOrder" :key="stat" class="stat">
      <div class="button">
        <button @click="$emit('tozero', stat)" v-show="addedStats[stat]">0</button>
        <button @click="$emit('remove', stat)" v-show="addedStats[stat]">-</button>
      </div>
      <div class="text">
        {{stat}} {{ characterStats[stat] }} <span v-if="addedStats[stat]">(+{{ addedStats[stat] }})</span>
      </div>
      <div class="button">
        <button @click="$emit('add', stat)" v-show="pointsToSpend">+</button>
        <button @click="$emit('max', stat)" v-show="pointsToSpend">MAX</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['pointsToSpend', 'statOrder', 'addedStats'],
  computed: {
    characterStats () {
      return this.$store.getters.getStats
    }
  }
}
</script>
<style scoped>
.insert-stats {
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
