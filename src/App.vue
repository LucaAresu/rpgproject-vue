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
 @import url('https://fonts.googleapis.com/css2?family=Recursive:wght@500&display=swap');* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Recursive', sans-serif;}
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
button {
  border: 1px solid black;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 1px 2px 1px #ccc;
}
button:hover:not([disabled]) {
  cursor: pointer;
  box-shadow: inset 1px 2px 1px #ccc;
}
button:disabled {
  cursor: not-allowed;
  border: 1px solid #ccc;
  box-shadow: inset 1px 2px 1px #ccc;
  color: #ccc;

}
</style>
