<template>
  <div>
    <h2>Inserisci il nome</h2>
    <input v-model="name">
    <button :disabled="!name" @click="$emit('complete',name)">Invia </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: ''
    }
  }
}
</script>

<style scoped>
  input {
    padding: 0.5rem;
  }
  button {
    padding: 0.5rem;
  }
  div {
    display: flex;
    justify-content: center;
  }
  h2 {
    display: block;
    text-align: center;
  }
</style>
