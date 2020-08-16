<template>
  <div>
    <div class="name">
      Hai sconfitto {{monster.name}}!
    </div>
    <div class="image">
      <img :src="require('@/assets/monsters/' + monster.icon)" />
      <div class="cross">X</div>
    </div>
    <div class="drops">
      <div class="title">
        DROPS
      </div>
      <transition-group name="slide">
        <div class="list" v-for="item in list" :key="item.name">
          <div class="label">
            {{item.name}}
          </div>
          <div class="quantity">
            {{item.quantity}}
          </div>
        </div>
      <button @click="endCombat" key="button">CONTINUA</button>
      </transition-group>
  </div>
</div>
</template>
<script>
import constants from '../../../constants'
export default {
  data () {
    return {
      monster: this.$store.getters.getMonster,
      list: []
    }
  },
  methods: {
    endCombat () {
      this.$store.dispatch('endCombat')
    }
  },
  computed: {
    dropList () {
      return this.$store.getters.getDropList
    }
  },
  watch: {
    dropList () {
      let i = 1
      this.dropList.forEach(ele => setTimeout(() => this.list.push(ele), ++i * constants.application.dropViewDelay))
    }
  },
  created () {
    this.$store.dispatch('handleDrops')
  }
}
</script>
<style scoped>
.name {
  text-align: center;
  font-size: 2rem;
}
.image {
  display: flex;
  justify-content: center;
  align-items: center;
}
.cross {
  color: red;
  position: absolute;
  font-size: 20rem;
  opacity: 0.6;
}
.drops .title {
  font-size: 2rem;
  text-align: center;
  border: 1px solid black;
  box-shadow: 1px 1px 1px #ccc;
  background-color: #2a9d8f;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}
.drops {
  border: 1px solid #ccc;
}
.list {
  font-size: 1.5rem;;
  text-align: center;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem;
}
button {
  width: 100%;
  margin: 0.5rem 0 0 0;
}
.slide-move {
  transition: 100ms;
}
</style>
