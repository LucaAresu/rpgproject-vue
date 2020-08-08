<template>
<div>
  <div class="loginbox" v-if="! $store.getters.isLoading ">
    Crea un nuovo Account
    <p class="error" v-show="error"> {{ error }} </p>
    <div class="input">
      <label for="email">Email</label>
      <input v-model="email" type="email" @keydown.enter="register" />
    </div>
    <div class="input">
      <label for="password">Password</label>
      <input v-model="password" type="password" @keydown.enter="register" />
    </div>
    <button @click="register">Registrati</button>
  </div>
  <div v-else class="loading" >
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
      password: ''
    }
  },
  methods: {
    register () {
      this.$store.dispatch('register', {
        email: this.email,
        password: this.password
      })
    }
  },
  components: {
    PacmanLoader
  },
  computed: {
    error () {
      return this.$store.getters.getError
    }
  },
  watch: {
    error () {
      setTimeout(() => this.$store.dispatch('clearLoginErrors'), 5000)
    }
  },
  created () {
    this.$store.dispatch('clearLoginErrors')
  }
}
</script>
<style scoped>

.loginbox {
  width: 100%;
  text-align: center;
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
