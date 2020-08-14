<template>
  <div class="talent-tree-view">
    <div class="talent-area" :style="{backgroundColor: tree.viewcolor}">
        <div class="row" v-for="tier in tree.maxTier" :key="tier">
          <div class="talent" v-for="talent in getTalentsInTier(tier)" :key="talent.name" @click="selectedTalent = talent">
            <div class="image">
            <img :src="require('@/assets/talents/' + talent.icon)" />
            </div>
            <div class="name">
              {{talent.name}}
            </div>
          </div>
        </div>
    </div>
    <div class="description" v-if="selectedTalent">
      <div class="name">
        {{ selectedTalent.name}} ({{playerTalents[tree.key][selectedTalent.key]}})
      </div>
      <div class="required" v-if="!requiredSatisfied" :style="{ backgroundColor: tree.viewcolor }">
        Richiede {{requiredTalentInfo.level}} punto/i in {{requiredTalentInfo.name}}
      </div>
      <div class="desc" :style="{ backgroundColor: tree.viewcolor }">
        <p v-for="(desc, index) in selectedTalent.description" :key="desc">Livello {{index + 1}}: {{desc}}</p>
      </div>
      <div class="compra" >
        <button @click="buyTalent" :disabled="buttonDisabled || !this.requiredSatisfied" >COMPRA </button>
      </div>
    </div>
  </div>
</template>
<script>
import constants from '../../../constants'
export default {
  props: ['selectedTree'],
  data () {
    return {
      tree: constants.talents[this.selectedTree],
      talentList: constants.talents[this.selectedTree].talents,
      selectedTalent: ''
    }
  },
  methods: {
    getTalentsInTier (tier) {
      return Object.keys(this.talentList).map(ele => this.talentList[ele]).filter(ele => ele.tier === tier)
    },
    buyTalent () {
      this.$store.dispatch('buyTalent', {
        tree: this.tree.key,
        name: this.selectedTalent.key
      })
    }
  },
  computed: {
    availablePoints () {
      return this.$store.getters.getTalentsToAllocate
    },
    playerTalents () {
      return this.$store.getters.getTalents
    },
    selectedTalentCurrentLevel () {
      return this.playerTalents[this.tree.key][this.selectedTalent.key]
    },
    buttonDisabled () {
      const maxLevel = this.tree.talents[this.selectedTalent.key].maxLevel
      return maxLevel === this.selectedTalentCurrentLevel || !this.availablePoints
    },
    requiredSatisfied () {
      if (!this.selectedTalent.requires) {
        return true
      }
      return this.playerTalents[this.tree.key][this.selectedTalent.requires.name] >= this.selectedTalent.requires.level
    },
    requiredTalentInfo () {
      return {
        name: this.talentList[this.selectedTalent.requires.name].name,
        level: this.selectedTalent.requires.level
      }
    }
  }
}
</script>
<style scoped>
.talent-area {
  display: flex;
  flex-direction: column-reverse;
}
.talent-tree-view {
}
img {
  width: 100px;
  border-radius: 5px;
}
.row {
  margin: 1rem;
  display: flex;
  justify-content: space-around;
}
.name {
  text-align: center
}
.image {
  display: flex;
  justify-content: center;
  margin: 0.2rem;
}
.talent {
  width: 50%;
}
.talent .name {
  margin-top: 0.5rem;
}
.description .name {
  padding: 1rem;
}
.description .desc {
  padding: 1rem;
}
button {
  margin: 0;
  box-shadow: none;
  width: 100%;
  border: none;
}
.required {
  color: #4f000b;
  padding: 1rem;
  text-align: center;
}
button:hover {
  box-shadow: inset 1px 1px 1px black;
}
</style>
