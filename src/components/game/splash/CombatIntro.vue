<template>
  <div class="combatintro">
    <div class="body-combatintro">
    <div class="monster">
      <img :src="monsterimg" />
    </div>
    <div class="vs">VS</div>
    <div class="player">
      <img :src="playerimg" />
    </div>
    </div>
    <div class="button-combatintro">
      <button @click="$store.commit('START_COMBAT')">INIZIA IL COMBAT </button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      monsterimg: require('@/assets/monsters/' + this.$store.getters.getMonster.icon),
      playerimg: require('@/assets/characters/' + this.$store.getters.getAvatar + '.png')
    }
  }
}
</script>
<style scoped>
.body-combatintro {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.vs {
  text-align: center;
  font-size: 3rem;
  border: 1px solid black;
  box-shadow: 1px 1px 1px #ccc;
  background-color: #ef233c;
  width: 100%;
}
.button-combatintro button {
  width: 100%;
}

</style>
