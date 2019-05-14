<template lang="pug">

#vcomponent
	h1 Hola Mao

</template>

<script>
export default {
	name: "Vcomponent",
	async mounted(){
		// const call = await this.axios.get("https://pokeapi.co/api/v2/pokemon/ditto")
		// console.log(call)
		
		// this.fb.db.collection("people").get()
		// 	.then( querySnapshot => {
		// 		console.log(querySnapshot)
		// 		querySnapshot.forEach( doc => {
		// 			console.log(doc.id,doc.data())
		// 		})
		// 	})
	}
}
</script>

<style lang="sass">

</style>
