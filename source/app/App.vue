<template>
  <div id="app">

	<vheader v-if="datos.header" :datos="datos.header"></vheader>

	<vportfolio v-if="datos.portfolio" :datos="datos.portfolio"></vportfolio>
	<vabout></vabout>

	<div class="mail-section orange">
		<a class="mail-link" href="#">info@mauriciodesigner.com</a>
	</div>

	<footer class="red footer">
		<span>Mauricio Santaella 2016</span>
	</footer>

	<vligthboxes v-if="datos.portfolio" :datos="datos.portfolio"></vligthboxes>

  </div>
</template>

<script>

import axios from 'axios'

import vheader 		from './components/Header.vue'
import vportfolio 	from './components/Portfolio.vue'
import vabout 		from './components/About.vue'
import vligthboxes 	from './components/Ligthboxes.vue'



export default {
  name: 'app',

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
    getData: function() {
		var app = this
		axios.get('./data.json')
			.then(function (response) {
				app.datos = response.data
			})
			.catch(function (error) {
				// console.log("getData error"),
				console.log(error)
			});
		}
  },

  created: function(){
	this.getData()
  },

  // mounted: function(){
  // }

}
</script>

<style>

</style>
