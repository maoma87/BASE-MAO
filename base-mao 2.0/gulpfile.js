var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var concat = require('gulp-concat');



// TASKS
gulp.task('jade', function() {
  var YOUR_LOCALS = {};

  gulp.src('*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest(''))
});

gulp.task('sass', function () {
	gulp.src('css/*.+(scss|sass)')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('css'));
});

gulp.task('concat', function() {
	return gulp.src(['_includes/js/_jquery-2.2.0.min.js', '_includes/js/*.js'])
	.pipe(concat('scripts.js'))
    .pipe(gulp.dest('js/'));
});


gulp.task('watch', function() {
	//VIGILA LOS ARCHIVOS JADE DENTRO DE _includes/jade para compilar a html
	gulp.watch('_includes/jade/**/*.jade', ['jade']);
	//VIGILA LOS ARCHIVOS JADE DENTRO DE root para compilar a html
	gulp.watch('*.jade', ['jade']);

	//VIGILA LOS ARCHIVOS SASS DENTRO DE _includes/sass para compilar main.sass
	gulp.watch('_includes/sass/**/*.+(scss|sass)', ['sass']);	


	// Vigila los cambios en los archivos .js de los includes
	//gulp.watch('_includes/js/*.js', ['concat']);
});


// EJECUCION

gulp.task('default', ['watch']);
