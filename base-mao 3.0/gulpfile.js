var gulp = require('gulp');
var plumber = require('gulp-plumber');
var connect = require('gulp-connect');

var jade = require('gulp-jade');
var prettify = require('gulp-prettify');

var sass = require('gulp-sass');
var uncss = require('gulp-uncss');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");


// TASKS ------------------------------------------------------------------

// gulp-jade + gulp-prettify
gulp.task('jade', function() {
	var YOUR_LOCALS = {};

	 gulp.src('source/*.jade')
		.pipe(plumber())
	    .pipe(jade({
			locals: YOUR_LOCALS
	    }))
		.pipe(prettify({indent_size: 4}))
	    .pipe(gulp.dest('public'))
});
// FIN gulp-jade + gulp-prettify


// gulp-sass + gulp-uncss + gulp-autoprefixer + gulp-cssnano
gulp.task('sass', function () {
	gulp.src('source/css/*.+(scss|sass)')
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(uncss({
        	html: ['public/*.html']
        }))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(cssnano())
		.pipe(gulp.dest('public/css'));
});
// FIN gulp-sass + gulp-uncss + gulp-autoprefixer + gulp-cssnano


// gulp-concat
gulp.task('concat', function() {
	return gulp.src(['source/_includes/js/_jquery-2.2.0.min.js', 'source/_includes/js/*.js'])
		.pipe(plumber())
		.pipe(concat('scripts.js'))
		.pipe(uglify())
	    .pipe(gulp.dest('public/js/'));
});
// FIN gulp-concat


// gulp-uglify + gulp-rename
gulp.task('compress', function() {
	return gulp.src('source/js/functions.js')
		.pipe(plumber())
		.pipe(uglify())
		/*.pipe(rename({
	      extname: '.min.js'
		}))*/
	    .pipe(gulp.dest('public/js'));
});
// FIN gulp-uglify + gulp-rename


// gulp-connect
gulp.task('connect', function() {
	connect.server({
		root: 'public',
		livereload: true
	});
});

gulp.task('html', function () {
	gulp.src('public/*.html')
		.pipe(connect.reload());
});
// FIN gulp-connect

// WATCH
gulp.task('watch', function() {
	// VIGILA LOS ARCHIVOS JADE DENTRO DE _includes/jade para compilar a html
	gulp.watch('source/_includes/jade/**/*.jade', ['jade']);
	// VIGILA LOS ARCHIVOS JADE DENTRO DE root para compilar a html
	gulp.watch('source/*.jade', ['jade']);

	// VIGILA LOS ARCHIVOS SASS DENTRO DE _includes/sass para compilar main.sass
	gulp.watch('source/_includes/sass/**/*.+(scss|sass)', ['sass']);
	// VIGILA LOS ARCHIVOS SASS DENTRO DE css para compilar main.sass
	gulp.watch('source/css/*.+(scss|sass)', ['sass']);

	// Vigila los cambios en los archivos .js de los includes
	gulp.watch('source/js/functions.js', ['compress']);
	// Vigila los cambios en los archivos .js de los includes
	//gulp.watch('_includes/js/*.js', ['concat']);

	// VIGILA LOS ARCHIVOS HTML DENTRO DE root para live-sync
	gulp.watch(['public/*.html'], ['html']);
	// VIGILA LOS ARCHIVOS CSS DENTRO DE CSS/ para live-sync
	gulp.watch(['public/css/main.css'], ['html']);
});
// FIN WATCH

// DEFAULT
gulp.task('default', ['connect', 'watch']);
// FIN DEFAULT
