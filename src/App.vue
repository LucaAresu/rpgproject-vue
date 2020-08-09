<template>
  <div id="app">
    <Header />
    <transition name="slide" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script>
import Header from './components/Header'

export default {
  components: {
    Header
  },
  created () {
    const ref = localStorage.getItem('refresh_token')
    if (ref) {
      this.$store.dispatch('startLoading')
      this.$store.dispatch('refreshLogin', ref)
    }
  }
}
</script>
<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  overflow: hidden;
}
.slide-enter-active {
  animation: slide-in 100ms ease-out forwards;
}
@keyframes slide-in {
  from {
      transform: translateX(400px);
  }
  to {
      transform: translateX(0);
  }
}
.slide-leave-active {
  animation: slide-out 100ms ease-out forwards
}
@keyframes slide-out {
  from {
      transform: translateX(0);
  }
  to{
      transform: translateX(400px);
  }
}
</style>
