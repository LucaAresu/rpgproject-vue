<template>
  <div class="talent-page">
    <div class="points-to-spend">
      Punti da spendere: {{talentsAvailable}}
    </div>
    <div class="talent-tree"
      v-for="tree in talents"
      :key="tree.name"
      :style="{backgroundColor: tree.color}"
      @click="selected = tree.key"
    >
    <div class="tree-name">
      {{tree.name}}
    </div>
      <transition name="expand" mode="out-in">
        <tree-view :selectedTree="selected" v-if="selected && selected === tree.key" />
      </transition>
    </div>
  </div>
</template>
<script>
import treeView from './TalentTreeView'
import constants from '../../../constants'
export default {
  data () {
    return {
      selected: '',
      talents: constants.talents
    }
  },
  computed: {
    talentsAvailable () {
      return this.$store.getters.getTalentsToAllocate
    }
  },
  components: {
    treeView
  }
}
</script>
<style scoped>
.points-to-spend {
  padding: 1rem;
  text-align: center;
  border: 1px solid black;
  margin-bottom: 1rem;
  box-shadow: 1px 1px 1px #ccc;
}
.talent-page {
  width: 100%;
}
.tree-name {
  padding: 1rem;
  text-align: center;
}
.talent-tree {
  border: 1px solid black;
  width: 100%;
}
.tree {
  width: 100%;
}

.expand-enter-active {
  animation: expand 500ms ease-out forwards;
}
@keyframes expand {
  from {
    transform: translateY(-50px)
  }
  to {
    transform: translateY(0)
  }
}
</style>
