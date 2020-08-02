<template>
  <div>
    <h1>Crea il tuo personaggio </h1>
    <characters :index="index" @changeChar="index+=$event" />
    <name @complete="createCharacter($event)" />
  </div>
</template>
<script>
import Characters from './Characters';
import Name from './ChooseName';
export default {
  data() {
    return {
      index : 0,
    }
  },
  components: {
    Characters,
    Name,
  },
  methods: {
    createCharacter(name) {
      this.$store.dispatch('createCharacter', {
        name,
        avatar : this.index
      });
    },
    
  }
}
</script>
<style scoped>
h1 {
  text-align: center;
}
</style>