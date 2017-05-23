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
	uncss				= require('gulp-uncss'),
	csso				= require('gulp-csso'),
	cssnano				= require('gulp-cssnano'),
	cssbeautify			= require('gulp-cssbeautify'),
	cachebust			= require('gulp-cache-bust'),
	concat				= require('gulp-concat'),
	uglify				= require('gulp-uglify'),
	typescript			= require('gulp-typescript'),
	imagemin			= require('gulp-imagemin');


var tsProject = typescript.createProject('tsconfig.json');


var src		= './source', // -> Desarrollo
	pub		= './public'; // -> Producción

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

	ts: {
		src		: src + '/app/**/*.ts',
		inc		: src + '/app/**/*.ts',
		pub		: pub + '/js/app'
	},

	img: {
		all		: src + '/img/**/*.{jpg,jpeg,png,gif,svg,JPG,JPEG}',
		pub		: pub + '/img'
	}
};


// TASKS ------------------------------------------------------------------

// COMPILAR JADE
gulp.task('01-PUG', function() {
	var YOUR_LOCALS = {};

	gulp.src([carpeta.pug.src , '!' + carpeta.pug.inc])
		// PREVIENE QUE LOS PROCESOS GULP.WATCH SE DETENGA AL ENCONTRAR UN ERROR
		.pipe(plumber())

		//SE ENCARGA DE QUE SOLO COMPILE EL ARCHIVO QUE CAMBIO
		.pipe(changed(carpeta.pug.pub, {extension: '.html'}))

		// COMPLIA JADE
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
});

// COMPILAR JADE DE INCLUDES
gulp.task('02-PUG-includes', function() {
	var YOUR_LOCALS = {};

	gulp.src(carpeta.pug.src)
		// PREVIENE QUE LOS PROCESOS GULP.WATCH SE DETENGA AL ENCONTRAR UN ERROR
		.pipe(plumber())

		// COMPLIA JADE
		.pipe(pug({
			locals: YOUR_LOCALS
		}))

		// ENBELLECE EL HTML
		.pipe(prettify({indent_size: 4}))

		// GUARDA EL ARCHIVO HTML
		.pipe(gulp.dest(carpeta.pug.pub))

		// NOTIFICA QUE EL ARCHIVO .JADE SE COMPILO
		.pipe( notify("JADE COMPILADO: <%= file.relative %>"))

		// REFRESCADO DEL NAVEGADOR
		.pipe(browserSync.reload({
			stream: true
		}));
});

// COMPILAR JADE EN LINEA
gulp.task('03-PUG-final', function() {
	var YOUR_LOCALS = {};

	gulp.src(carpeta.pug.src)
		// PREVIENE QUE LOS PROCESOS GULP.WATCH SE DETENGA AL ENCONTRAR UN ERROR
		.pipe(plumber())

		// COMPLIA JADE
		.pipe(pug({
			locals: YOUR_LOCALS
		}))

		// GUARDA EL ARCHIVO HTML
		.pipe(gulp.dest(carpeta.pug.pub))

		// NOTIFICA QUE EL ARCHIVO .JADE SE COMPILO
		.pipe( notify("JADE FINAL COMPILADO: <%= file.relative %>"))

		// REFRESCADO DEL NAVEGADOR
		.pipe(browserSync.reload({
			stream: true
		}));
});

// CACHE BUST
gulp.task('cache-bust',function(){

	gulp.src(carpeta.pug.pub + '**/*.html')
		// PREVIENE QUE LOS PROCESOS GULP.WATCH SE DETENGA AL ENCONTRAR UN ERROR
		.pipe(plumber())

		.pipe(cachebust({
			type: 'timestamp'
		}))

		.pipe(gulp.dest(carpeta.pug.pub));

});



// COMPILAR JADE CON LOS ESTILOS EN LINEA
gulp.task('04-CSS-inline', function() {
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

		// NOTIFICA QUE EL ARCHIVO .JADE SE COMPILO
		.pipe( notify("JADE INLINE COMPILADO: <%= file.relative %>"))

		// REFRESCADO DEL NAVEGADOR
		.pipe(browserSync.reload({
			stream: true
		}));
});


// COMPILAR SASS
gulp.task('05-SASS', function () {
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
});

// COMPILAR SASS EN LINEA
gulp.task('06-SASS-final', function () {
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
});


// COMPRIME EL ARCHIVO DE FUNCIONES PRINCIPAL
gulp.task('compress', function() {
	return gulp.src(carpeta.js.src)

		// PREVIENE QUE LOS PROCESOS GULP.WATCH SE DETENGA AL ENCONTRAR UN ERROR
		.pipe(plumber())

		.pipe(changed(carpeta.js.pub, {extension: '.js'}))

		// COMPRIME EL JAVASCRIPT
		.pipe(uglify())

		// GUARDA EL ARCHIVO
		.pipe(gulp.dest(carpeta.js.pub))

		// NOTIFICA QUE EL ARCHIVO SE COMPRIMIO
		.pipe( notify("FUNCIONES .JS COMPRIMIDO: <%= file.relative %>"))

		// REFRESCADO DEL NAVEGADOR
		.pipe(browserSync.reload({
			stream: true
		}));
});

// CONCATENA Y COMPRIME LOS ARCHIVOS JS EN LA CARPETA JS DE INCLUDES
gulp.task('concat', function() {
	return gulp.src([carpeta.js.inc + '/_jquery-*.js', carpeta.js.inc + '/*.js'])
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
});

// COMPILAR TYPESCRIPT
gulp.task('typescript', function() {
	return gulp.src(carpeta.ts.src)
		// PREVIENE QUE LOS PROCESOS GULP.WATCH SE DETENGA AL ENCONTRAR UN ERROR
		.pipe(plumber())

		// PROCESA EL TYPESCRIPT
		.pipe(tsProject())

		// COMPRIME EL JAVASCRIPT
		.pipe(uglify())

		// GUARDA EL ARCHIVO SCRIPTS.JS
		.pipe(gulp.dest(carpeta.ts.pub))
		//
		// NOTIFICA QUE EL ARCHIVO SE CONCATENO
		.pipe( notify("TYPESCRIPT COMPILADO: <%= file.relative %>"))
		//
		// REFRESCADO DEL NAVEGADOR
		.pipe(browserSync.reload({
			stream: true
		}));
});

// COMPRESION DE IMAGENES
gulp.task('img', () => {
	return gulp.src(carpeta.img.src)
		.pipe(imagemin({
			progressive: true
		}))
		.pipe(gulp.dest(carpeta.img.pub));
});


// MONTAJE DEL SERVIDOR
gulp.task('servidor', function() {
	browserSync.init({
		server: pub, // Carpeta del servidor
		open: false,
		notify: false
	});
});


// WATCH
gulp.task('watch', function() {

	// VIGILA LOS ARCHIVOS JADE DENTRO DE _includes/pug para compilar a html
	gulp.watch(carpeta.pug.inc , ['02-PUG-includes']);
	// VIGILA LOS ARCHIVOS JADE DENTRO DE root para compilar a html
	gulp.watch(carpeta.pug.src , ['01-PUG']);

	// VIGILA LOS ARCHIVOS SASS DENTRO DE _includes/sass para compilar main.sass
	gulp.watch(carpeta.css.inc , ['05-SASS']);
	// VIGILA LOS ARCHIVOS SASS DENTRO DE css para compilar main.sass
	gulp.watch(carpeta.css.src , ['05-SASS']);

	// Vigila los cambios en los archivos .js de la carpeta js
	gulp.watch(carpeta.js.src , ['compress']);
	// Vigila los cambios en los archivos .js de los includes
	// gulp.watch(carpeta.js.inc , ['concat']);
	// Vigila los cambios en los archivos .ts de la carpeta app
	gulp.watch(carpeta.ts.src , ['typescript']);
});

// DEFAULT
gulp.task('00-DEVELOP', ['servidor', 'watch']);
