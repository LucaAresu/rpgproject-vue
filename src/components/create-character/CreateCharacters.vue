<template>
  <div>
    <h1>Crea il tuo personaggio </h1>
      <characters :index="index" @changeChar="index = ((total + index + $event)%total)" />
    <name @complete="createCharacter($event)" />
  </div>
</template>
<script>
import constants from '../../constants'
import Characters from './Characters'
import Name from './ChooseName'
export default {
  data () {
    return {
      index: 0,
      total: constants.totalCharacters
    }
  },
  components: {
    Characters,
    Name
  },
  methods: {
    createCharacter (name) {
      this.$store.dispatch('createCharacter', {
        name,
        avatar: this.index
      })
    }
  }
}
</script>
<style scoped>
h1 {
  text-align: center;
}
</style>
