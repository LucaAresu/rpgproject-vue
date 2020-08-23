<template>
  <div class="create-characters">
    <h1>Crea il tuo personaggio </h1>
      <characters :index="index" @change-char="index = ((total + index + $event)%total)" />
      <choose-class :selectedClass="selectedClass" @class-chosen="selectedClass = $event" />
    <name @complete="createCharacter($event)" />
  </div>
</template>
<script>
import constants from '../../constants'
import Characters from './Characters'
import Name from './ChooseName'
import chooseClass from './ChooseClass'

export default {
  data () {
    return {
      index: 0,
      total: constants.character.totalCharacters,
      selectedClass: 'WARRIOR'
    }
  },
  components: {
    Characters,
    Name,
    chooseClass
  },
  methods: {
    createCharacter (name) {
      this.$store.dispatch('createCharacter', {
        name,
        avatar: this.index,
        class: this.selectedClass
      })
      this.$store.dispatch('createMap')
    }
  }
}
</script>
<style scoped>
h1 {
  text-align: center;
}
.create-characters {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
