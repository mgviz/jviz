//jvizTrack Build
jvizTrack.prototype.Build = function(parent)
{
	//Create the new div
	var div = '';

	//Create the main track div
	div = div + '<div id="' + this.id + '" class="' + this.class + '">';

	//Check for show the canvas element
	if(this.canvas.show === true)
	{
		//Get the canvas numbers
		for(var i = 0; i < this.canvas.num; i++)
		{
			//Create the canvas
			div = div + '<canvas id="' + this.canvas.id + i + '" class="' + this.canvas.class + '" ';

			//Add the canvas z-index
			div = div + 'style="z-index: ' + i + ';"';

			//Close the canvas
			div = div + '></canvas>';
		}
	}

	//Check for show the head
	if(this.head.show === true)
	{
		//Create the track head
		div = div + '<div id="' + this.head.id + '" class="' + this.head.class + '">';

		//Check for show the track arrow
		if(this.head.arrow.show === true)
		{
			//Add the arrow
			div = div + '<div id="' + this.head.arrow.id + '" class="' + this.head.arrow.class + '"></div>';
		}

		//Check for show the title
		if(this.head.title.show === true)
		{
			//Add the track title
			div = div + '<span id="' + this.head.title.id + '" class="' + this.head.title.class + '"></span>';
		}

		//Close the head track
		div = div + '</div>';
	}

	//Close the track div
	div = div + '</div>';

	//Create the track
	$('#' + parent).append(div);

	//Check for canvas
	if(this.canvas.show === true)
	{
		//Initialize all the canvas
		for(var i = 0; i < this.canvas.num; i++)
		{
			//Initialize the canvas i
			this.draw.layer.push(new cvjs({ id: this.canvas.id + i, width: this.width, height: this.height }));
		}
	}
};
