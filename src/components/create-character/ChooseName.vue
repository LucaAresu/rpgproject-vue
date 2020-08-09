<template>
  <div>
    <h2>Inserisci il nome</h2>
    <div class="charname">
      <input v-model="name">
      <button :disabled="!name" @click="$emit('complete',name)">Invia </button>
    </div>
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
  width: 100%;
}
button {
  padding: 0.5rem;
}
h2 {
  display: block;
  text-align: center;
}
.charname {
  display: flex;
  justify-content: center;
}
@media (min-width: 800px) {
  input {
    width: 20%;
  }
}
</style>
