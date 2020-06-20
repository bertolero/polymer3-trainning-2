const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const imagemin = require('gulp-imagemin');
let spawn = require('child_process').spawn;
let del = require('del');

// helper function
const webpackHandler = (command, callback) => {
	const test = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', command], { stdio: 'inherit' });
	test.on('close', code => {
		if (code && code > 0) {
			callback(new Error(`Error running webpack. Code: ${code}`));
		}
		callback();
	});
};

// Delete /public Files
gulp.task(
	'clean-dist-folder',
	gulp.series(() => {
		return del([
			'./public'
		]);
	})
);

// copy manifest file
gulp.task('copy-manifest', function() {
	return gulp.src('./assets/view/manifest.json').pipe(gulp.dest('./public/'));
});

// Compiles SCSS To CSS
gulp.task(
	'styles',
	gulp.series(() => {
		return gulp
			.src('assets/scss/**/*.scss')
			.pipe(
				sass({
					outputStyle: 'compressed'
				}).on('error', sass.logError)
			)
			.pipe(
				autoprefixer({
					overrideBrowserslist: ['last 2 versions']
				})
			)
			.pipe(gulp.dest('./public/css'))
			.pipe(browserSync.stream());
	})
);

// Use Webpack to compile latest Javascript to ES5
// Webpack on Development Mode
gulp.task(
	'webpack:dev',
	gulp.series(cb => webpackHandler('dev:webpack', cb))
);
// Webpack on Production Mode
gulp.task(
	'webpack:prod',
	gulp.series(cb => webpackHandler('build:webpack', cb))
);

// Browser-sync to get live reload and sync with mobile devices
gulp.task(
	'browser-sync',
	gulp.series(function() {
		browserSync.init({
			server: './public',
			notify: false,
			open: false, //change this to true if you want the browser to open automatically
			injectChanges: false
		});
	})
);

// Minimise Your Images
gulp.task(
	'imagemin',
	gulp.series(function minimizingImages() {
		return gulp
			.src('assets/img/**/*')
			.pipe(
				imagemin([
					imagemin.gifsicle({ interlaced: true }),
					imagemin.mozjpeg({ progressive: true }),
					imagemin.optipng({ optimizationLevel: 5 }),
					imagemin.svgo({
						plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
					})
				])
			)
			.pipe(gulp.dest('./public/img'));
	})
);

// This is your Default Gulp task
gulp.task(
	'default',
	gulp.series(['clean-dist-folder',
		gulp.parallel([
			gulp.series([
				'webpack:dev',
				'styles',
				'imagemin',
				'copy-manifest',
				function runningWatch() {
					gulp.watch('./assets/scss/**/*', gulp.parallel('styles'));
					gulp.watch('./assets/js/**/*', gulp.parallel('webpack:dev'));
					gulp.watch('./assets/img/**/*', gulp.parallel('imagemin'));
					gulp.watch('./assets/view/manifest.json', gulp.parallel('copy-manifest'));
					gulp.watch(['./public/**/*', './public/*']).on('change', reload);
				}
			]),
			gulp.series(['browser-sync'])
		])
	]));

// This is the production build for your app
gulp.task('build',
	gulp.series(['clean-dist-folder',
		gulp.parallel([
			'styles',
			'webpack:prod',
			'imagemin',
			'copy-manifest'])
	])
);
