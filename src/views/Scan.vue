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
        <ul class="attacklist">
        <li class="attack">Primo attacco
          <ul>
            <li> {{getAttackName(monster.firstAttack)}} </li>
          </ul>
        </li>
        <li class="attack" v-for="attack in monster.attacks" :key="attack">
          {{getAttackName(attack)}}
        </li>
        </ul>
      </div>
      <div class="drops" v-if="scanLevel >= 3">
        <div class="name">Drops</div>
        <div class="droplist" v-for="(drop, index) in monster.drop" :key="index">
          <div class="simple-drop" v-if="index !== 'item' && index !== 'fixedItem'">
            <div v-if="typeof drop === 'number' || typeof drop ==='string'">{{getDropTranslation(index)}}: {{drop}} </div>
            <div v-else> {{getDropTranslation(index)}} {{drop.quantity}} ( {{drop.dropRate}}% )</div>
          </div>
          <div v-else-if="index ==='item'">
            <div class="item" v-if="index ==='item'">
              Una possibilità del {{drop.dropRate}}% di item casuale, con slot {{getDropSlot(monster.drop.item.info.slot)}} e di rarità {{getRarityLabel(monster.drop.item.info.rarity)}}
            </div>
          </div>
          <div v-else>
            {{drop.info.name}}: {{drop.dropRate}}% (statistiche diverse dalla descrizione)
            <item-view :item="drop.info" />
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import itemView from '../components/game/equip/ItemView'
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
    },
    getDropTranslation (word) {
      return constants.application.dropTranslation[word]
    },
    getDropSlot (slot) {
      return slot ? slot.charAt(0).toUpperCase() + slot.slice(1) : 'Casuale'
    },
    getRarityLabel (rarity) {
      console.log(rarity)
      if (rarity === null) {
        return 'Casuale'
      } else {
        return constants.inventory.rarityInfo[rarity].name
      }
    }
  },
  components: {
    itemView
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
ul {
  margin: 0 1rem;
  list-style-position: inside;
}
</style>
