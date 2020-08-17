<template>
  <div class="choosename">
      <div>
        <label for="name" >Inserisci il nome </label>
        <input v-model="name" @keydown.enter="$emit('complete', name)">
      </div>
      <button :disabled="!name" @click="$emit('complete',name)" >Invia </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: ''
    }
  },
  created () {
    this.a = this.$store.getters.getEquippedStats
  }
}
</script>

<style scoped>
input {
  border: 1px solid black;
  padding: 0.5rem;
  width: 100%;
}

h2 {
  display: block;
  text-align: center;
}
.choosename {
  margin-top: 2rem;
}

button {
  width: 100%;
}
@media (min-width: 900px) {
  .choosename {
    width: 40%;
    margin: auto;
  }
}
@media (min-width: 1400px) {
  .choosename {
    width: 20%;
  }
}
</style>
