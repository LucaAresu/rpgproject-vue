<template>
  <div class="options">
    <button class="logout" @click="$store.dispatch('logout')">Logout</button>
  </div>
</template>
<style scoped>
.options {
  width: 100%;
  margin-top: 1rem;
}
button {
  border: none;
  width: 100%;
  margin: 1rem auto;
  padding: 0.5rem
}
.logout {
  background-color: #ce4257;
}
.logout:hover {
  background-color: #f25c54;
}
@media (min-width: 800px) {
  .options {
    width: 50%;
    margin: 1rem auto;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px #cccccc;
    padding: 1rem;
  }
}
</style>
