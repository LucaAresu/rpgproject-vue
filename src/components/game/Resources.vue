<template>
  <div class="resources" :style="{backgroundImage: 'url(' + require('@/assets/characters/bg/' + $store.getters.getAvatar + '.png') + ')'}">
    <div class="character" >
      {{ $store.getters.getName }}
      LV {{$store.getters.getCharacterLevel}}
      <div class="healthbar">
        <resource-bar
          height="1rem"
          color="red"
          :current="$store.getters.getCurrentHp"
          :max="$store.getters.getMaxHp"
        />
      </div>
    </div>
    <div class="money">
        <img :src="require('@/assets/resources/money.png')" />  {{ $store.getters.getMoney }}
    </div>
  </div>
</template>
<script>
import resourceBar from '../ui/ResourceBar'
export default {
  components: {
    resourceBar
  }
}
</script>
<style scoped>
 @import url('https://fonts.googleapis.com/css2?family=Lemonada:wght@700&display=swap');
.resources {
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  padding: 0.5rem;
  box-shadow: 1px 1px 1px #ccc;
  background-position: 0 50%;
  background-repeat: no-repeat;
  font-size: 1.2rem;
}
.character {
  display: flex;
  margin: 0.5rem;
  font-family: 'Lemonada', cursive;
  display: flex;
  align-items: center;
}

img {
  width: 25px;
  height: 25px;
}
.healthbar {
  margin-left: 2rem;
  width: 10rem;
}
</style>
