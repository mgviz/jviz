//Canvas Track main class
function jvizToolCanvasTrack(obj)
{
	//Check the track class
	obj.class = (typeof obj.class !== 'undefined')? obj.class : 'jvizToolCanvasTrack';

	//Check the number of layers
	obj.layers = (typeof obj.layers !== 'undefined')? obj.layers : 1;

	//Extend the jvizToolTrack
	jvizToolTrack.call(this, obj);

	//Track canvas
	this.canvas = {};
	this.canvas.show = true; //Show the canvas
	this.canvas.id = this.id + '-canvas'; //Canvas ID
	this.canvas.class = this.class + '-canvas'; //Canvas class
	this.canvas.first = this.canvas.class + '-first'; //Canvas first
	this.canvas.num = obj.layers; //Number of canvas elements

	//Track draw
	this.draw = {};
  this.draw.layer = []; //Draw layers
  this.draw.width = 0; //Draw width
  this.draw.height = 0; //Draw height
	this.draw.margin = { top: 40, bottom: 20, right: 50, left: 50 }; //Draw margin
	this.draw.scale = 1; //Draw scale
	this.draw.start = 0; //Draw start position
	this.draw.end = 0; //Draw end position
	this.draw.length = 0; //Draw length

	//Return the new track
	return this;
}

//Inherit the jvizToolTrack methods
jvizToolCanvasTrack.prototype = Object.create(jvizToolTrack.prototype);

//Set the constructor
jvizToolCanvasTrack.prototype.constructor = jvizToolCanvasTrack;

//jvizToolCanvasTrack Build
jvizToolCanvasTrack.prototype.Build = function(parent)
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
			//Get the class
			var cl = this.canvas.class;

			//Check for the first canvas
			if(i == 0){ cl = this.canvas.first; }

			//Create the canvas
			div = div + '<canvas id="' + this.canvas.id + i + '" class="' + cl + '" ';

			//Add the canvas z-index
			div = div + 'style="z-index: ' + i + ';"';

			//Close the canvas
			div = div + '></canvas>';
		}
	}

	//Add the head
	div = div + this.BuildHead();

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

	//Add the events
	this.Events();
};

//jvizToolCanvasTrack get the layer
jvizToolCanvasTrack.prototype.Layer = function(id)
{
	//Check the layer id
	if(typeof id === 'undefined'){ var id = 0; }

	//Get the integer value
	id = Math.max(0, parseInt(id));

	//Check the number
	if(this.canvas.num <= id)
	{
		//Show warning
		console.warn('jvizToolCanvasTrack: invalid layer num');

		//Set as 0
		id = 0;
	}

	//Return the layer
	return this.draw.layer[id];
};

//jvizToolCanvasTrack resize
jvizToolCanvasTrack.prototype.Resize = function()
{
	//Save the width
	this.width = $('#' + this.id).width();

	//Save the height
	//this.height = $('#' + this.id).height();

	//Check the canvas
	if(this.canvas.show === true)
	{
		//Calculate the draw width
		this.draw.width = this.width - this.draw.margin.left - this.draw.margin.right;

		//Calculate the draw height
	  this.draw.height = this.height - this.draw.margin.top - this.draw.margin.bottom;

		//Get all the canvas elements
		for(var i = 0; i < this.canvas.num; i++)
		{
			//Save the up canvas width
			this.draw.layer[i].Width(this.width);

			//Save the up canvas height
			this.draw.layer[i].Height(this.height);
		}
	}
};

//Save or get the scale
jvizToolCanvasTrack.prototype.SetScale = function(s)
{
	//Save the selected scale
	this.draw.scale = s;
};

//Set the position
jvizToolCanvasTrack.prototype.SetPosition = function(start, end)
{
	//Save the start position
	this.draw.start = start;

	//Calculate the end position
	this.draw.end = (typeof end !== 'undefined') ? end : this.draw.start + this.draw.width/this.draw.scale;

	//Calculate the length
	this.draw.length = this.draw.end - this.draw.start;
};

//Set the track height
jvizToolCanvasTrack.prototype.SetHeight = function(h)
{
	//Save the track height
	this.height = h;
};

//jvizToolCanvasTrack Get the canvas ID
jvizToolCanvasTrack.prototype.CanvasID = function(id)
{
	//Return the ID for this canvas layer
	return this.canvas.id + id;
};

//jvizToolCanvasTrack Get the canvas ID for click
jvizToolCanvasTrack.prototype.CanvasClickID = function()
{
	//Return the last canvas layer
	return this.CanvasID(this.canvas.num - 1);
};
