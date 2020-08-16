<template>
  <div class="shop">
    <div class="shop-view">
      <div class="title">NEGOZIO</div>
      <div class="buy">
        <div class="shop-titles">
          <div class="nome">NOME</div>
          <div class="rimanenti">RIMANENTI</div>
          <div class="costo">COSTO</div>
          <div class="vuoto"></div>
        </div>
        <div class="article" v-for="(item, index) in shop" :key="index">
        <div class="article-content">
          <div class="item-name" >
            {{item.label}}
          </div>
          <div class="remaining">
              {{item.quantity}}
          </div>
            <div class="costo">
            {{item.cost}}
            </div>
            <div class="button">
            <button @click="buy(index)" :disabled="item.cost > money || !item.quantity"> COMPRA </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button @click="$store.dispatch('closeShop')">VATTENE</button>
  </div>
</template>
<script>
export default {
  computed: {
    money () {
      return this.$store.getters.getMoney
    },
    shop () {
      return this.$store.getters.getShop
    }
  },
  methods: {
    buy (item) {
      this.$store.dispatch('buyItem', item)
    }
  },
  created () {
    if (!this.shop) {
      this.$store.dispatch('openShop')
    }
  }
}
</script>
<style scoped>
 @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Lobster&family=Shadows+Into+Light&display=swap');
  .shop {
  width: 100%;
}
.title {
  padding: 1rem;
  width: 100%;
  border: 1px solid black;
  text-align: center;
  background-color: #bee3db;
  font-size: 2rem;
  font-family: 'Lobster', cursive;

}
.shop-titles {
  display: flex;
  justify-content: space-between;
  text-align: center;
  padding: 1rem;
}
.shop-titles > div {
  width: 25%;
  text-align: center;
  font-family: 'Shadows Into Light', cursive;
  font-size: 1.5rem;
}
button {
  width: 100%;
}
.article {
  width: 100%;
}
.article-content {
  display: flex;
  justify-content: space-between;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px #ccc;
  margin-bottom: 1rem;
  width: 100%;
}
.article-content > div {
  text-align: center;
  width: 25%;
}
.buy-info {
  display: flex;
}
.button button {
  height: 100%;
}
.item-name {
  align-self: center;
}
.remaining {
  align-self: center;
}
.costo {
  align-self: center;
  margin-right: 1rem;
}
@media(min-width: 800px) {
  .shop {
    width: 50%;
  }
}
</style>
