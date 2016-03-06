# gulp_remote_working_setup

Heavily based on https://github.com/vigetlabs/gulp-starter (I'd fork it but I'm still learning git...) but modified to strip out the webpack stuff (added the gulp demo js-by-folder-task), updated with cssnano, and modified so you can deploy to alternate location by passing a flag when running (still to test this).

Go into gulpfile.js/config.json for pretty much all setup locations, task options, source / save locations etc.

Run with 'gulp' command, or if you wish to get the minified version run with 'gulp --deploy'.

I'd like to get running with nunjucks templating, and figure out a php workflow so I can combine this with various CMS's (eg wordpress...), but I also need to get some work done!
