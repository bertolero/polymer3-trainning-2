const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const reload = browserSync.reload;
const imagemin = require('gulp-imagemin');
const spawn = require('child_process').spawn;
const del = require('del');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('../tsconfig.electron.json');

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
gulp.task('clean:public', function() {
	return del('../public', { force: true });
});

gulp.task('clean:dist', function() {
	return del('../dist', { force: true });
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

// Watch app files
gulp.task('watch:app-files', function(done) {
		gulp.watch('../assets/js/components/**/*', gulp.parallel('webpack:dev'));
		gulp.watch('../assets/scss/**/*', gulp.parallel('copy:styles'));
		gulp.watch('../assets/img/**/*', gulp.parallel('copy:imagemin'));
		gulp.watch('../assets/view/manifest.json', gulp.parallel('copy:manifest'));
		done();
	}
);

// Use Webpack to compile latest Javascript to ES5
// Webpack on Development Mode
gulp.task('webpack:dev', done => webpackHandler('development', done));
// Webpack on Production Mode
gulp.task('webpack:prod', done => webpackHandler('production', done));

// This is your Default Gulp task
gulp.task('build:app-dev',
	gulp.series(
		'clean:public',
		gulp.parallel('webpack:dev', 'copy:styles', 'copy:imagemin', 'copy:manifest')
	)
);

// This is the production build for your app
gulp.task('build:app-prod',
	gulp.series(
		'clean:public',
		gulp.parallel('webpack:prod', 'copy:styles', 'copy:imagemin', 'copy:manifest'))
);

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

gulp.task('default',
	gulp.series(
		'build:app-dev',
		'browser-sync',
		'watch:app-files',
		function runningReload(done) {
			gulp.watch(['../public/**/*', '../public/*']).on('change', reload);
			done();
		})
);

/*
Electron build related tasks
*/

gulp.task('build:electron-ts', function() {
	return tsProject
		.src()
		.pipe(tsProject())
		.js
		.pipe(gulp.dest('../public'));
});

gulp.task('electron:reload', function(done) {
	const spawnedProcess = spawn(/^win/.test(process.platform) ? 'nodemon.cmd' : 'nodemon',
		['--watch', '../public', '--exec', 'electron', '../public/app-electron.js'],
		{ stdio: 'inherit' });
	spawnedProcess.on('close', code => {
		if (code && code > 0) {
			done(new Error(`Error running nodemon. Code: ${code}`));
		}
		done();
	});
});

gulp.task('electron:builder', function(done) {
	const spawnedProcess = spawn(/^win/.test(process.platform) ? 'electron-builder.cmd' : 'electron-builder',
		['-w', '--projectDir', '../', '--config', 'config/electron-builder.json'],
		{ stdio: 'inherit' });
	spawnedProcess.on('close', code => {
		if (code && code > 0) {
			done(new Error(`Error running electron-builder. Code: ${code}`));
		}
		done();
	});
});

gulp.task(
	'electron:default',
	gulp.series(
		'build:app-dev',
		'build:electron-ts',
		'watch:app-files',
		function runningWatchElectron(done) {
			gulp.watch('../assets/js/electron/**/*', gulp.parallel('build:electron-ts'));
			done();
		},
		'electron:reload')
);

gulp.task(
	'electron:prod',
	gulp.series('clean:dist', 'build:app-prod', 'build:electron-ts', 'electron:builder')
);
