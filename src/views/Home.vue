<template>
<div class="home">
  <transition name="slide" mode="out-in">
    <characters v-if="!$store.getters.isCharacterCreated" />
    <game-area v-else />
  </transition>
</div>
</template>

<script>
// @ is an alias to /src
import characters from '../components/create-character/CreateCharacters'
import gameArea from '../components/game/GameArea'

export default {
  name: 'Home',
  components: {
    characters,
    gameArea
  }
}
</script>
<style scoped>
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
