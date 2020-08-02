<template>
	<div class="home">
		<Characters v-if="!$store.getters.isCharacterCreated"/>
		<div v-else>
				<h1>pg creato</h1>
		</div>
		<div v-if="$store.getters.getName">
			{{ $store.getters.getCharacter}}
		</div>

	</div>
</template>

<script>
	// @ is an alias to /src
	import Characters from "../components/create-character/CreateCharacters";
	export default {
		name: "Home",
		components: {
			Characters,
		},
	};
</script>
