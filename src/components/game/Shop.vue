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
        <div class="article" v-for="(item, index) in inventory" :key="index">
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
    <button @click="$store.commit('CLOSE_SHOP')">VAI VIA </button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      inventory: {
        key: {
          label: 'Chiave',
          quantity: Math.round(Math.random() * 5 + 1),
          cost: 500
        },
        talent: {
          label: 'Talento',
          quantity: Math.round(Math.random() * 3),
          cost: 10000
        },
        statPoint: {
          label: 'Punto Stat',
          quantity: Math.round(Math.random() * 10 + 1),
          cost: 2000
        }
      }
    }
  },
  computed: {
    money () {
      return this.$store.getters.getMoney
    }
  },
  methods: {
    buy (item) {
      switch (item) {
        case 'key': this.$store.commit('ADD_KEY', 1); break
        case 'talent': this.$store.commit('ADD_TALENTS_TO_ALLOCATE', 1); break
        case 'statPoint': this.$store.commit('ADD_POINTS_TO_ALLOCATE', 1); break
      }
      this.$store.commit('ADD_MONEY', this.inventory[item].cost * -1)
      this.inventory[item].quantity--
      if (item === 'key') {
        this.inventory[item].cost *= 2
      }
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
