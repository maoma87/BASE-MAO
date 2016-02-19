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
var cssbeautify = require('gulp-cssbeautify');
var cssnano = require('gulp-cssnano');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


var carpeta = {
	fuente: "source",
	public: "public"
};

// TASKS ------------------------------------------------------------------

// gulp-jade + gulp-prettify
gulp.task('jade', function() {
	var YOUR_LOCALS = {};

	gulp.src(carpeta.fuente + '/*.jade')
		.pipe(plumber())
		.pipe(jade({
			locals: YOUR_LOCALS
		}))
		.pipe(prettify({indent_size: 4}))
		.pipe(gulp.dest(carpeta.public))
		.pipe( notify("JADE COMPILADO: <%= file.relative %>"))
		// REFRESCADO DEL NAVEGADOR
		.pipe(browserSync.stream());
});
// FIN gulp-jade + gulp-prettify


// gulp-sass + gulp-uncss + gulp-autoprefixer + gulp-cssnano
gulp.task('sass', function () {
	gulp.src(carpeta.fuente + '/css/*.+(scss|sass)')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(stripCssComments({
			//preserve: false
		}))
		// .pipe(autoprefixer({
		// 	browsers: ['last 2 versions'],
		// 	cascade: false
		// }))

		.pipe(cssnano())
		.pipe(cssbeautify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(carpeta.public + '/css'))
		.pipe( notify("SASS COMPILADO: <%= file.relative %>"))
		// REFRESCADO DEL NAVEGADOR
		.pipe(browserSync.stream());
});
// FIN gulp-sass + gulp-uncss + gulp-autoprefixer + gulp-cssnano


// gulp-uglify + gulp-rename
gulp.task('compress', function() {
	return gulp.src(carpeta.fuente + '/js/functions.js')
		.pipe(plumber())
		.pipe(uglify())
		/*.pipe(rename({
			extname: '.min.js'
		}))*/
		.pipe(gulp.dest(carpeta.public + '/js'))
		.pipe( notify("FUNCIONES .JS COMPRIMIDO: <%= file.relative %>"))
		// REFRESCADO DEL NAVEGADOR
		.pipe(browserSync.stream());
});
// FIN gulp-uglify + gulp-rename


// gulp-concat
gulp.task('concat', function() {
	return gulp.src([carpeta.fuente + '/_includes/js/_jquery-2.2.0.min.js', carpeta.fuente + '/_includes/js/*.js'])
		.pipe(plumber())
		.pipe(concat('scripts.js'))
		.pipe(uglify())
		.pipe(gulp.dest(carpeta.public + '/js/'))
		.pipe( notify("PLUG-INS .JS COMPRIMIDOS: <%= file.relative %>"))
		// REFRESCADO DEL NAVEGADOR
		.pipe(browserSync.stream());
});
// FIN gulp-concat


// MONTAJE DEL SERVIDOR
gulp.task('servidor', function() {
	browserSync.init({
		server: carpeta.public, // Carpeta del servidor
		open: false,
		notify: false
	});
});
// FIN MONTAJE DEL SERVIDOR


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
// FIN WATCH

// DEFAULT
gulp.task('default', ['servidor', 'watch']);
// FIN DEFAULT
