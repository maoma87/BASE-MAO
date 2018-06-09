<template lang="pug">
	#js-graphics.section.green.about
		.titulo
			h2 about me
		.about__graphics-cont
			.image-cont
				.image-frame
					img(:src='datos.picture', alt='')
			.graphics.bar-inipos
				.bar-container.bar-orange
					span web
					.bar-underline
						.bar-inside
				.bar-container.bar-green
					span brand
					.bar-underline
						.bar-inside
				.bar-container.bar-red
					span print
					.bar-underline
						.bar-inside
		.about__text-cont
			p {{datos.bio}}
		.about__keywords
			span(v-for='(keyword,index) in datos.keywords', :key="'keyword-'+index") {{keyword}}
</template>



<script>
export default {
	name: "vabout",
	props:['datos'],
	data(){
		return{

		}
	},
	mounted(){
		// eslint-disable-next-line
		var $graphics = $('#js-graphics');
		var $graphics_container = $graphics.find('.graphics');
		var graficsIniPos = "bar-inipos";

		// eslint-disable-next-line
		$(window).scroll(function() {
			// eslint-disable-next-line
			var scroll_top = $(window).scrollTop() + ($(window).height() / 2);
			var gContPos = $graphics.offset().top;

			if(scroll_top >= gContPos){
				$graphics_container.removeClass(graficsIniPos);
			}
		});
	}
}
</script>

<style lang="sass">

</style>
