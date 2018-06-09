<template>
	<div class="section green about" id="js-graphics">
		<div class="titulo">
			<h2>about me</h2>
		</div>
		<div class="about__graphics-cont">
			<div class="image-cont">
				<div class="image-frame">
					<img :src="datos.picture" alt="">
				</div>
			</div>
			<div class="graphics bar-inipos">
				<div class="bar-container bar-orange">
					<span>web</span>
					<div class="bar-underline">
						<div class="bar-inside"></div>
					</div>
				</div>
				<div class="bar-container bar-green">
					<span>brand</span>
					<div class="bar-underline">
						<div class="bar-inside"></div>
					</div>
				</div>
				<div class="bar-container bar-red">
					<span>print</span>
					<div class="bar-underline">
						<div class="bar-inside"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="about__text-cont">
			<p>{{datos.bio}}</p>
		</div>
		<div class="about__keywords">
			<span v-for="(keyword,index) in datos.keywords" :key="'keyword-'+index">{{keyword}}</span>
		</div>
	</div>
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

<style>

</style>
