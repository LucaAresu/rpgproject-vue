<template>
  <div class="combatarea">
    <div class="monster">
        <div class="name">
          {{ monster.name }}
        </div>
        <div class="healthbar">
          <resource-bar
            height="1rem"
            color="red"
            :current="monster.currentHp"
            :max="monster.maxHp"
          />
          <resource-bar
            height="0.5rem"
            color="#ffc857"
            :current="monsterAtb.current"
            :max="monsterAtb.total"
          />
        </div>
        <transition mode="out-in" name="attacklabel">
        <div class="attack" :key="attackKey">
          [{{nextAttack.label}}]
        </div>
        </transition>
        <div class="icon">
          <img :src="require('@/assets/monsters/' + monster.icon)" />
        </div>
    </div>

    <div class="character">
      <div class="icon">
        <img :src="require('@/assets/characters/' + $store.getters.getAvatar + '.png')" />
      </div>
      <div class="healthbar">
        <resource-bar
          height="1rem"
          color="red"
          :current="$store.getters.getCurrentHp"
          :max="$store.getters.getMaxHp"
        />
        <resource-bar
          height="0.5rem"
          color="#ffc857"
          :current="playerAtb.current"
          :max="playerAtb.total"
        />
      </div>
      <div class="name">
        {{ $store.getters.getName }}
      </div>
      <button-area />
    </div>
  </div>
</template>
<script>
import resourceBar from '../ui/ResourceBar'
import buttonArea from './ButtonArea'
import constants from '../../constants'
export default {
  data () {
    return {
      timeout: null,
      n: 0
    }
  },
  components: {
    resourceBar,
    buttonArea
  },
  computed: {
    attackKey () {
      return this.$store.getters.getAttackKey
    },
    nextAttack () {
      return constants.monsterattacks[this.$store.getters.getNextAttack]
    },
    monster () {
      return this.$store.getters.getMonster
    },
    playerAtb () {
      return this.$store.getters.getPlayerAtb
    },
    monsterAtb () {
      return this.$store.getters.getMonsterAtb
    }
  },
  created () {
    const store = this.$store
    this.timeout = setInterval(() => store.dispatch('advanceAtb'), constants.application.atb.tick)
  },
  destroyed () {
    clearInterval(this.timeout)
    this.timeout = null
  }
}
</script>
<style scoped>
.combatarea {
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px #ccc;
  padding: 0;
  width: 100%;
}
.monster {
  margin: 0.5rem 0;
}
.healthbar {
  width: 100%;
}
.attack {
  text-align: center;
  font-size: 2rem;
}
.name {
  text-align: center;
  font-size: 1.5rem;
  margin: 0.5rem;
}
.icon {
  display: flex;
  justify-content: center;
}
.monster .icon img {
  width: 120px;
}
.character .icon img {
  width: 120px;
}

@media(min-width: 1200px) {
  .combatarea {
    width: 50%;
    padding: 1rem;
  }
}

.attacklabel-leave-active {
  animation: attackleave 200ms ease-out forwards
}
@keyframes attackleave {
  from {
    transform: translateX(0)
  }
  to {
    transform: translateX(1000px)
  }
}
.attacklabel-enter-active {
  animation: attackenter 200ms ease-out forwards
}
@keyframes attackenter {
  from {
    transform: scale(0)
  }
  to {
    transform: scale(1)
  }
}
</style>
