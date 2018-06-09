<template lang="pug">

	#home
		vheader(v-if='datos', :datos='datos.header')

		vportfolio(v-if='datos.portfolio', :datos='datos.portfolio')

		vabout(v-if='datos.about', :datos='datos.about')

		.mail-section.orange(v-if='datos.about')
			a.mail-link(href='#') {{datos.about.email}}

		footer.red.footer(v-if='datos.header')
			span {{datos.header.name}} {{new Date().getFullYear()}}

		vligthboxes(v-if='datos.portfolio', :datos='datos.portfolio')

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

<style lang="sass">

</style>