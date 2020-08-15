<template>
  <div class="gamearea">
    <transition name="pop" mode="out-in">
      <game-resources v-if="!isInCombat" />
      <div class="placeholder-div-for-animation" v-else />
    </transition>
    <transition  name="pop" mode="out-in">
    <game-map v-if="!isInCombat && !shopOpen" />
    <shop v-else-if="shopOpen" />
    <combat-splash v-else-if="!hasCombatStarted" />
    <combat-area v-else />
    </transition>
    <transition name="pop" mode="out-in">
      <log-area v-if="!isInCombat || (isInCombat && hasCombatStarted)"/>
      <div class="placeholder-div-for-animation" v-else />
    </transition>
  </div>
</template>
<script>
import gameMap from './Map'
import gameResources from './Resources'
import combatArea from './CombatArea'
import combatSplash from './splash/CombatSplash'
import logArea from './LogArea'
import shop from './Shop'

export default {
  components: {
    gameMap,
    gameResources,
    combatArea,
    combatSplash,
    logArea,
    shop
  },
  computed: {
    shopOpen () {
      return this.$store.getters.isShopOpen
    },
    hasCombatStarted () {
      return this.$store.getters.hasCombatStarted
    },
    isInCombat () {
      return this.$store.getters.isInCombat
    }
  }
}
</script>
<style scoped>
.gamearea {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pop-enter-active {
  animation: appear 500ms ease-out forwards;
}
@keyframes appear {
  from {
      transform: scale(0)
  }
  to {
      transform: scale(1);
  }
}
.pop-leave-active {
  animation: disappear 500ms ease-out forwards;
}
@keyframes disappear{
  from {
      transform: scale(1)
  }
  to{
      transform: scale(0);
  }
}

</style>
