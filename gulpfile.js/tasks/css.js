var config       = require('../config');
if(!config.tasks.css) return;

var gulp         	= require('gulp');
var browserSync  	= require('browser-sync');
var sass         	= require('gulp-sass');
var sourcemaps   	= require('gulp-sourcemaps');
var handleErrors 	= require('../lib/handleErrors');
var autoprefixer 	= require('gulp-autoprefixer');
var path         	= require('path');
var cssnano 		= require('gulp-cssnano');
var gulpif 			= require('gulp-if');
var argv 			= require('yargs').argv;

var paths = {
  src: path.join(config.root.src, config.tasks.css.src, '/**/*.{' + config.tasks.css.extensions + '}'),
  dest: path.join(config.root.prod, config.tasks.css.prod),
  deploy: path.join(config.root.dist, config.tasks.css.dist)
}

var cssTask = function () {
  return gulp.src(paths.src)
    .pipe(sourcemaps.init())
    .pipe(sass(config.tasks.css.sass))
    .on('error', handleErrors)
    .pipe(autoprefixer(config.tasks.css.autoprefixer))
    .pipe(sourcemaps.write())
	// deploy vs production switch
	.pipe(gulpif(!argv.deploy, gulp.dest(paths.dest)))
	.pipe(gulpif(argv.deploy, cssnano()))
	.pipe(gulpif(argv.deploy, gulp.dest(paths.deploy)))
    .pipe(browserSync.stream())
}

gulp.task('css', cssTask);
module.exports = cssTask;
