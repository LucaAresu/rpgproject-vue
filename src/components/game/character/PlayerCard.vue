<template>
  <div class="card">
    <div class="name">
      {{ $store.getters.getName }}
    </div>
    <div class="body">
      <div class="stats">
        <div class="bartext">
          Lvl: {{ $store.getters.getCharacterLevel}}
        </div>
        <div class="barfield">
          <div class="bartext">
           EXP: {{ currentExp }}/{{ maxExp }}
          </div>
          <div class="exp bar">
            <div class="current" :style="{width: getWidth(currentExp, maxExp)}"></div>
          </div>
        </div>
        <div class="barfield">
          <div class="bartext">
           HP: {{ currentHp }}/{{ maxHp }}
          </div>
          <div class="hp bar">
            <div class="current" :style="{width: getWidth(currentHp, maxHp)}"></div>
          </div>
        </div>
        <div class="barfield">
          <div class="bartext">
           Mana: {{ currentMana }}/{{ maxMana }}
          </div>
          <div class="mana bar">
            <div class="current" :style="{width: getWidth(currentMana, maxMana)}"></div>
          </div>
        </div>
      </div>
      <div class="charimage">
        <img :src="require('@/assets/characters/' + $store.getters.getAvatar + '.png')" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    getWidth (current, max) {
      return ((current * 100) / max).toFixed(0) + '%'
    }
  },
  computed: {
    currentHp () { return this.$store.getters.getCurrentHp },
    maxHp () { return this.$store.getters.getMaxHp },
    currentMana () { return this.$store.getters.getCurrentMana },
    maxMana () { return this.$store.getters.getMaxMana },
    currentExp () { return this.$store.getters.getExpThisLevel },
    maxExp () { return this.$store.getters.getExpRequired }
  }
}
</script>
<style scoped>
 @import url('https://fonts.googleapis.com/css2?family=Lemonada:wght@700&display=swap');
 .card {
  width: 100%;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px #ccc;
  font-size: 1.5rem;
}
.body {
  display:flex;
  justify-content: space-between;
}
.stats {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
}
.bartext {
  border-bottom: 1px solid #ccc;
}
.name {
  font-family: 'Lemonada', cursive;
  background-color: #d0f4de;
  color: #353535;
  text-align: center;
  font-size: 1.5rem;
  border-bottom: 1px solid black;
  text-transform: capitalize;
}
.name::first-letter {
  font-size: 2.5rem;
}
.charimage {
  border-left: 1px solid black;
  width: auto;
}
.barfield {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.bartext {
  width: 100%;
}
.hp {
  border: 1px solid red;
}
.bar {
  align-self: center;
  margin: 10px;
  height: 1rem;
  width: 100%;
}
.hp .current {
  background-color: red;
}
.current {
  height: 1rem;
}
.exp {
  border: 1px solid #90e0ef;
}
.exp .current {
  background-color: #90e0ef;
}

.mana {
  border: 1px solid #0466c8;
}
.mana .current {
  background-color: #0466c8;
}
@media ( min-width: 800px) {
.barfield {
  flex-direction: row;
}
}
</style>
