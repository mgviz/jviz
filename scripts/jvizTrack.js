//Track main class
function jvizTrack(id, cl, cn)
{
	//id: track ID
	//cl: track class
	//cn: number of canvas layers

	//Track
	this.id = id; //Track ID
	this.class = cl; //Track class
	this.width = 0; //Track width
	this.height = 0; //Track height

	//Track head
	this.head = {};
	this.head.show = true; //Head show
	this.head.id = this.id + '-head'; //Head ID
	this.head.class = this.class + '-head'; //Head class
	this.head.height = 30; //Track head height

	//Track head title
	this.head.title = {};
	this.head.title.show = true; //Show head title
	this.head.title.id = this.head.id + '-title'; //Track title ID
	this.head.title.class = this.head.class + '-title'; //Track title ID

	//Track head subtitle
	this.head.title.subtitle = {};
	this.head.title.subtitle.class = this.head.title.class + '-subtitle'; //Subtitle class

	//Track head arrow
	this.head.arrow = {};
	this.head.arrow.show = true; //Show track arrow
	this.head.arrow.id = this.head.id + '-arrow'; //Track arrow ID
	this.head.arrow.class = this.head.class + '-arrow'; //Track arrow Class

	//Track canvas
	this.canvas = {};
	this.canvas.show = true; //Show the canvas
	this.canvas.id = this.id + '-canvas'; //Canvas ID
	this.canvas.class = this.class + '-canvas'; //Canvas class
	this.canvas.num = cn; //Number of canvas elements

	//Track draw
	this.draw = {};
  this.draw.layer = []; //Draw layers
  this.draw.width = 0; //Draw width
  this.draw.height = 0; //Draw height

	//Return the new track
	return this;
}

//jvizTrack Build
jvizTrack.prototype.Build = function(parent)
{
	//Create the new div
	var div = '';

	//Create the main track div
	div = div + '<div id="' + this.id + '" class="' + this.class + '">';

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

//jvizTrack set track title
jvizTrack.prototype.SetTitle = function(title, subtitle)
{
	//Add the title
	var text = title;

	//Check for the subtitle
	if(typeof subtitle !== 'undefined')
	{
		text = text + ' <span class="' + this.head.title.subtitle.class + '">' + subtitle + '</span>';
	}

	//Show the title
	$('#' + this.head.title.id).html(text);
};

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

//jvizTrack get the layer
jvizTrack.prototype.Layer = function(id)
{
	//Return the layer
	return this.draw.layer[id];
};
