<template>
	<div>
		<div class="char">
			<div class="arrow">
				<button @click="$emit('changeChar',-1)">Precedente</button>
			</div>
			<div>
				<img :src="require('@/assets/characters/'+index+'.png')">
			</div>
			<div class="arrow">
				<button @click="$emit('changeChar',1)"> Successivo </button>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props : ['index'],
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
	align-items: center;fas
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
