var config  = require('../config');
if(!config.tasks.static) return;

var changed = require('gulp-changed');
var gulp    = require('gulp');
var path    = require('path');
var gulpif 	= require('gulp-if');
var argv 	= require('yargs').argv;

var paths = {
	src: path.join(config.root.src, config.tasks.static.src, '/**'),
	dest: path.join(config.root.prod, config.tasks.static.prod),
	deploy: path.join(config.root.dist, config.tasks.css.dist)
}

var staticTask = function() {
	return gulp.src(paths.src)
		.pipe(gulpif(!argv.deploy, changed(paths.dest)))
		.pipe(gulpif(!argv.deploy, gulp.dest(paths.dest)))
		.pipe(gulpif(argv.deploy, changed(paths.deploy)))
		.pipe(gulpif(argv.deploy, gulp.dest(paths.deploy)))
}

gulp.task('static', staticTask);
module.exports = staticTask;
