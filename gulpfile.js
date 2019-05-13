const	gulp							= require('gulp'),
	plumber						= require('gulp-plumber'),
	browserSync				= require('browser-sync').create(),
	pug								= require('gulp-pug'),
	inlineCss 				= require('gulp-inline-css'),
	changed						= require('gulp-changed'),
	prettify					= require('gulp-prettify'),
	sass							= require('gulp-sass'),
	sourcemaps				= require('gulp-sourcemaps'),
	stripCssComments	= require('gulp-strip-css-comments'),
	autoprefixer			= require('gulp-autoprefixer'),
	csso							= require('gulp-csso'),
	cssnano						= require('gulp-cssnano'),
	cachebust					= require('gulp-cache-bust'),
	concat						= require('gulp-concat'),
	babel							= require('gulp-babel'),
	uglify						= require('gulp-uglify'),
	webpack 					= require('webpack-stream')

const src = './source', // -> Desarrollo
	pub = './public' // -> Producción

// VARIABLES
const carpeta = {
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
		file	: src + '/app/app.js',
		src		: src + '/app/**/*.js',
		inc		: src + '/app/**/*.vue',
		pub		: pub + '/js'
	},
	json: {
		src		: src + '/json/*.json',
		pub		: pub + '/json'
	}
}

const webpackConfig = require('./webpack.config.js')

// TASKS ------------------------------------------------------------------

// COMPILAR VUE WEBPACK
gulp.task('vue', done => {
	gulp.src(carpeta.vue.file)
		.pipe(plumber())

		.pipe(webpack(webpackConfig))
		
		.pipe(gulp.dest(carpeta.vue.pub))

		// REFRESCADO DEL NAVEGADOR
		.pipe(browserSync.stream())

	done()
})

// COMPILAR VUE PRODUCTION MODE
gulp.task('vueFinal', done => {
	webpackConfig.mode = "production"
	gulp.src(carpeta.vue.file)
		.pipe(webpack(webpackConfig))

		.pipe(gulp.dest(carpeta.vue.pub))
	done()
})

// COMPILAR PUG
gulp.task('pug', done => {
	let YOUR_LOCALS = {}

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

		// REFRESCADO DEL NAVEGADOR
		.pipe(browserSync.stream())

	done()
})

// COMPILAR PUG DE INCLUDES
gulp.task('pugIncludes', done => {
	let YOUR_LOCALS = {}

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
	done()
})

// COMPILAR PUG EN LINEA
gulp.task('pugFinal', done => {
	let YOUR_LOCALS = {}

	gulp.src(carpeta.pug.src)
		// PREVIENE QUE LOS PROCESOS GULP.WATCH SE DETENGA AL ENCONTRAR UN ERROR
		.pipe(plumber())

		// COMPLIA PUG
		.pipe(pug({
			locals: YOUR_LOCALS
		}))

		// GUARDA EL ARCHIVO HTML
		.pipe(gulp.dest(carpeta.pug.pub))
	done()
})

// CACHE BUST
gulp.task('cacheBust', done => {

	gulp.src(carpeta.pug.pub + '**/*.html')
		// PREVIENE QUE LOS PROCESOS GULP.WATCH SE DETENGA AL ENCONTRAR UN ERROR
		.pipe(plumber())

		.pipe(cachebust({
			type: 'timestamp'
		}))

		.pipe(gulp.dest(carpeta.pug.pub))
	done()
})



// COMPILAR PUG CON LOS ESTILOS EN LINEA
gulp.task('cssInline', done => {
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
	done()
})

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

		// REFRESCADO DEL NAVEGADOR
		.pipe(browserSync.stream())

	done()
})

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
		
		// GUARDA EL ARCHIVO CSS
		.pipe(gulp.dest(carpeta.css.pub))

	done()
})


// COMPRIME EL ARCHIVO DE FUNCIONES PRINCIPAL
gulp.task('compress', done => {
	gulp.src(carpeta.js.src)

		// PREVIENE QUE LOS PROCESOS GULP.WATCH SE DETENGA AL ENCONTRAR UN ERROR
		.pipe(plumber())

		.pipe(changed(carpeta.js.pub, {extension: '.js'}))

		.pipe(babel({
			presets: ['@babel/preset-env']
		}))

		// COMPRIME EL JAVASCRIPT
		.pipe(uglify())

		// GENERA EL MAPA DEL JS
		.pipe(sourcemaps.write('.'))

		// GUARDA EL ARCHIVO
		.pipe(gulp.dest(carpeta.js.pub))

		// REFRESCADO DEL NAVEGADOR
		.pipe(browserSync.stream())

	done()
})

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

	done()
})

// COPIA DE ARCHIVO JSON
gulp.task('json', done => {
	gulp.src(carpeta.json.src)
		
		.pipe(gulp.dest(carpeta.json.pub))

	done()
})


// MONTAJE DEL SERVIDOR
gulp.task('servidor', done => {
	browserSync.init({
		server: pub, // Carpeta del servidor
		// reloadDelay: 2000,
		open: false,
		notify: false
	})

	done()
})


// WATCH
gulp.task('watch', done => {

	// VIGILA LOS ARCHIVOS PUG DENTRO DE _includes/pug para compilar a html
	gulp.watch(carpeta.pug.inc , gulp.series('pugIncludes'))
	// VIGILA LOS ARCHIVOS PUG DENTRO DE root para compilar a html
	gulp.watch(carpeta.pug.src , gulp.series('pug'))

	// VIGILA LOS ARCHIVOS SASS DENTRO DE _includes/sass para compilar main.sass
	gulp.watch(carpeta.css.inc , gulp.series('sass'))
	// VIGILA LOS ARCHIVOS SASS DENTRO DE css para compilar main.sass
	gulp.watch(carpeta.css.src , gulp.series('sass'))

	// Vigila los cambios en los archivos .js de la carpeta js
	gulp.watch(carpeta.js.src , gulp.series('compress'))
	// Vigila los cambios en los archivos .js de los includes
	// gulp.watch(carpeta.js.inc , gulp.series('concat'));

	// VIGILA LOS ARCHIVOS .VUE DENTRO DE app
	gulp.watch(carpeta.vue.inc , gulp.series('vue'))
	// VIGILA LOS ARCHIVOS JS DENTRO DE app
	gulp.watch(carpeta.vue.src, gulp.series('vue'))

	// VIGILA LOS ARCHIVOS JSON
	gulp.watch(carpeta.json.src, gulp.series('json'))

	done()
})

gulp.task('first', gulp.parallel('pug', 'sass', 'json', 'compress', 'vue'))

// DEFAULT
gulp.task('default', gulp.parallel('servidor', 'watch'))
