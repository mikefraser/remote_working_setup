var config      = require('../config');
if(!config.tasks.svgSprite) return;

var browserSync = require('browser-sync');
var gulp        = require('gulp');
var imagemin    = require('gulp-imagemin');
var svgstore    = require('gulp-svgstore');
var path        = require('path');
var gulpif 		= require('gulp-if');
var argv 		= require('yargs').argv;

var svgSpriteTask = function() {

  var paths = {
    src: path.join(config.root.src, config.tasks.svgSprite.src, '/*.svg'),
    dest: path.join(config.root.prod, config.tasks.svgSprite.prod),
	deploy: path.join(config.root.dist, config.tasks.svgSprite.dist)
  }

  return gulp.src(paths.src)
    .pipe(imagemin())
    .pipe(svgstore())
	// deploy vs production switch
	.pipe(gulpif(!argv.deploy, gulp.dest(paths.dest)))
	.pipe(gulpif(argv.deploy, gulp.dest(paths.deploy)))
    .pipe(browserSync.stream())
}

gulp.task('svgSprite', svgSpriteTask);
module.exports = svgSpriteTask;
