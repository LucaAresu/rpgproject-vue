<template>
<div>
  <div class="loginbox" v-if="! $store.getters.isLoading ">
      Inserisci i dati del tuo account
    <p class="error" v-show="error"> {{ error }} </p>
    <div class="input">
      <label for="email">Email</label>
      <input v-model="email" type="email" @keydown.enter="login" />
    </div>
    <div class="input">
      <label for="password">Password</label>
      <input v-model="password" type="password"  @keydown.enter="login" />
    </div>
    <button @click="login">Login</button>
  </div>
  <div v-else class="loading">
    <pacman-loader />
  </div>
</div>
</template>
<script>
import PacmanLoader from 'vue-spinner/src/PacmanLoader'
export default {
  data () {
    return {
      email: '',
      password: '',
      timeout: null
    }
  },
  computed: {
    error () {
      return this.$store.getters.getError
    }
  },
  watch: {
    error () {
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
      this.timeout = setTimeout(() => this.$store.dispatch('clearLoginErrors'), 3000)
    }
  },
  methods: {
    login () {
      this.$store.dispatch('clearLoginErrors')
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
    }
  },
  components: {
    PacmanLoader
  },
  created () {
    this.$store.dispatch('clearLoginErrors')
  }
}
</script>
<style scoped>

.loginbox {
  text-align: center;
  width: 100%;
}
.loading {
  display: flex;
  justify-content: center;
}
.input {
  margin: 0.5rem auto;
}
button {
  display: block;
  margin: auto;
  width: 100%;
  padding: 0.5rem;
  background-color: #43aa8b;
  border: none;
}
button:hover{
  background-color: #90be6d;
}
input {
  width: 100%;
  padding: 0.5rem;
}
label {
  display: block;
  text-align: center;
}
.error {
  color: red;
}

</style>
