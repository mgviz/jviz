//Import dependencies
var gulp = require('gulp');

//Import jviz tasks
var Args = require('./tasks/args.js');
var jvizModules = require('./tasks/jviz-modules.js');

//Get the arguments
var args = Args();

//Build jviz modules
gulp.task('build', function(){

	//Get the tool
	var tool = (typeof args.tool === 'undefined') ? 'jviz' : args.tool;

	//Build the jviz module
	jvizModules(gulp, tool, { base: './' });

});

//Default task
gulp.task('default', ['build']);
