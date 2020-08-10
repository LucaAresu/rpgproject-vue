<template>
<div class="statscard">
  <div class="points">Punti da spendere: {{ pointsToSpend }} </div>
  <div class="body">
    <insert-stats
      :pointsToSpend="pointsToSpend"
      :statOrder="statOrder"
      :addedStats="addedStats"
      @remove="remove($event)"
      @add="add($event)"
    />
    <param-view
      :combinatedStats="({ ...combinatedStats})"
    />
     </div>
     <div class="buttons">
       <button :disabled="isButtonDisabled" @click="upgradeStats">Conferma</button>
     </div>
</div>
</template>
<script>
import constants from '../../../constants'
import insertStats from './InsertStats'
import paramView from './ShowParams'
export default {
  data () {
    return {
      pointsToSpend: this.$store.getters.getStatsToAllocate,
      statOrder: constants.character.statOrder,
      stats: ({ ...this.$store.getters.getStats }),
      addedStats: constants.character.statOrder.map(ele => ({ [ele]: 0 })).reduce((acc, ele) => ({ ...acc, ...ele }), {}),
      isButtonDisabled: true,
      combinatedStats: ({})
    }
  },
  methods: {
    add (stat) {
      if (this.pointsToSpend) {
        this.addedStats = { ...this.addedStats, [stat]: this.addedStats[stat] + 1 }
        this.pointsToSpend--
      }
    },
    remove (stat) {
      if (this.addedStats[stat]) {
        this.addedStats = { ...this.addedStats, [stat]: this.addedStats[stat] - 1 }
        this.pointsToSpend++
      }
    },
    upgradeStats () {
      this.$store.dispatch('addStats', {
        points: this.pointsToSpend,
        stats: { ...this.addedStats }
      })
      this.addedStats = constants.character.statOrder.map(ele => ({ [ele]: 0 })).reduce((acc, ele) => ({ ...acc, ...ele }), {})
      this.stats = ({ ...this.$store.getters.getStats })
    }
  },
  watch: {
    addedStats () {
      this.isButtonDisabled = !Object.keys(this.addedStats).reduce((acc, ele) => this.addedStats[ele] + acc, 0)
      this.combinatedStats = Object.keys(this.stats).map(ele => ({ [ele]: this.stats[ele] + this.addedStats[ele] })).reduce((acc, ele) => ({ ...acc, ...ele }), {})
    }
  },
  components: {
    insertStats,
    paramView
  },
  created () {
    this.combinatedStats = Object.keys(this.stats).map(ele => ({ [ele]: this.stats[ele] + this.addedStats[ele] })).reduce((acc, ele) => ({ ...acc, ...ele }), {})
  }
}
</script>
<style scoped>
.statscard {
  border: 1px solid #ccc;
  width: 100%;
  margin: 1rem;
  box-shadow: 1px 1px 1px #ccc;
}
.body {
  display: flex;
}
.points {
  text-align: center;
  font-size: 1.5rem;
  margin: 0.5rem;
}
button {
  width: 100%;
  margin: 0;
}
</style>
