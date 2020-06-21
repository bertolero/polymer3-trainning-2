const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const reload = browserSync.reload;
const imagemin = require('gulp-imagemin');
let spawn = require('child_process').spawn;
let del = require('del');

// helper function
const webpackHandler = (env, done) => {
	const spawnedProcess = spawn(/^win/.test(process.platform) ? 'webpack.cmd' : 'webpack',
		['--mode', env, `--env.NODE_ENV=${env}`, '--config', 'webpack.config.js', '--context', '../'],
		{ stdio: 'inherit' });

	spawnedProcess.on('close', code => {
		if (code && code > 0) {
			done(new Error(`Error running webpack. Code: ${code}`));
		}
		done();
	});
};

// Delete /public Files
gulp.task('clean:dist', function() {
	return del('../public', { force: true });
});

// copy manifest file
gulp.task('copy:manifest', function() {
	return gulp.src('../assets/view/manifest.json').pipe(gulp.dest('../public/'));
});

// copy electron
gulp.task('copy:electron', function() {
	return gulp.src('../assets/js/electron/**/*').pipe(gulp.dest('../public/'));
});

// Compiles SCSS To CSS and copy to dest folder
gulp.task('copy:styles', function() {
	return gulp.src('../assets/scss/**/*.scss')
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(autoprefixer({ overrideBrowserslist: ['last 2 versions'] }))
		.pipe(gulp.dest('../public/css'))
		.pipe(browserSync.stream());
});

// Minimise and copy images
gulp.task('copy:imagemin', function() {
	return gulp.src('../assets/img/**/*')
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.mozjpeg({ progressive: true }),
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo({
				plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
			})
		]))
		.pipe(gulp.dest('../public/img'));
});

// Use Webpack to compile latest Javascript to ES5
// Webpack on Development Mode
gulp.task('webpack:dev', done => webpackHandler('development', done));
// Webpack on Production Mode
gulp.task('webpack:prod', done => webpackHandler('production', done));

// Browser-sync to get live reload and sync with mobile devices
gulp.task('browser-sync', function(done) {
	browserSync.init({
		server: '../public',
		notify: false,
		open: false, //change this to true if you want the browser to open automatically
		injectChanges: false
	});
	done();
});

// This is your Default Gulp task
gulp.task('build:dev',
	gulp.series(
		'clean:dist',
		gulp.parallel('webpack:dev', 'copy:styles', 'copy:imagemin', 'copy:manifest')
	)
);

gulp.task('default',
	gulp.series(
		'build:dev',
		'browser-sync',
		function runningWatch(done) {
			gulp.watch('../assets/js/components/**/*', gulp.parallel('webpack:dev'));
			gulp.watch('../assets/scss/**/*', gulp.parallel('copy:styles'));
			gulp.watch('../assets/img/**/*', gulp.parallel('copy:imagemin'));
			gulp.watch('../assets/view/manifest.json', gulp.parallel('copy:manifest'));
			gulp.watch(['../public/**/*', '../public/*']).on('change', reload);
			done();
		})
);

// This is the production build for your app
gulp.task('build:prod',
	gulp.series(
		'clean:dist',
		gulp.parallel('webpack:prod', 'copy:styles', 'copy:imagemin', 'copy:manifest'))
);

// electron build
gulp.task('electron:watch', function runElectronWatch(done) {
	console.log('electron:watch');
	const spawnedProcess = spawn(/^win/.test(process.platform) ? 'nodemon.cmd' : 'nodemon', ['--watch', 'public', '--exec', 'electron', '../public/electron-app.js'], { stdio: 'inherit' });
	spawnedProcess.on('close', code => {
		if (code && code > 0) {
			done(new Error(`Error running nodemon. Code: ${code}`));
		}
		done();
	});
});

gulp.task(
	'default:electron',
	gulp.series('build:dev', 'copy:electron', function runningWatch(done) {
		gulp.watch('../assets/js/components/**/*', gulp.parallel('webpack:dev'));
		gulp.watch('../assets/scss/**/*', gulp.parallel('copy:styles'));
		gulp.watch('../assets/img/**/*', gulp.parallel('copy:imagemin'));
		gulp.watch('../assets/js/electron/**/*', gulp.parallel('copy:electron'));
		gulp.watch('../assets/view/manifest.json', gulp.parallel('copy:manifest'));
		done();
	}, 'electron:watch')
);
