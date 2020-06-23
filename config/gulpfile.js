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
const webpackHandler = (env, type, done) => {
	const spawnedProcess = spawn(/^win/.test(process.platform) ? 'webpack.cmd' : 'webpack',
		['--mode', env, `--env.NODE_ENV=${env}`, `--env.type=${type}`, '--config', 'webpack.config.js', '--context', '../'],
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

// Watch tasks
// Watch static files
gulp.task('watch:app-static-files', function(done) {
		gulp.watch('../assets/scss/**/*', gulp.parallel('copy:styles'));
		gulp.watch('../assets/img/**/*', gulp.parallel('copy:imagemin'));
		gulp.watch('../assets/view/manifest.json', gulp.parallel('copy:manifest'));
		done();
	}
);

// Watch app web related files only
gulp.task('watch:app-web-files',
	gulp.parallel('watch:app-static-files', function runningAppWebWatch(done) {
		gulp.watch('../assets/js/components/**/*', gulp.parallel('webpack:app-web-dev'));
		done();
	})
);

// Watch app web related files only
gulp.task('watch:app-electron-files',
	gulp.parallel('watch:app-static-files', function runningAppElectronWatch(done) {
		gulp.watch('../assets/js/components/**/*', gulp.parallel('webpack:app-electron-dev'));
		done();
	})
);

// Use Webpack to compile latest Javascript to ES5
// web app
// Webpack on Development Mode
gulp.task('webpack:app-web-dev', done => webpackHandler('development', 'web', done));
// Webpack on Production Mode
gulp.task('webpack:app-web-prod', done => webpackHandler('production', 'web', done));
// electron app
// Webpack on Development Mode
gulp.task('webpack:app-electron-dev', done => webpackHandler('development', 'electron', done));
// Webpack on Production Mode
gulp.task('webpack:app-electron-prod', done => webpackHandler('production', 'electron', done));

// build related tasks
// build app files for web mode in dev
gulp.task('build:app-web-dev',
	gulp.series(
		'clean:public',
		gulp.parallel('webpack:app-web-dev', 'copy:styles', 'copy:imagemin', 'copy:manifest')
	)
);

// build app files for web mode in prod
gulp.task('build:app-web-prod',
	gulp.series(
		'clean:public',
		gulp.parallel('webpack:app-web-prod', 'copy:styles', 'copy:imagemin', 'copy:manifest'))
);

// build app files for electron mode in dev
gulp.task('build:app-electron-dev',
	gulp.series(
		'clean:public',
		gulp.parallel('webpack:app-electron-dev', 'copy:styles', 'copy:imagemin', 'copy:manifest')
	)
);

// build app files for electron mode in prod
gulp.task('build:app-electron-prod',
	gulp.series(
		'clean:public',
		gulp.parallel('webpack:app-electron-prod', 'copy:styles', 'copy:imagemin', 'copy:manifest'))
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

// default web dev run task
gulp.task('default',
	gulp.series(
		'build:app-web-dev',
		'browser-sync',
		'watch:app-web-files',
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
		['--watch', '../public', '--exec', 'electron', '../public/app-electron-main-shell.js'],
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
		'build:app-electron-dev',
		'build:electron-ts',
		'watch:app-electron-files',
		function runningWatchElectron(done) {
			gulp.watch('../assets/js/electron/**/*', gulp.parallel('build:electron-ts'));
			done();
		},
		'electron:reload')
);

gulp.task(
	'electron:prod',
	gulp.series('clean:dist', 'build:app-electron-prod', 'build:electron-ts', 'electron:builder')
);
