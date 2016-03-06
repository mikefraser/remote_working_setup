var config       = require('../config');
if(!config.tasks.js) return;

// This task taken from https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-task-steps-per-folder.md

var gulp            = require('gulp');
var sourcemaps   	= require('gulp-sourcemaps');
var browserSync     = require('browser-sync');
var handleErrors    = require('../lib/handleErrors');
var fs 				= require('fs');
var path 			= require('path');
var merge 			= require('merge-stream');
var gulp 			= require('gulp');
var concat 			= require('gulp-concat');
var rename 			= require('gulp-rename');
var uglify 			= require('gulp-uglify');
var jshint 			= require('gulp-jshint');
var gulpif 			= require('gulp-if');
var argv 			= require('yargs').argv;

var paths = {
  src: path.join(config.root.src, config.tasks.js.src),
  dest: path.join(config.root.prod, config.tasks.js.prod),
  deploy: path.join(config.root.dist, config.tasks.js.dist)
}

function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

var jsTask = function() {
   var folders = getFolders(paths.src);

   var tasks = folders.map(function(folder) {
      return gulp.src(path.join(paths.src, folder, '/**/*.js'))
        .pipe(sourcemaps.init())
        // concat into foldername.js
        .pipe(concat(folder + '.js'))

		.pipe(jshint())
		.pipe(jshint.reporter('default'))
        .pipe(sourcemaps.write())

        // .pipe(gulp.dest(paths.dest))
		// deploy vs production switch
		.pipe(gulpif(!argv.deploy, gulp.dest(paths.dest)))
		// .pipe(gulpif(argv.deploy, uglify()))
		.pipe(gulpif(argv.deploy, gulp.dest(paths.deploy)))
        .pipe(browserSync.stream());
   });

   // process all remaining files in paths.src root into main.js
   var root = gulp.src(path.join(paths.src, '/*.js'))
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))

		.pipe(jshint())
		.pipe(jshint.reporter('default'))
        .pipe(sourcemaps.write())
		
		// deploy vs production switch
		.pipe(gulpif(!argv.deploy, gulp.dest(paths.dest)))
		// .pipe(gulpif(argv.deploy, uglify()))
		.pipe(gulpif(argv.deploy, gulp.dest(paths.deploy)))
        .pipe(browserSync.stream());

   return merge(tasks, root);
}


gulp.task('js', jsTask);
module.exports = jsTask;
