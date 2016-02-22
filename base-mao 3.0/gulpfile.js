var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');

var jade = require('gulp-jade');
var prettify = require('gulp-prettify');

var sass = require('gulp-sass');
var stripCssComments = require('gulp-strip-css-comments');
var uncss = require('gulp-uncss');
var autoprefixer = require('gulp-autoprefixer');
var csscomb = require('gulp-csscomb');
var csso = require('gulp-csso');
var cssnano = require('gulp-cssnano');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


// VARIABLES

var carpeta = {
	fuente: "source",
	public: "public"
};


// TASKS ------------------------------------------------------------------

// COMPILAR JADE
gulp.task('jade', function() {
	var YOUR_LOCALS = {};

	gulp.src(carpeta.fuente + '/*.jade')
		// PREVIENE QUE LOS PROCESOS GULP.WATCH SE DETENGA AL ENCONTRAR UN ERROR
		.pipe(plumber())

		// COMPLIA JADE
		.pipe(jade({
			locals: YOUR_LOCALS
		}))

		// ENBELLECE EL HTML
		.pipe(prettify({indent_size: 4}))

		// GUARDA EL ARCHIVO HTML
		.pipe(gulp.dest(carpeta.public))

		// NOTIFICA QUE EL ARCHIVO .JADE SE COMPILO
		.pipe( notify("JADE COMPILADO: <%= file.relative %>"))

		// REFRESCADO DEL NAVEGADOR
		.pipe(browserSync.stream());
});


// COMPILAR SASS
gulp.task('sass', function () {
	gulp.src(carpeta.fuente + '/css/*.+(scss|sass)')
		// PREVIENE QUE LOS PROCESOS GULP.WATCH SE DETENGA AL ENCONTRAR UN ERROR
		.pipe(plumber())

		// TOMA LA INFORMACION PARA GENERAR EL MAPA DEL CSS
		.pipe(sourcemaps.init())

		// COMPILA SASS
		.pipe(sass().on('error', sass.logError))

		// GENERA EL MAPA DEL CSS
		.pipe(sourcemaps.write('.'))

		// GUARDA EL ARCHIVO CSS
		.pipe(gulp.dest(carpeta.public + '/css'))

		// GENERA NOTIFICACION AL COMPILAR EL SASS
		.pipe( notify("SASS COMPILADO: <%= file.relative %>"))

		// REFRESCADO DEL NAVEGADOR
		.pipe(browserSync.stream());
});

// COMPILAR SASS
gulp.task('sass-final', function () {
	gulp.src(carpeta.fuente + '/css/*.+(scss|sass)')
		// COMPILA SASS
		.pipe(sass().on('error', sass.logError))

		// AGREGA LACOMPATIBILIDAD CON TODOS LOS NAVEGADORES
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))

		// OPTIMIZACION DEL CSS
		.pipe(csso())

		// MINIFICAR EL CSS
		.pipe(cssnano())

		// QUITA LOS COMENTARIOS DEL CSS
		.pipe(stripCssComments({
			preserve: false
		}))

		// GUARDA EL ARCHIVO CSS
		.pipe(gulp.dest(carpeta.public + '/css'));
});


// COMPRIME EL ARCHIVO DE FUNCIONES PRINCIPAL
gulp.task('compress', function() {
	return gulp.src(carpeta.fuente + '/js/functions.js')
		// PREVIENE QUE LOS PROCESOS GULP.WATCH SE DETENGA AL ENCONTRAR UN ERROR
		.pipe(plumber())

		// COMPRIME EL JAVASCRIPT
		.pipe(uglify())

		// GUARDA EL ARCHIVO
		.pipe(gulp.dest(carpeta.public + '/js'))

		// NOTIFICA QUE EL ARCHIVO SE COMPRIMIO
		.pipe( notify("FUNCIONES .JS COMPRIMIDO: <%= file.relative %>"))

		// REFRESCADO DEL NAVEGADOR
		.pipe(browserSync.stream());
});


// CONCATENA Y COMPRIME LOS ARCHIVOS JS EN LA CARPETA JS DE INCLUDES
gulp.task('concat', function() {
	return gulp.src([carpeta.fuente + '/_includes/js/_jquery-2.2.0.min.js', carpeta.fuente + '/_includes/js/*.js'])
		// PREVIENE QUE LOS PROCESOS GULP.WATCH SE DETENGA AL ENCONTRAR UN ERROR
		.pipe(plumber())

		// CONCATENA TODOS LOS ARCHIVOS JS DE LA CARPETA INCLUDES/JS Y NOMBRA EL NUEVO ARCHIVO
		.pipe(concat('scripts.js'))

		// COMPRIME EL JAVASCRIPT
		.pipe(uglify())

		// GUARDA EL ARCHIVO SCRIPTS.JS
		.pipe(gulp.dest(carpeta.public + '/js/'))

		// NOTIFICA QUE EL ARCHIVO SE CONCATENO
		.pipe( notify("PLUG-INS .JS COMPRIMIDOS: <%= file.relative %>"))

		// REFRESCADO DEL NAVEGADOR
		.pipe(browserSync.stream());
});


// MONTAJE DEL SERVIDOR
gulp.task('servidor', function() {
	browserSync.init({
		server: carpeta.public, // Carpeta del servidor
		open: false,
		notify: false
	});
});


// WATCH
gulp.task('watch', function() {
	// VIGILA LOS ARCHIVOS JADE DENTRO DE _includes/jade para compilar a html
	gulp.watch(carpeta.fuente + '/_includes/jade/**/*.jade', ['jade']);
	// VIGILA LOS ARCHIVOS JADE DENTRO DE root para compilar a html
	gulp.watch(carpeta.fuente + '/*.jade', ['jade']);

	// VIGILA LOS ARCHIVOS SASS DENTRO DE _includes/sass para compilar main.sass
	gulp.watch(carpeta.fuente + '/_includes/sass/**/*.+(scss|sass)', ['sass']);
	// VIGILA LOS ARCHIVOS SASS DENTRO DE css para compilar main.sass
	gulp.watch(carpeta.fuente + '/css/*.+(scss|sass)', ['sass']);

	// Vigila los cambios en los archivos .js de los includes
	gulp.watch(carpeta.fuente + '/js/functions.js', ['compress']);
	// Vigila los cambios en los archivos .js de los includes
	gulp.watch(carpeta.fuente + '/_includes/js/*.js', ['concat']);
});

// DEFAULT
gulp.task('default', ['servidor', 'watch']);
