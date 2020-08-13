<template>
  <div class="deathscreen">
    <div class="gameover">
      GAME OVER
    </div>
    <div class="image">
      <img :src="require('@/assets/characters/' + image + '.png')" />
      <div class="cross">X</div>
    </div>
    <div class="text">
      Ma non preoccuparti... Un altro esploratore troverà il tuo cadavere e ti deprederà di vestiti, soldi e qualunque altra cosa porti o che decido d'implementare... beh rip
    </div>
    <button @click="$store.dispatch('startAgain')">NUOVA PARTITA</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      image: this.$store.getters.getAvatar
    }
  }
}
</script>
<style scoped>
.gameover {
  border: 1px solid black;
  font-size: 3rem;
  padding: 1rem;
  color: #ef233c;
  background-color: black;
  text-align: center;
}
button {
  width: 100%;
}
.text {
  padding: 2rem;
  text-align: center;
  font-size: 1.5rem;
}
.image {
  display: flex;
  justify-content: center;
}
.cross {
  color: red;
  position: absolute;
  font-size: 12rem;
  opacity: 0.6;
}
</style>
