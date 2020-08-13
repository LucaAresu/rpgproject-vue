<template>
  <div class="combatsplash">
    <combat-intro v-if="!monsterDefeated" />
    <combat-outro v-else-if="isCharacterAlive" />
    <death-screen v-else />
  </div>
</template>
<script>
import combatIntro from './CombatIntro'
import combatOutro from './CombatOutro'
import deathScreen from './DeathScreen'
export default {
  data () {
    return {
      monsterDefeated: this.$store.getters.isMonsterDefeated
    }
  },
  computed: {
    isCharacterAlive () {
      return this.$store.getters.getCurrentHp > 0
    }
  },
  components: {
    combatIntro,
    combatOutro,
    deathScreen
  }
}
</script>
<style scoped>
.combatsplash {
  width: 100%;
}
@media(min-width: 800px) {
  .combatsplash {
    width: 50%;
    padding: 1rem;
  }
}

</style>
