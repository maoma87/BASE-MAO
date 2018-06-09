<template>
	<div id="home">

		<vheader v-if="datos" :datos="datos.header"></vheader>

		<vportfolio v-if="datos.portfolio" :datos="datos.portfolio"></vportfolio>
		
		<vabout v-if="datos.about" :datos="datos.about"></vabout>

		<div class="mail-section orange" v-if="datos.about">
			<a class="mail-link" href="#">{{datos.about.email}}</a>
		</div>

		<footer class="red footer" v-if="datos.header">
			<span>{{datos.header.name}} {{new Date().getFullYear()}}</span>
		</footer>

		<vligthboxes v-if="datos.portfolio" :datos="datos.portfolio"></vligthboxes>

	</div>
</template>

<script>

import db           from '../firebase/init'
// import axios     from 'axios'
import vheader      from '../components/Header.vue'
import vportfolio 	from '../components/Portfolio.vue'
import vabout       from '../components/About.vue'
import vligthboxes  from '../components/Ligthboxes.vue'

export default {
	name: 'home',

	components: {
		vheader,
		vportfolio,
		vabout,
		vligthboxes
	},

	data(){
		return{
			datos:{}
		}
	},

	methods:{
		getRealTimeData() {
			let app = this
			let dbObject = {}
			db.collection('web-data').onSnapshot(snapshot => {
				snapshot.forEach(doc => {
					dbObject[doc.id] = doc.data()
				})
				app.datos = dbObject
			})
		}
	},
	
	computed:{
	},

	created(){
		this.getRealTimeData()
	},

	mounted(){
	}

}
</script>

<style>

</style>
