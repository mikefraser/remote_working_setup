var config       = require('../config');
if(!config.tasks.html) return;

var browserSync  	= require('browser-sync');
var data         	= require('gulp-data');
var gulp         	= require('gulp');
var gulpif       	= require('gulp-if');
var handleErrors 	= require('../lib/handleErrors');
var htmlmin      	= require('gulp-htmlmin');
var path         	= require('path');
var render       	= require('gulp-nunjucks-render');
var fs           	= require('fs');
var argv 			= require('yargs').argv;

var exclude = path.normalize('!**/{' + config.tasks.html.excludeFolders.join(',') + '}/**');


var paths = {
	src: [path.join(config.root.src, config.tasks.html.src, '/**/*.html'), exclude],
	dest: path.join(config.root.prod, config.tasks.html.prod),
	deploy: path.join(config.root.dist, config.tasks.html.dist)
}

var getData = function(file) {
	var dataPath = path.resolve(config.root.src, config.tasks.html.src, config.tasks.html.dataFile)
	return JSON.parse(fs.readFileSync(dataPath, 'utf8'))
}

// Set relative path to templates
config.tasks.html.settings.path = path.join(config.root.src, config.tasks.html.src);

var htmlTask = function() {
	render.nunjucks.configure([path.join(config.root.src, config.tasks.html.src)], {watch: false })

	return gulp.src(paths.src)
		.pipe(data(getData))
		.on('error', handleErrors)
		.pipe(render( config.tasks.html.settings ))
		.on('error', handleErrors)
		// deploy vs production switch
		.pipe(gulpif(!argv.deploy, gulp.dest(paths.dest)))
		.pipe(gulpif(argv.deploy, htmlmin(config.tasks.html.htmlmin)))
		.pipe(gulpif(argv.deploy, gulp.dest(paths.deploy)))
		.pipe(browserSync.stream())
}

gulp.task('html', htmlTask);
module.exports = htmlTask;
