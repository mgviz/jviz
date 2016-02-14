//jvizTrack get the layer
jvizTrack.prototype.Layer = function(id)
{
	//Check the layer id
	if(typeof id === 'undefined')
	{
		//Show warning
		console.warn('jvizTrack: undefined layer num.');

		//Set as 0
		var id = 0;
	}

	//Get the integer value
	id = Math.max(0, parseInt(id));

	//Check the number
	if(this.canvas.num <= id)
	{
		//Show warning
		console.warn('jvizTrack: invalid layer num');

		//Set as 0
		id = 0;
	}

	//Return the layer
	return this.draw.layer[id];
};
