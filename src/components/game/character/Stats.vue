<template>
  <div class="stats">
    <player-card />
    <stats-card />
  </div>
</template>
<script>
import constants from '../../../constants'
import playerCard from './PlayerCard'
import statsCard from './StatsCard'
export default {
  data () {
    return {
      statOrder: constants.character.statOrder
    }
  },
  computed: {
    stats () {
      return this.$store.character.stats
    }
  },
  components: {
    playerCard,
    statsCard
  }
}
</script>
<style scoped>
.stats {
  width: 100%;
}
</style>
