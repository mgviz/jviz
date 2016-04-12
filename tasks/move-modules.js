//Import dependencies
var path = require('path');

//Import tasks
var taskMove = require('./task-move.js');

//Move a module
module.exports = function(gulp, tool, dest)
{
	//Check if tool is an array
	if(Array.isArray(tool) === false){ tool = [ tool ]; }

	//Move all the selected modules
	for(var i = 0; i < tool.length; i++)
	{
		//Source
		var src = './build/' +  tool[i] + '/**/*';

		//Destination
		var desti = path.join(dest, tool[i], './');

		//Move
		taskMove(gulp, src, desti);
	}
};
