<template>
  <div class="log">
    <ul v-if="list.length">
      <transition-group name="pop" mode="out-in">
        <li
          class="element"
          v-for="element in list"
          :class="element.class"
          :key="element.id"
          :style="{color: element.action.color}"
        >
          {{element.message}}
        </li>
      </transition-group>
    </ul>
    <div v-else>Per iniziare a giocare clicca uno slot nella mappa, ma prima ricordati di impostare le stats e i talenti! </div>
  </div>
</template>
<script>
export default {
  props: ['mode'],
  computed: {
    list () {
      return this.$store.getters[this.mode]
    }
  }
}
</script>
<style scoped>
ul {
  list-style: none;
}
.pop-enter-active {
  animation: pop-in 500ms ease-out forwards
}
@keyframes pop-in {
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
}
.pop-move {
  transition: 200ms;
}
.pop-leave-active {
  animation: pop-out 500ms ease-out forwards;
  position: absolute;
}
@keyframes pop-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
