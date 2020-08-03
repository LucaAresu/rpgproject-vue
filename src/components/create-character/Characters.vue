<template>
  <div>
    <div class="char">
      <div class="arrow">
        <button @click="$emit('changeChar',-1)">Precedente</button>
      </div>
      <div class="image">
        <transition name="fade" mode="out-in">
          <img :src="require('@/assets/characters/'+index+'.png')" :key="index"/>
        </transition>
      </div>
      <div class="arrow">
        <button @click="$emit('changeChar',1)">Successivo</button>
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
}
.arrow {
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  height: 300px;
  width: 300px;
}
.arrow button {
  padding: 1rem;
  background-color: #ccc;
  border: none;
  box-shadow: 1px 1px 2px black;
  height: auto;
}
button:hover {
  box-shadow: inset 1px 1px 2px black;
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
