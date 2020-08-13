<template>
<div :style="{height, border: '1px solid ' + color}">
  <div class="current" :style="{height, width, backgroundColor: color, transition: transitionValue}"></div>
</div>
</template>
<script>
import constants from '../../constants'
export default {
  props: ['current', 'max', 'color', 'height', 'transition'],
  computed: {
    width () {
      return ((this.current * 100) / this.max).toFixed(0) + '%'
    },
    transitionValue () {
      if (this.transition) {
        return this.transition + 'ms'
      } else {
        return constants.application.healthbarTransition
      }
    }
  }
}
</script>
