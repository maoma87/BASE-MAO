var gulp				= require('gulp'),
	plumber				= require('gulp-plumber'),
	browserSync			= require('browser-sync').create(),
	notify				= require('gulp-notify'),
	pug					= require('gulp-pug'),
	inlineCss 			= require('gulp-inline-css'),
	changed				= require('gulp-changed'),
	prettify			= require('gulp-prettify'),
	sass				= require('gulp-sass'),
	sourcemaps			= require('gulp-sourcemaps'),
	stripCssComments	= require('gulp-strip-css-comments'),
	autoprefixer		= require('gulp-autoprefixer'),
	csso				= require('gulp-csso'),
	cssnano				= require('gulp-cssnano'),
	cssbeautify			= require('gulp-cssbeautify'),
	cachebust			= require('gulp-cache-bust'),
	concat				= require('gulp-concat'),
	babel				= require('gulp-babel'),
	uglify				= require('gulp-uglify'),
	imagemin			= require('gulp-imagemin'),
	browserify			= require('gulp-browserify');

var src = './source', // -> Desarrollo
	pub = './public'; // -> Producción

// VARIABLES
var carpeta = {

	pug:{
		src		: src + '/*.pug',
		inc		: src + '/_includes/pug/**/*.pug',
		pub		: pub + '/'
	},

	css: {
		src		: src + '/css/*.{scss,sass}',
		inc		: src + '/_includes/sass/**/*.{scss,sass}',
		pub		: pub + '/css'
	},

	js: {
		src		: src + '/js/*.js',
		inc		: src + '/_includes/js/**/*.js',
		pub		: pub + '/js'
	},

	vue: {
		file	: src + '/app/main.js',
		src		: src + '/app/**/*.js',
		inc		: src + '/app/**/*.vue',
		pub		: pub + '/js/app'
	},

	img: {
		all		: src + '/img/**/*.{jpg,jpeg,png,gif,svg,JPG,JPEG}',
		pub		: pub + '/img'
	}
};


// TASKS ------------------------------------------------------------------

//COMPILAR VUE
gulp.task('vue', done => {
	gulp.src(carpeta.vue.file)
		.pipe(plumber())

		.pipe(browserify({
			transform: ['vueify', 'babelify', 'aliasify'] }))

		// COMPRIME EL JAVASCRIPT
		.pipe(uglify())
		
		.pipe(gulp.dest(carpeta.vue.pub))
		
		// NOTIFICA QUE EL ARCHIVO .JADE SE COMPILO
		.pipe(notify("VUE COMPILADO: <%= file.relative %>"))

		// REFRESCADO DEL NAVEGADOR
		.pipe(browserSync.reload({
			stream: true
		}));
	done()
});

// COMPILAR PUG
gulp.task('pug', done => {
	var YOUR_LOCALS = {};

	gulp.src([carpeta.pug.src , '!' + carpeta.pug.inc])
		// PREVIENE QUE LOS PROCESOS GULP.WATCH SE DETENGA AL ENCONTRAR UN ERROR
		.pipe(plumber())

		//SE ENCARGA DE QUE SOLO COMPILE EL ARCHIVO QUE CAMBIO
		.pipe(changed(carpeta.pug.pub, {extension: '.html'}))

		// COMPLIA PUG
		.pipe(pug({
			locals: YOUR_LOCALS
		}))

		// ENBELLECE EL HTML
		.pipe(prettify({indent_size: 4}))

		// GUARDA EL ARCHIVO HTML
		.pipe(gulp.dest(carpeta.pug.pub))

		// NOTIFICA QUE EL ARCHIVO .JADE SE COMPILO
		.pipe(notify("JADE COMPILADO: <%= file.relative %>"))

		// REFRESCADO DEL NAVEGADOR
		.pipe(browserSync.reload({
			stream: true
		}));

	done()
});

// COMPILAR PUG DE INCLUDES
gulp.task('pugIncludes', done => {
	var YOUR_LOCALS = {};

	gulp.src(carpeta.pug.src)
		// PREVIENE QUE LOS PROCESOS GULP.WATCH SE DETENGA AL ENCONTRAR UN ERROR
		.pipe(plumber())

		// COMPLIA PUG
		.pipe(pug({
			locals: YOUR_LOCALS
		}))

		// ENBELLECE EL HTML
		.pipe(prettify({indent_size: 4}))

		// GUARDA EL ARCHIVO HTML
		.pipe(gulp.dest(carpeta.pug.pub))

		// NOTIFICA QUE EL ARCHIVO .PUG SE COMPILO
		.pipe( notify("PUG COMPILADO: <%= file.relative %>"))

		// REFRESCADO DEL NAVEGADOR
		.pipe(browserSync.reload({
			stream: true
		}));

	done()
});

// COMPILAR PUG EN LINEA
gulp.task('pugFinal', done => {
	var YOUR_LOCALS = {};

	gulp.src(carpeta.pug.src)
		// PREVIENE QUE LOS PROCESOS GULP.WATCH SE DETENGA AL ENCONTRAR UN ERROR
		.pipe(plumber())

		// COMPLIA PUG
		.pipe(pug({
			locals: YOUR_LOCALS
		}))

		// GUARDA EL ARCHIVO HTML
		.pipe(gulp.dest(carpeta.pug.pub))

		// NOTIFICA QUE EL ARCHIVO .PUG SE COMPILO
		.pipe( notify("PUG FINAL COMPILADO: <%= file.relative %>"))

		// REFRESCADO DEL NAVEGADOR
		.pipe(browserSync.reload({
			stream: true
		}));

	done()
});

// CACHE BUST
gulp.task('cacheBust', done => {

	gulp.src(carpeta.pug.pub + '**/*.html')
		// PREVIENE QUE LOS PROCESOS GULP.WATCH SE DETENGA AL ENCONTRAR UN ERROR
		.pipe(plumber())

		.pipe(cachebust({
			type: 'timestamp'
		}))

		.pipe(gulp.dest(carpeta.pug.pub));

	done()
});



// COMPILAR PUG CON LOS ESTILOS EN LINEA
gulp.task('cssInline', done => {
	var YOUR_LOCALS = {};

	gulp.src(carpeta.pug.pub + '/*.html')
		// PREVIENE QUE LOS PROCESOS GULP.WATCH SE DETENGA AL ENCONTRAR UN ERROR
		.pipe(plumber())

		// pone en linea los estilos css
		.pipe(inlineCss({
			applyStyleTags: true,
			applyLinkTags: true,
			removeStyleTags: true,
			removeLinkTags: true
		}))

		// GUARDA EL ARCHIVO HTML
		.pipe(gulp.dest(carpeta.pug.pub))

		// NOTIFICA QUE EL ARCHIVO .PUG SE COMPILO
		.pipe( notify("PUG INLINE COMPILADO: <%= file.relative %>"))

		// REFRESCADO DEL NAVEGADOR
		.pipe(browserSync.reload({
			stream: true
		}));

	done()
});

// COMPILAR SASS
gulp.task('sass', done => {
	gulp.src(carpeta.css.src)
		// PREVIENE QUE LOS PROCESOS GULP.WATCH SE DETENGA AL ENCONTRAR UN ERROR
		.pipe(plumber())

		// TOMA LA INFORMACION PARA GENERAR EL MAPA DEL CSS
		.pipe(sourcemaps.init())

		// COMPILA SASS
		.pipe(sass().on('error', sass.logError))

		// GENERA EL MAPA DEL CSS
		.pipe(sourcemaps.write('.'))

		// GUARDA EL ARCHIVO CSS
		.pipe(gulp.dest(carpeta.css.pub))

		// GENERA NOTIFICACION AL COMPILAR EL SASS
		.pipe( notify("SASS COMPILADO: <%= file.relative %>"))

		// REFRESCADO DEL NAVEGADOR
		.pipe(browserSync.reload({
			stream: true
		}));

	done()
});

// COMPILAR SASS EN LINEA
gulp.task('sassFinal', done => {
	gulp.src(carpeta.css.src)
		// COMPILA SASS
		.pipe(sass().on('error', sass.logError))

		// QUITA LOS COMENTARIOS DEL CSS
		.pipe(stripCssComments({
			preserve: false
		}))

		// AGREGA LACOMPATIBILIDAD CON TODOS LOS NAVEGADORES
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))

		// OPTIMIZACION DEL CSS
		.pipe(csso())

		// MINIFICAR EL CSS
		.pipe(cssnano())

		// ORDENADO DEL CSS
		// .pipe(cssbeautify({
		// 	indent: '	',
		// 	autosemicolon: true
		// }))

		// GUARDA EL ARCHIVO CSS
		.pipe(gulp.dest(carpeta.css.pub));

	done()
});


// COMPRIME EL ARCHIVO DE FUNCIONES PRINCIPAL
gulp.task('compress', done => {
	gulp.src(carpeta.js.src)

		// PREVIENE QUE LOS PROCESOS GULP.WATCH SE DETENGA AL ENCONTRAR UN ERROR
		.pipe(plumber())

		.pipe(changed(carpeta.js.pub, {extension: '.js'}))

		.pipe(babel({
			presets: ['env']
		}))

		// COMPRIME EL JAVASCRIPT
		.pipe(uglify())

		// GENERA EL MAPA DEL JS
		.pipe(sourcemaps.write('.'))

		// GUARDA EL ARCHIVO
		.pipe(gulp.dest(carpeta.js.pub))

		// NOTIFICA QUE EL ARCHIVO SE COMPRIMIO
		.pipe( notify("FUNCIONES .JS COMPRIMIDO: <%= file.relative %>"))

		// REFRESCADO DEL NAVEGADOR
		.pipe(browserSync.reload({
			stream: true
		}));

	done()
});

// CONCATENA Y COMPRIME LOS ARCHIVOS JS EN LA CARPETA JS DE INCLUDES
gulp.task('concat', done => {
	gulp.src([src + '/_includes/js/_jquery-*.js', carpeta.js.inc])
		// PREVIENE QUE LOS PROCESOS GULP.WATCH SE DETENGA AL ENCONTRAR UN ERROR
		.pipe(plumber())

		// CONCATENA TODOS LOS ARCHIVOS JS DE LA CARPETA INCLUDES/JS Y NOMBRA EL NUEVO ARCHIVO
		.pipe(concat('scripts.js'))

		// COMPRIME EL JAVASCRIPT
		.pipe(uglify())

		// GUARDA EL ARCHIVO SCRIPTS.JS
		.pipe(gulp.dest(carpeta.js.pub))

		// NOTIFICA QUE EL ARCHIVO SE CONCATENO
		.pipe( notify("PLUG-INS .JS CONCATENADOS: <%= file.relative %>"))

		// REFRESCADO DEL NAVEGADOR
		.pipe(browserSync.reload({
			stream: true
		}));

	done()
});

// COMPRESION DE IMAGENES
gulp.task('img', done => {
	gulp.src(carpeta.img.src)
		.pipe(imagemin({
			progressive: true
		}))
		.pipe(gulp.dest(carpeta.img.pub));

	done()
});


// MONTAJE DEL SERVIDOR
gulp.task('servidor', done => {
	browserSync.init({
		server: pub, // Carpeta del servidor
		// reloadDelay: 2000,
		open: false,
		notify: false
	});

	done()
});


// WATCH
gulp.task('watch', done => {

	// VIGILA LOS ARCHIVOS PUG DENTRO DE _includes/pug para compilar a html
	gulp.watch(carpeta.pug.inc , gulp.series('pugIncludes'));
	// VIGILA LOS ARCHIVOS PUG DENTRO DE root para compilar a html
	gulp.watch(carpeta.pug.src , gulp.series('pug'));

	// VIGILA LOS ARCHIVOS SASS DENTRO DE _includes/sass para compilar main.sass
	gulp.watch(carpeta.css.inc , gulp.series('sass'));
	// VIGILA LOS ARCHIVOS SASS DENTRO DE css para compilar main.sass
	gulp.watch(carpeta.css.src , gulp.series('sass'));

	// Vigila los cambios en los archivos .js de la carpeta js
	gulp.watch(carpeta.js.src , gulp.series('compress'));
	// Vigila los cambios en los archivos .js de los includes
	// gulp.watch(carpeta.js.inc , gulp.series('concat'));

	// VIGILA LOS ARCHIVOS DE VUE DENTRO DE _includes/app
	gulp.watch(carpeta.vue.inc , gulp.series('vue'));
	// VIGILA LOS ARCHIVOS SASS DENTRO DE css para compilar main.sass
	gulp.watch(carpeta.vue.src , gulp.series('vue'));

	done()
});

// DEFAULT
gulp.task('default', gulp.parallel('servidor','watch'));
