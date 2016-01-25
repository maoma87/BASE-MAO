var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var uncss = require('gulp-uncss');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");


// TASKS
gulp.task('jade', function() {
  var YOUR_LOCALS = {};

  gulp.src('*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('/'))
});

gulp.task('sass', function () {
	gulp.src('css/*.+(scss|sass)')
		.pipe(sass().on('error', sass.logError))
		.pipe(uncss({
        	html: ['*.html']
        }))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(cssnano())
		.pipe(gulp.dest('css'));
});

gulp.task('concat', function() {
	return gulp.src(['_includes/js/_jquery-2.2.0.min.js', '_includes/js/*.js'])
	.pipe(concat('scripts.js'))
    .pipe(gulp.dest('js/'));
});

gulp.task('compress', function() {
	return gulp.src('js/functions.js')
	.pipe(uglify())
	.pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('js'));
});


gulp.task('default', function() {
	// VIGILA LOS ARCHIVOS JADE DENTRO DE _includes/jade para compilar a html
	gulp.watch('_includes/jade/**/*.jade', ['jade']);
	// VIGILA LOS ARCHIVOS JADE DENTRO DE root para compilar a html
	gulp.watch('*.jade', ['jade']);

	// VIGILA LOS ARCHIVOS SASS DENTRO DE _includes/sass para compilar main.sass
	gulp.watch('_includes/sass/**/*.+(scss|sass)', ['sass']);
	// VIGILA LOS ARCHIVOS SASS DENTRO DE css para compilar main.sass
	gulp.watch('css/*.+(scss|sass)', ['sass']);

	// Vigila los cambios en los archivos .js de los includes
	gulp.watch('js/functions.js', ['concat']);
	// Vigila los cambios en los archivos .js de los includes
	//gulp.watch('_includes/js/*.js', ['concat']);
});
