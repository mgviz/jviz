//jvizTrack resize
jvizTrack.prototype.Resize = function()
{
	//Save the width
	this.width = $('#' + this.id).width();

	//Save the height
	//this.height = $('#' + this.id).height();

	//Check the canvas
	if(this.canvas.show === true)
	{
		//Get all the canvas elements
		for(var i = 0; i < this.canvas.num; i++)
		{
			//Save the up canvas width
			this.draw.layer[i].Width(this.width);

			//Save the up canvas height
			this.draw.layer[i].Height(this.height);
		}
	}

	//Set the track height
	$('#' + this.id).height(this.height);
};
