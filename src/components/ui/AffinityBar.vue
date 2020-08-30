<template>
<div class="top" :style="{height}">
  <div class="fis" :style="{
      borderTop: '1px solid ' + fisColor ,
      borderLeft: '1px solid ' + fisColor,
      borderBottom: '1px solid ' + fisColor
      }">
    <div :style="{height, width: fisWidth, backgroundColor: fisColor, transition: transitionValue}" />
  </div>
  <div class="mag" :style="{
      borderTop: '1px solid ' + magColor ,
      borderRight: '1px solid ' + magColor,
      borderBottom: '1px solid ' + magColor
    }">
    <div :style="{height, width: magWidth, backgroundColor: magColor, transition: transitionValue}" />
  </div>
</div>
</template>
<script>
import constants from '../../constants'
export default {
  props: ['current', 'max', 'height', 'transition'],
  data () {
    return {
      fisColor: constants.classes.ZOOLOGIST.physicalColor,
      magColor: constants.classes.ZOOLOGIST.magicalColor
    }
  },
  computed: {
    fisWidth () {
      if (this.current > 0) {
        return 0
      }
      const current = Math.abs(this.current)
      return ((current * 100) / this.max).toFixed(0) + '%'
    },
    magWidth () {
      if (this.current < 0) {
        return 0
      }
      return ((this.current * 100) / this.max).toFixed(0) + '%'
    },
    borderColor () {
      return this.magWidth ? this.magColor : this.fisColor
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
<style scoped>
.top {
  display: flex;
  justify-content: center;
}
.top > div {
  width: 50%;
}
.fis {
  display: flex;
  justify-content: flex-end;
}
</style>
