<template>
  <div class="combatarea">
    <div class="monster">
      <div class="personal-info">
        <div class="buff">

        </div>
        <div class="name">
          {{ monster.name }}
        </div>
        <div class="debuffs">
          <div class="debuff" v-for="debuff in monsterDebuff" :key="debuff.name">
            <img :src="getDebuffImage(debuff.name)" />
            <div class="caption">
              {{debuff.value}}
            </div>
          </div>
        </div>
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
            :color="monsterAtbFrozen ? '#9bf6ff': '#ffc857'"
            :current="monsterAtb.current"
            :max="monsterAtb.total"
            :transition="100"
            v-if="scanLevel >=2"
          />
        </div>
        <transition mode="out-in" name="attacklabel">
        <div class="attack" :key="attackKey" v-if="scanLevel >= 2">
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
        <img :src="require('@/assets/talents/defender.png')" style="width: 75px; height: 75px;" v-if="$store.getters.characterIsDefending"/>
      </div>
      <div class="healthbar">
        <resource-bar
          height="1rem"
          color="red"
          :current="$store.getters.getCurrentHp"
          :max="$store.getters.getMaxHp"
        />
        <affinity-bar v-if="character.class === 'ZOOLOGIST'"
          height="0.7rem"
          :current="$store.getters.getCurrentMana"
          :max="$store.getters.getMaxMana"
        />
        <resource-bar v-else
          height="0.7rem"
          :color="resourceColor"
          :current="$store.getters.getCurrentMana"
          :max="$store.getters.getMaxMana"
        />
        <resource-bar
          height="0.7rem"
          color="#ffc857"
          :current="playerAtb.current"
          :max="playerAtb.total"
          :transition="100"
        />
      </div>
      <div class="personal-info">
        <div class="companions">
          <div v-for="(active, companion) in character.activeCompanions" :key="companion">
            <img :src="require('@/assets/companions/' + companion +'.jpg')" v-if="active" />
          </div>
        </div>
        <div class="name">
          {{ $store.getters.getName }}
        </div>
        <div class="debuffs">
          <div class="debuff" v-for="debuff in playerDebuff" :key="debuff.name">
            <img :src="getDebuffImage(debuff.name)" />
            <div class="caption">
              {{debuff.value}}
            </div>
          </div>
        </div>
      </div>
      <button-area @action="handleAction($event)" :canAttack="canAttack" />
    </div>
  </div>
</template>
<script>
import resourceBar from '../ui/ResourceBar'
import affinityBar from '../ui/AffinityBar'
import buttonArea from './ButtonArea'
import constants from '../../constants'
export default {
  data () {
    return {
      timeout: null,
      n: 0,
      monsterAtb: this.$store.getters.getMonsterAtb,
      scanLevel: this.$store.getters.getTalents.EXPLORER.SCAN,
      resourceColor: constants.classes[this.$store.getters.getClass].resourceColor
    }
  },
  methods: {
    handleAction (action) {
      this.playerAtb.current = 0
      this.$store.dispatch('eventActionDone')
      if (action === 'DEF') {
        this.$store.dispatch('defenseAction')
      } else if (action === 'FUGA') {
        if (!this.monster.isBoss) {
          if (Math.random() * 100 < constants.application.runAwayProbability) {
            this.$store.dispatch('endCombat')
          }
        }
      } else {
        this.$store.dispatch('playerAction', action)
      }
      this.$store.commit('SET_ATB_EVENT_MAX_FIRED', false)
    },
    getDebuffImage (name) {
      return require('@/assets/debuff/' + constants.debuff[name].icon)
    }
  },
  components: {
    resourceBar,
    buttonArea,
    affinityBar
  },
  computed: {
    playerAtb () {
      return this.$store.getters.getPlayerAtb
    },
    canAttack () {
      return this.playerAtb.current >= this.playerAtb.total
    },
    attackKey () {
      return this.$store.getters.getAttackKey
    },
    nextAttack () {
      return constants.monsterattacks[this.$store.getters.getNextAttack]
    },
    monster () {
      return this.$store.getters.getMonster
    },
    character () {
      return this.$store.getters.getCharacter
    },
    playerDebuff () {
      return this.$store.getters.getActivePlayerDebuff
    },
    monsterDebuff () {
      return this.$store.getters.getActiveMonsterDebuff
    },
    currentPlayerAtb () {
      return this.$store.getters.getAtbs.player.current
    },
    monsterAtbFrozen () {
      return this.$store.getters.getAtbs.monster.frozen
    }
  },
  watch: {
    currentPlayerAtb () {
      if (this.currentPlayerAtb >= this.playerAtb.total) {
        this.$store.commit('SET_DEFENDING', false)
        this.$store.dispatch('eventMaxAtb')
      }
    }
  },
  created () {
    const monsterAtb = this.monsterAtb
    const playerAtb = this.playerAtb
    const store = this.$store
    this.$store.commit('END_PAUSE')
    this.timeout = setInterval(() => {
      const tick = constants.application.atb.tick
      if (playerAtb.current < playerAtb.total) {
        playerAtb.current += tick
      }
      if (playerAtb.current > playerAtb.total) {
        playerAtb.current = playerAtb.total
      }

      if (monsterAtb.current < monsterAtb.total && !this.monsterAtbFrozen) {
        monsterAtb.current += tick
      }

      if (monsterAtb.current >= monsterAtb.total) {
        store.dispatch('monsterAttack')
      }
    }, constants.application.atb.tick)
  },
  destroyed () {
    this.$store.commit('START_PAUSE')
    clearInterval(this.timeout)
    this.timeout = null
    this.$store.dispatch('setAtb', {
      player: this.playerAtb.current,
      monster: this.monsterAtb.current
    })
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
.personal-info {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
}
.personal-info > div {
  width: 33%;
}
.debuffs {
  display: flex;
  justify-content: flex-end;
}
.debuff {
  display: flex;
  border: 1px solid black;
  border-radius: 4px
}
.debuff .caption {
  position: absolute;
  font-size: 1.2rem;
}
.debuff img {
  width: 50px;
  height: 50px;
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
.companions img {
  width: 50px;
  height: 50px;
  margin: 0.1rem;
  border: 1px solid #ccc;
}
.companions {
  display: flex;
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
