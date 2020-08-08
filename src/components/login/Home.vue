<template>
  <div>
    <div v-if="! $store.getters.isLoading" class="home">
      <button @click="$router.push({ name: 'Login' })">Login</button>
      <button @click="$router.push({ name: 'Register' })">Registrati</button>
    </div>
    <div v-else class="home">
      <pacman-loader />
    </div>
  </div>
</template>
<script>
import PacmanLoader from '../../../node_modules/vue-spinner/src/PacmanLoader'
export default {
  components: {
    PacmanLoader
  }
}
</script>
<style scoped>
.home {
  display: flex;
  justify-content: center;

}
button {
  margin: 1rem;
  width: 50%;
  padding: 0.5rem;
  background-color: #43aa8b;
  border: none;
}
button:hover{
  background-color: #90be6d;
}

</style>
