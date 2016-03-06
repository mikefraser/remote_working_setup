var config      = require('../config');
if(!config.tasks.images) return;

var browserSync = require('browser-sync');
var changed     = require('gulp-changed');
var gulp        = require('gulp');
var imagemin    = require('gulp-imagemin');
var path        = require('path');
var gulpif 		= require('gulp-if');
var argv 		= require('yargs').argv;

var paths = {
	src: path.join(config.root.src, config.tasks.images.src, '/**'),
	dest: path.join(config.root.prod, config.tasks.images.prod),
	deploy: path.join(config.root.dist, config.tasks.images.dist)
}

var imagesTask = function() {
	return gulp.src(paths.src)
		.pipe(changed(paths.dest)) // Ignore unchanged files
		.pipe(imagemin()) // Optimize
		// deploy vs production switch
		.pipe(gulpif(!argv.deploy, gulp.dest(paths.dest)))
		.pipe(gulpif(argv.deploy, gulp.dest(paths.deploy)))
		.pipe(browserSync.stream())
}

gulp.task('images', imagesTask);
module.exports = imagesTask;
