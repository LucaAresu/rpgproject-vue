<template>
  <div class="stats-view">
    <router-link :to="{ name: 'Talents' }" tag="button" v-if="$router.currentRoute.name === 'Stats'">Visualizza Talenti</router-link>
    <router-link :to="{ name: 'Stats' }" tag="button" v-else >Visualizza Stats</router-link>
    <transition name="slide" mode="out-in">
      <router-view />
    </transition>

  </div>
</template>
<style scoped>
.stats-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
@media (min-width: 800px) {
  .stats-view {
    width: 80%;
    margin: auto;
  }
}
@media (min-width: 1200px) {
  .stats-view {
    width: 40%;
  }
}
</style>
