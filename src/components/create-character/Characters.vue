<template>
	<div>
		<div class="char">
			<div class="arrow">
				<button @click="$emit('changeChar',-1)">Precedente</button>
			</div>
			<div>
				<img :src="require('@/assets/characters/'+Math.abs(index%total)+'.png')">
			</div>
			<div class="arrow">
				<button @click="$emit('changeChar',1)"> Successivo </button>
			</div>
		</div>
	</div>
</template>
<script>
	import constants from '../../constants';
	export default {
		props : ['index'],
		data() {
			return {
				total: constants.totalCharacters,
			};
		},
	};
</script>

<style scoped>
.char {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
.arrow {
	display: flex;
	justify-content: center;
	align-items: center;
}
img {
	height: 300px;
	width: 300px;
}
.arrow button {
	padding: 1rem;
	background-color: #ccc;
	border: none;
	box-shadow: 1px 1px 2px black;
	height: auto;
}
button:hover {
	box-shadow: inset 1px 1px 2px black;
}
</style>
