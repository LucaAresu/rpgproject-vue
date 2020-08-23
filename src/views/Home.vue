<template>
<div class="home">
  <transition name="slide" mode="out-in">
    <div v-if="$store.getters.isLoading" class="divloader">
      <pacman-loader />
    </div>
    <characters v-else-if="!$store.getters.isCharacterCreated" />
    <game-area v-else />
  </transition>
</div>
</template>

<script>
// @ is an alias to /src
import characters from '../components/create-character/CreateCharacters'
import gameArea from '../components/game/GameArea'
import pacmanLoader from '../../node_modules/vue-spinner/src/PacmanLoader'

export default {
  name: 'Home',
  components: {
    characters,
    gameArea,
    pacmanLoader
  }
}
</script>
<style scoped>
.divloader {
  margin: auto;
  width: 30%;
  display: flex;
  justify-content: center;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px #ccc;
}
.slide-enter-active {
  animation: slide-in 100ms ease-out forwards;
}
@keyframes slide-in {
  from {
      transform: translateX(400px);
  }
  to {
      transform: translateX(0);
  }
}
.slide-leave-active {
  animation: slide-out 100ms ease-out forwards
}
@keyframes slide-out {
  from {
      transform: translateX(0);
  }
  to{
      transform: translateX(400px);
  }
}
</style>
