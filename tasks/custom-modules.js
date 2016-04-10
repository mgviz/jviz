//Import dependencies
var path = require('path');
var fs = require('fs');

//Import tasks
var taskConcat = require('./task-concat.js');
var taskRename = require('./task-rename.js');
var taskScss = require('./task-scss.js');

//Build jviz module
module.exports = function(gulp, name, opt)
{
	//Check for undefined options
	if(typeof opt === 'undefined'){ var opt = {}; }

	//Check for undefined source base
	if(typeof opt.base === 'undefined'){ opt.base = './'; }

	//Check for undefined dest path
	if(typeof opt.dest === 'undefined'){ opt.dest = './build/'; }

	//Destination folder
	var dest = './build/' + name + '/';

	//Source folder
	var src = path.join(opt.base, name, './');

	//Input folder for javascript files
	var srcJS = [ src + 'scripts/' + name + '.js', src + 'scripts/' + '**/*.js' ];

	//Input folder for test files
	var srcTest = [ src + name + '.html' ];

	//Input folder for scss files
	var srcScss = [ src + 'scss/' + name + '.scss' ];

	//Concat all js files
	taskConcat(gulp, srcJS, dest, name + '.js');

	//Rename the test file
	taskRename(gulp, srcTest, dest, 'index.html');

	//Build the scss files
	taskScss(gulp, srcScss, dest);
};
