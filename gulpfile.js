var gulp				= require('gulp'),
	plumber				= require('gulp-plumber'),
	browserSync			= require('browser-sync').create(),
	notify				= require('gulp-notify'),
	jade				= require('gulp-jade'),
	changed				= require('gulp-changed'),
	prettify			= require('gulp-prettify'),
	sass				= require('gulp-sass'),
	sourcemaps			= require('gulp-sourcemaps'),
	stripCssComments	= require('gulp-strip-css-comments'),
	autoprefixer		= require('gulp-autoprefixer'),
	uncss				= require('gulp-uncss'),
	csso				= require('gulp-csso'),
	cssnano				= require('gulp-cssnano'),
	cssbeautify			= require('gulp-cssbeautify'),
	concat				= require('gulp-concat'),
	uglify				= require('gulp-uglify'),
	typescript			= require('gulp-typescript'),
	imagemin			= require('gulp-imagemin'),
	upmodul				= require("gulp-update-modul");


// VARIABLES
var carpeta = {
	fuente: "source",
	public: "public"
};


// TASKS ------------------------------------------------------------------

// COMPILAR JADE
gulp.task('jade', function() {
	var YOUR_LOCALS = {};

	gulp.src([carpeta.fuente + '/**/*.jade', '!' + carpeta.fuente + '/_includes/jade/*.jade'])
		// PREVIENE QUE LOS PROCESOS GULP.WATCH SE DETENGA AL ENCONTRAR UN ERROR
		.pipe(plumber())

		//SE ENCARGA DE QUE SOLO COMPILE EL ARCHIVO QUE CAMBIO
		.pipe(changed(carpeta.public, {extension: '.html'}))

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

// COMPILAR JADE DE INCLUDES
gulp.task('jade-includes', function() {
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
gulp.task('sass-neat', function () {
	gulp.src(carpeta.fuente + '/css/*.+(scss|sass)')
		// PREVIENE QUE LOS PROCESOS GULP.WATCH SE DETENGA AL ENCONTRAR UN ERROR
		.pipe(plumber())

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
		.pipe(cssbeautify({
			indent: '	',
			autosemicolon: true
		}))

		// GUARDA EL ARCHIVO CSS
		.pipe(gulp.dest(carpeta.public + '/css'))

});


// COMPILAR SASS
gulp.task('sass-final', function () {
	gulp.src(carpeta.fuente + '/css/*.+(scss|sass)')
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
		.pipe(gulp.dest(carpeta.public + '/css'));
});


// COMPRIME EL ARCHIVO DE FUNCIONES PRINCIPAL
gulp.task('compress', function() {
	return gulp.src(carpeta.fuente + '/js/**/*.js')
		// PREVIENE QUE LOS PROCESOS GULP.WATCH SE DETENGA AL ENCONTRAR UN ERROR
		.pipe(plumber())


		.pipe(changed(carpeta.public + '/js', {extension: '.js'}))

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
		.pipe( notify("PLUG-INS .JS CONCATENADOS: <%= file.relative %>"))

		// REFRESCADO DEL NAVEGADOR
		.pipe(browserSync.stream());
});

// PROCESAMIENTO DE TYPESCRIPT

var tsProject = typescript.createProject('tsconfig.json', { sortOutput: true });

gulp.task('compileTypescript', function(){
	return gulp.src(carpeta.fuente + '/**/*.ts')

		// PREVIENE QUE LOS PROCESOS GULP.WATCH SE DETENGA AL ENCONTRAR UN ERROR
		.pipe(plumber())

		// TOMA LA INFORMACION PARA GENERAR EL MAPA DEL CSS
		.pipe(sourcemaps.init())

		// PROCESAMIENTO DE TYPESCRIPT
		.pipe(typescript(tsProject))

		// GENERA EL MAPA DEL CSS
		.pipe(sourcemaps.write('.'))

		// GUARDA EL ARCHIVO .JS
		.pipe(gulp.dest(carpeta.public))

		// NOTIFICA QUE EL ARCHIVO SE CONCATENO
		.pipe( notify("TYPESCRIPT .TS PROCESADOS: <%= file.relative %>"))

		// REFRESCADO DEL NAVEGADOR
		.pipe(browserSync.stream());
});


// COMPRESION DE IMAGENES
gulp.task('img', () => {
	return gulp.src('source/img/**/*')
		.pipe(imagemin({
			progressive: true
		}))
		.pipe(gulp.dest('public/img'));
});


// MONTAJE DEL SERVIDOR
gulp.task('servidor', function() {
	browserSync.init({
		server: carpeta.public, // Carpeta del servidor
		open: false,
		notify: false
	});
});


// ACTUALIZACION DE GULP MODULES
gulp.task('update', function () {
	gulp.src('package.json')
	// PREVIENE QUE LOS PROCESOS GULP.WATCH SE DETENGA AL ENCONTRAR UN ERROR
	.pipe(plumber())

	.pipe(upmodul('latest, true')); //update all modules latest version.
});


// WATCH
gulp.task('watch', function() {

	// VIGILA LAS VERSIONES DE LOS MODULOS DE GULP
	gulp.start('update');

	// VIGILA LOS ARCHIVOS JADE DENTRO DE _includes/jade para compilar a html
	gulp.watch(carpeta.fuente + '/_includes/jade/**/*.jade', ['jade-includes']);
	// VIGILA LOS ARCHIVOS JADE DENTRO DE root para compilar a html
	gulp.watch(carpeta.fuente + '/**/*.jade', ['jade']);

	// VIGILA LOS ARCHIVOS SASS DENTRO DE _includes/sass para compilar main.sass
	gulp.watch(carpeta.fuente + '/_includes/sass/**/*.+(scss|sass)', ['sass']);
	// VIGILA LOS ARCHIVOS SASS DENTRO DE css para compilar main.sass
	gulp.watch(carpeta.fuente + '/css/*.+(scss|sass)', ['sass']);

	// Vigila los cambios en los archivos .js de la carpeta js
	gulp.watch(carpeta.fuente + '/js/**/*.js', ['compress']);
	// Vigila los cambios en los archivos .js de los includes
	gulp.watch(carpeta.fuente + '/_includes/js/*.js', ['concat']);
	// Vigila los cambios en los archivos .ts
	gulp.watch(carpeta.fuente + '/**/*.ts', ['compileTypescript']);
});

// DEFAULT
gulp.task('default', ['servidor', 'watch']);
