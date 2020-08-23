<template>
  <div class="resources" :style="{backgroundImage: 'url(' + require('@/assets/characters/bg/' + $store.getters.getAvatar + '.png') + ')'}">
    <div class="character" >
        <div class="char-info">
          <div class="label">
        {{ $store.getters.getName.toLowerCase() }}
          </div>
        <div class="bar">
          <resource-bar
            height="1rem"
            color="red"
            :current="$store.getters.getCurrentHp"
            :max="$store.getters.getMaxHp"
          />
        </div>
      </div>
      <div class="char-info">
        <div class="label">
          {{className}} LV {{ $store.getters.getCharacterLevel }}
        </div>
        <div class="bar">
          <resource-bar
            height="1rem"
            color="#90e0ef"
            :current="$store.getters.getExpThisLevel"
            :max="$store.getters.getExpRequired"
          />
        </div>
      </div>
    </div>
    <div class="resources-list">
      <div class="current-level">
        <img :src="require('@/assets/resources/castle.png')" /> LV {{$store.getters.getCurrentLevel}}
      </div>
      <div class="money">
        <img :src="require('@/assets/resources/money.png')" />  {{ $store.getters.getMoney.toLocaleString() }}
      </div>
      <div class="keys">
        <img :src="require('@/assets/resources/key.png')" /> {{$store.getters.getKeys}}
      </div>
    </div>
  </div>
</template>
<script>
import resourceBar from '../ui/ResourceBar'
import constants from '../../constants'
export default {
  components: {
    resourceBar
  },
  data () {
    return {
      className: constants.classes[this.$store.getters.getClass].name
    }
  }
}
</script>
<style scoped>
 @import url('https://fonts.googleapis.com/css2?family=Lemonada:wght@600&display=swap');
.resources {
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  padding: 0.5rem;
  box-shadow: 1px 1px 1px #ccc;
  background-position: 0 50%;
  background-repeat: no-repeat;
  font-size: 1.2rem;
  width: 100%;
}
.char-info {
  display: flex;
  margin: 0.5rem;
  font-family: 'Lemonada', cursive;
  display: flex;
  align-items: center;
  text-transform: capitalize
}
.resources-list {
  display: flex;
  justify-content: space-around;
}
.label {
  min-width: 10rem;
}
img {
  width: 25px;
  height: 25px;
}
.bar {
  margin-left: 2rem;
  min-width: 10rem;
  width: 100%;
}
@media (min-width: 800px) {
  .resources {
    width: 50%;
  }
}
@media (min-width: 1200px) {
  .resources {
    width: 30%;
  }
}
</style>
