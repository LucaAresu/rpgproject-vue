<template>
  <div class="scan">
      <div class="name">
        {{monster.name}}
      </div>
      <div class="image">
        <img :src="require('@/assets/monsters/' + monster.icon)" />
      </div>
      <div class="description">
        <div class="name">Descrizione</div>
        <div class="descriptiontext">
          {{ monster.description }}
        </div>
      </div>
      <div class="stats" v-if="scanLevel >= 1">
        <div class="name">Stats</div>
        <div class="row">
          <div class="col">
            <p>HP: {{monster.currentHp}}/{{monster.maxHp}}</p>
            <p>ATK: {{monster.stats.ATK}} <p>
            <p>MAG: {{monster.stats.DEF}}</p>
          </div>
          <div class="col">
            <p>DEF: {{monster.stats.DEF}}</p>
            <p>Cooldown: {{(monster.cooldown / 1000).toFixed(1)}}s</p>
          </div>
        </div>
      </div>
      <div class="attacks" v-if="scanLevel >= 3">
        <div class="name">Attacchi</div>
        <div class="attacklist" v-for="attack in monster.attacks" :key="attack">
          {{getAttackName(attack)}}
        </div>
      </div>
    </div>
</template>
<script>
import constants from '../constants'
export default {
  computed: {
    monster () {
      return this.$store.getters.getMonster
    }
  },
  data () {
    return {
      scanLevel: this.$store.getters.getTalents.EXPLORER.SCAN
    }
  },
  methods: {
    getAttackName (attack) {
      return constants.monsterattacks[attack].label
    }
  }
}
</script>
<style scoped>
 @import url('https://fonts.googleapis.com/css2?family=Lemonada:wght@700&display=swap');
.scan {
  border: 1px solid black;
  box-shadow: 1px 1px 1px #ccc;
  font-size: 1.2rem;
}
.name {
  font-family: 'Lemonada', cursive;
  text-align: center;
  font-size: 1.5rem;
  background-color: #ef476f;
  padding: 0.5rem;
  border-bottom: 1px solid black;
}
.image {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid black;
}
.row {
  display: flex;
  justify-content: space-evenly;
  font-size: 1.2rem;
}
.col {
  margin: 1rem;
}
.descriptiontext {
  padding: 1rem;
  font-size: 1rem;
}
.attacklist {
  padding: 1rem;
  font-size: 1rem;
}

@media (min-width: 800px) {
  .scan {
    width: 50%;
    margin: auto;
  }
}
</style>
