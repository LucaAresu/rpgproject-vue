<template>
  <div class="buttondescription">
    <div class="attackarea">
      <div v-for="(attack, index) in attackList" :key="attack.name">
        <button
          @mouseover="descHover=index"
          :style="{backgroundColor: attack.color}"
          @click="playerAction(index)"
          :disabled="!canAttack"
          > {{attack.name}} </button>
      </div>
    </div>
    <div class="attackdescription">
      FARE DESCRIZIONE {{descHover}} {{canAttack}}
    </div>
  </div>
</template>
<script>
import constants from '../../constants'
export default {
  props: ['selected', 'canAttack'],
  computed: {
    attackList () {
      return constants.playerattacks[this.selected]
    },
    description () {
      return constants.playerattacks[this.selected][this.descHover]
    }
  },
  data () {
    return {
      descHover: null
    }
  },
  methods: {
    playerAction (index) {
      const action = {
        action: this.selected,
        type: index
      }
      this.$emit('action', action)
    }
  }
}
</script>
<style scoped>
.buttondescription {
  display: flex;
  justify-content: space-between;
}
button {
  padding: 0.5rem 1rem;
}
</style>
