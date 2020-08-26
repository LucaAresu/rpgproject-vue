<template>
  <div class="buttondescription">
    <div class="attackarea">
      <div v-for="(attack, index) in attackList" :key="attack.name">
        <button
          @mouseover="hoverAttack=attack"
          :style="{backgroundColor: buttonDisabled(attack) ? disabledBgColor : attack.color}"
          @click="playerAction(index)"
          :disabled="buttonDisabled(attack)"
          > {{attack.name}} </button>
      </div>
    </div>
    <div class="attackdescription" v-if="hoverAttack">
      <div class="title" :style="{color: hoverAttack.color}">
          {{hoverAttack.name}}
      </div>
        <div class="cost" v-if="hoverAttack.cost.hp || hoverAttack.cost.mana" >Costo
          <span class="hp-cost" v-if="hoverAttack.cost.hp"> {{hoverAttack.cost.hp}}% HP </span>
          <span class="mana-cost" v-if="hoverAttack.cost.mana" :style="{color: resourceColor}"> {{hoverAttack.cost.mana}} {{resourceName}} </span>
        </div>
      <div class="description">
        {{hoverAttack.description}}
      </div>
    </div>
  </div>
</template>
<script>
import constants from '../../constants'
export default {
  props: ['selected', 'canAttack'],
  computed: {
    attackList () {
      return Object.keys(constants.playerattacks[this.selected]).map(ele => constants.playerattacks[this.selected][ele]).filter(ele => {
        if (!ele.isTalent && !ele.isClass) {
          return true
        }
        if (ele.isTalent) {
          const talentTree = ele.talentLocation.tree
          const talentName = ele.talentLocation.name
          return this.character.talents[talentTree][talentName]
        }
        if (ele.isClass) {
          return ele.isClass === this.$store.getters.getClass
        }
      }).reduce((acc, ele) => ({ ...acc, [ele.key]: { ...ele } }), {})
    },
    character () {
      return this.$store.getters.getCharacter
    }
  },
  data () {
    return {
      hoverAttack: null,
      disabledBgColor: '#ccc',
      resourceName: constants.classes[this.$store.getters.getClass].resourceName,
      resourceColor: constants.classes[this.$store.getters.getClass].resourceColor
    }
  },
  methods: {
    playerAction (index) {
      const action = {
        action: this.selected,
        type: index
      }
      this.$emit('action', action)
    },
    buttonDisabled (attack) {
      const percentualHealthCost = Math.round(this.character.maxHp * attack.cost.hp / 100)
      const manaCost = attack.cost.mana
      return !this.canAttack || (manaCost > this.character.currentMana || percentualHealthCost >= this.character.currentHp)
    }
  }
}
</script>
<style scoped>
.buttondescription {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.attackarea {
  display: flex;
  flex-wrap: wrap;
}
.attackarea > div {
  margin: 0.2rem 0.5rem;
}
button {
  padding: 0.5rem 2rem;
  transition: 500ms;
}
button:hover {
  box-shadow:  inset 1px 1px 1px black;
}
button:disabled {
  border: 1px solid black;
  color: #555;
}
button:hover:disabled {
  box-shadow: none
}
.attackdescription {
  padding: 1rem;
}
.attackdescription .title {
  text-align: center;
  font-size: 1.5rem;
}
.attackdescription div {
  padding: 0.5rem;
}
.hp-cost {
  color: red;
}
.attackdescription .description {
  border: 1px solid #ccc;
  padding: 1rem;
  box-shadow: 1px 1px 1px #ccc;
}
</style>
