<template>
  <div class="talent-page">
    <div class="talent-tree"
      v-for="tree in talents"
      :key="tree.name"
      :style="{backgroundColor: tree.color}"
      @click="selected = tree.name"
    >
      {{tree.name}}
      <transition name="expand" mode="out-in">
      <div class="tree" :class="tree.name" v-if="selected === tree.name" :key="tree.name">
        a <br>a <br>a <br>a <br>a <br>a <br>a <br>a <br>a <br>a <br>a <br>a <br>
      </div>
      </transition>
    </div>
  </div>
</template>
<script>
import constants from '../../../constants'
export default {
  data () {
    return {
      selected: 'Warrior',
      talents: constants.talents
    }
  }
}
</script>
<style scoped>
.talent-page {
  width: 100%;
}
.talent-tree {
  border: 1px solid black;
  width: 100%;
}
.tree {
  width: 100%;
  background-color: #ccc;
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
