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
// import axios from 'axios'
// import { refresh } from '../../private/axioslogin'

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
  /* created () {
    const uid = this.$store.getters.getUserId
    const idt = this.$store.getters.getToken
    axios.post(uid + '.json?auth=' + idt, { boh: 'sfsafasi' })
    refresh.post('', {
      grant_type: 'refresh_token',
      refresh_token: this.$store.getters.getRefreshToken
    })
  } */
}
</script>
<style scoped>
h1 {
  text-align: center;
}
</style>
