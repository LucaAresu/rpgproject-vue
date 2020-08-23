<template>
  <div class="choose-class">
    <div class="buttons">
      <button :disabled="selectedClass === 'WARRIOR'" @click="$emit('class-chosen','WARRIOR')">Guerriero</button>
      <button :disabled="selectedClass === 'MAGE'" @click="$emit('class-chosen','MAGE')">Mago</button>
      <button :disabled="selectedClass === 'ZOOLOGIST'" @click="$emit('class-chosen','ZOOLOGIST')">Zoologo</button>
    </div>
    <div class="class-info">
      <transition name="slide" mode="out-in">
        <ul v-if="selectedClass === 'WARRIOR'" key="WARRIOR">
          <li>Risorsa: Rage</li>
          <ul>
            <li>Risorsa che si rigenera nel tempo e usando abilità</li>
            <li>Costo abilità alto ma generazione alta</li>
          </ul>
          <li>Specializzazioni</li>
          <ul>
            <li>Assassino</li>
            <li>Morditore</li>
            <li>Tank</li>
          </ul>
          <li>La difesa ha una riduzione danni maggiore (50% vs 25%)</li>
          <li>Un punto primario delle specializzazioni sono le cure ricevute in base ai danni fatti</li>
        </ul>

        <ul v-if="selectedClass === 'MAGE'" key="MAGE">
          <li>Risorsa: Mana</li>
          <ul>
            <li>Risorsa che non si rigenera, ma può essere assorbita dai mostri</li>
            <li>Costo abilità basso e generazione nulla</li>
          </ul>
          <li>Specializzazioni</li>
          <ul>
            <li>Tossicologo</li>
            <li>Petatore</li>
            <li>Mago-guerriero</li>
          </ul>
          <li>La difesa non fa ripartire la barra ATB da 0</li>
        </ul>

        <ul v-if="selectedClass === 'ZOOLOGIST'" key="ZOOLOGIST">
          <li>Risorsa: Affinità</li>
          <ul>
            <li>Risorsa con due estremità, le magie generano affinità agli attacchi fisici e viceversa</li>
            <li>Nessun costo di abilità, tutto genera</li>
          </ul>
          <li>Specializzazioni</li>
          <ul>
            <li>Re della giungla</li>
            <li>Serpentologo</li>
            <li>Domatore della Savana</li>
          </ul>
          <li>Ogni specializzazione ha un animale diverso, con effetti diversi</li>
          <li>Quando la barra ATB è piena l'animale attacca</li>
        </ul>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  props: ['selectedClass']
}
</script>
<style scoped>
.choose-class {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}
ul {
  padding: 0 1rem;
}
</style>
