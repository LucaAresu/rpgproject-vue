<template>
<div class="logarea">
  <div class="logview" :class="logClass">
    {{logSentence}}
  </div>
  <log :mode="logMode" />
</div>
</template>
<script>
import log from './Log'
export default {
  components: {
    log
  },
  computed: {
    hasCombatStarted () {
      return this.$store.getters.hasCombatStarted
    },
    isInCombat () {
      return this.$store.getters.isInCombat
    },
    logSentence () {
      return this.isInCombat ? 'Combat Log' : 'Log di Mappa'
    },
    logMode () {
      return this.isInCombat ? 'getCombatLog' : 'getMapLog'
    },
    logClass () {
      return this.isInCombat ? 'combatlog' : 'maplog'
    }
  }
}
</script>
<style scoped>
.logarea {
  margin: 2rem;
  width: 100%;
  text-align: center;
}
.logview {
  padding: 1rem;
}
.maplog {
  background-color: #2a9d8f;
}
.combatlog {
  background-color: #ef233c;
}
@media (min-width: 800px) {
  .logarea {
    width: 50%;
  }
}
@media (min-width: 1200px) {
  .logarea {
    width: 50%;
  }
}
</style>
