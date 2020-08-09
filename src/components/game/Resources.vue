<template>
  <div class="resources">
    <div class="money">
        <img :src="require('@/assets/resources/money.png')" />  {{ $store.getters.getMoney }}
    </div>
  </div>
</template>
<script>

</script>
<style scoped>
.resources {
  margin-bottom: 1rem;
}
img {
  width: 25px;
  height: 25px;
}
</style>
