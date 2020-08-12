<template>
<div :style="{height, border: '1px solid ' + color}">
  <div class="current" :style="{height, width, backgroundColor: color, transition: tick + 'ms'}"></div>
</div>
</template>
<script>
import constants from '../../constants'
export default {
  props: ['current', 'max', 'color', 'height'],
  computed: {
    width () {
      return ((this.current * 100) / this.max).toFixed(0) + '%'
    }
  },
  data () {
    return {
      tick: constants.application.atb.tick
    }
  }
}
</script>
