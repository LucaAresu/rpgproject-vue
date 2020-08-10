<template>
  <div id="nav">
    <ul>
      <router-link :to="{name: 'Home' }" v-if="logged" tag="li" active-class="active" exact key="home"><a>Home</a></router-link>
      <router-link :to="{name: 'Stats'}" v-if="characterCreated" tag="li" active-class="active" key="about"><a :style="{color}">Stats</a></router-link>
      <router-link :to="{name: 'Login' }" v-if="! logged" tag="li" active-class="active" key="login"><a>Login</a></router-link>
      <router-link :to="{name: 'Register'}" v-if="! logged" tag="li" active-class="active" key="register"><a>Register</a></router-link>
      <router-link :to="{name: 'Options'}" v-if="logged" tag="li" active-class="active" key="options"><a>Options</a></router-link>
    </ul>
  </div>
</template>
<script>
export default {
  computed: {
    logged () {
      return this.$store.getters.getLogged
    },
    characterCreated () {
      return this.$store.getters.isCharacterCreated
    },
    color () {
      return this.$store.getters.getStatsToAllocate ? 'red' : 'black'
    }
  }
}
</script>
<style scoped>
a {
    text-decoration: none;
    padding: 1rem;
    color: black;
}
li.active {
    border-bottom: 2px solid #3c6e71;
}
ul {
    list-style: none;
    display: flex;
    justify-content: center;
}
li {
    display: inline-block;
    padding: 1rem;
}
li:hover {
    border-bottom: 2px solid  #3c6e71;
}
.logout {
    cursor: pointer;
    color: red;
}
#nav {
  margin-bottom: 1rem;
}
</style>
