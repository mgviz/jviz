//Import dependencies
var path = require('path');

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

	//Source path
	var src = path.join(opt.base, './');

	//Input folder for javascript files
	var srcJS = [ src 'srcipts/' + name + '.js', src + 'srcipts/' + '**/*.js' ];

	//Input folder for test files
	var srcTest = [ src + 'test/' + name + '.html' ];

	//Input folder for scss files
	var srcScss = [ src + 'scss/' + name + '.scss' ];

	//Concat all js files
	taskConcat(gulp, srcJS, dest, name + '.js');

	//Rename the test file
	taskRename(gulp, srcTest, dest, 'index.html');

	//Build the scss files
	taskScss(gulp, srcScss, dest);
};
