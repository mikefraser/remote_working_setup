var browserSync = require('browser-sync')
var config      = require('../config')
var gulp        = require('gulp')

// Fix this line once you've got this sorted out (temp fix...)
var hostUrl = [
	config.project.domain,
	config.project.folder
	];
var serverUrl = {
	"baseDir": config.root.prod
};
config.tasks.browserSync.host = hostUrl.join('/');
config.tasks.browserSync.server = serverUrl;

var browserSyncTask = function() {
  browserSync.init(config.tasks.browserSync)
}
gulp.task('browserSync', browserSyncTask)
module.exports = browserSyncTask
