<template>
  <div>
    <div class="char">
      <div class="arrow prev">
        <button @click="$emit('change-char',-1)">Precedente</button>
      </div>
      <div class="image">
        <transition name="fade" mode="out-in">
          <img :src="require('@/assets/characters/'+index+'.png')" :key="index"/>
        </transition>
      </div>
      <div class="arrow next">
        <button @click="$emit('change-char',1)">Successivo</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['index']
}
</script>

<style scoped>
.char {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: relative;
}
.arrow {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -2rem;
}
.prev {
  left: 0;
}
.next {
  right: 0;
}
@media(min-width: 800px) {
  .arrow{
    position: static;
  }
}
img {
  height: 300px;
  width: 300px;
}

.fade-enter-active {
  animation: fade-in 200ms ease-out forwards;
}
@keyframes fade-in {
  from {
    transform: translateX(100px);
  }
  to {
    transform: translateX(0);
  }
}
.image {
  overflow: hidden;
}
</style>
