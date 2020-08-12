<template>
<div class="buttonarea">
  <div class="attackbuttons">
    <div class="button">
      <button class="attack" :disabled="selected === 'ATK'" @click="pickArea('ATK')">Attacchi</button>
      </div>
    <div class="button">
      <button class="magia" :disabled="selected === 'MAG'" @click="pickArea('MAG')">Magie</button>
      </div>
    <div class="button" >
      <button class="difesa" :disabled="selected === 'DEF'" @click="pickArea('DEF')">Difesa</button>
      </div>
    <div class="button">
      <button class="altro" :disabled="selected === 'ALT'" @click="pickArea('ALT')">Altro</button>
      </div>
  </div>
  <button-description :selected="selected" />
</div>
</template>
<script>
import buttonDescription from './ButtonDescription'
export default {
  data () {
    return {
      selected: this.$store.getters.getSelectedButtonInCombat
    }
  },
  methods: {
    pickArea (choice) {
      this.selected = choice
      this.$store.dispatch('setSelectedButtonInCombat', choice)
    }
  },
  components: {
    buttonDescription
  }
}
</script>
<style scoped>
.attackbuttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
.button {
  width: 24%;
}
button {
  width: 100%;
  padding: 0.5rem;
}
.attack {
  background-color: #f94144;
}

.magia {
  background-color: #7bdff2;
}
button:hover {
    box-shadow: inset 1px 1px 1px black;
}

.difesa {
  background-color: #efea5a;
}

.altro {
  background-color: #e4c1f9;
}

button:disabled {
  background-color: #ccc;
  border: 1px solid black;
  color: black;
  box-shadow: inset 1px 1px 1px black;
  cursor: default;
}
</style>
