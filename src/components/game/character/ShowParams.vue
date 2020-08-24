<template>
  <div class="params">
    <div class="param" v-for="param in params" :key="param">
      {{param}} {{ paramFormulas[param](level, stats, character) }}  => {{paramFormulas[param](level, combinatedStats, character)}}
    </div>
  </div>
</template>
<script>
import constants from '../../../constants'
export default {
  data () {
    return {
      params: constants.character.paramOrder,
      paramFormulas: constants.character.paramFormulas,
      level: this.$store.getters.getCharacterLevel,
      stats: ({ ...this.$store.getters.getStats }),
      character: this.$store.getters.getCharacter
    }
  },
  props: ['combinatedStats'],
  watch: {
    combinatedStats: function () {
      this.stats = { ...this.$store.getters.getStats }
    }
  }
}
</script>
<style scoped>
.params {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: #a9def9;
}
.param {
  margin: 10px;
}

</style>
