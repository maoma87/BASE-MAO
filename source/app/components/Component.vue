<template lang="pug">

	#vcomponent
		h1 Hola Mao

</template>

<script>
export default {
	name: "vcomponent",
	async mounted(){
		try {
			const data = await this.axios.get("https://pokeapi.co/api/v2/pokemon/ditto")
			console.log(data)
		} catch(error) {
			console.log("error", error)
  	}
	}
}
</script>

<style lang="sass">

</style>
