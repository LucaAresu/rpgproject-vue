<template>
<div :style="{height, border: '1px solid ' + color}">
  <div class="current" :style="{height, width, backgroundColor: color}"></div>
</div>
</template>
<script>
export default {
  props: ['current', 'max', 'color', 'height'],
  computed: {
    width () {
      return ((this.current * 100) / this.max).toFixed(0) + '%'
    }
  }
}
</script>
