<template>
	<div class="section green about" id="js-graphics">
		<div class="titulo">
			<h2>about me</h2>
		</div>
		<div class="about__graphics-cont">
			<div class="image-cont">
				<div class="image-frame">
					<img src="img/me.jpg" alt="">
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
			<p>I am a passionate graphic designer, with more than ten years of experience in the field of advertising, corporate and web design, publishing and teaching. With the use of graphical tools, web, 3d and multimedia. <br> <br> Highlighted by the professionalism, responsibility and initiative with which I have developed each of the projects I have worked on. Always ready to evolve keeping up with the current of new technologies.
			</p>
		</div>
		<div class="about__keywords">
			<span>Adobe Illustrator</span>
			<span>Adobe Photoshop</span>
			<span>Adobe Indesign</span>
			<span>HTML5</span>
			<span>CSS3</span>
			<span>JavaScript</span>
			<span>jQuery</span>
			<span>Vue.js</span>
			<span>SASS</span>
			<span>PUG.JS</span>
			<span>GULP.JS</span>
			<span>GIT</span>
			<span>Adobe ExtendScript</span>
			<span>CorelDRAW</span>
			<span>Adobe Edge</span>
			<span>Adobe Audition</span>
			<span>Adobe After Efects</span>
			<span>3DS Max</span>
			<span>V-ray</span>
			<span>MaxScrpt</span>
		</div>
	</div>
</template>


<script>
export default {
	name: "vabout",
	data(){
		return{

		}
	},
	mounted: function(){
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
