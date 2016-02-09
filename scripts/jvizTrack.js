//Track main class
function jvizTrack(id, cl)
{
	//Track
	this.id = id; //Track ID
	this.class = cl; //Track class
	this.width = 0; //Track width
	this.height = 0; //Track height
	this.draw = null; //Track canvas draw

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

		//Check for show the title
		if(this.head.title.show === true)
		{
			//Add the track title
			div = div + '<span id="' + this.head.title.id + '" class="' + this.head.title.class + '"></span>';
		}

		//Check for show the track arrow
		if(this.head.arrow.show === true)
		{
			//Add the arrow
			div = div + '<div id="' + this.head.arrow.id + '" class="' + this.head.arrow.class + '"></div>';
		}

		//Close the head track
		div = div + '</div>';
	}

	//Check for show the canvas element
	if(this.canvas.show === true)
	{
		//Show the canvas element
		div = div + '<canvas id="' + this.canvas.id + '" class="' + this.canvas.class + '"></canvas>';
	}

	//Close the track div
	div = div + '</div>';

	//Create the track
	$('#' + parent).append(div);

	//Check for canvas
	if(this.canvas.show === true)
	{
		//Create the canvas

	}
};

//jvizTrack set track title
jvizTrack.prototype.SetTitle = function(text)
{
	//Show the name
	$('#' + this.head.title.id).text(text);
};

//jvizTrack resize
jvizTrack.prototype.Resize = function(p)
{
	//Check the property
	if(typeof p === 'undefined'){ var p = 'wh'; }

	//Check for save the width
	if(p.indexOf('w') > -1)
	{
		//Save the width
		this.width = $('#' + this.id).width();

		//Set the canvas width
		if(this.canvas.show === true)
		{
			//Save the canvas width
			this.draw.Width(this.width);
		}
	}

	//Check for save the height
	if(p.indexOf('h') > -1)
	{
		//Save the height
		this.height = $('#' + this.id).height();

		//Set the canvas height
		if(this.canvas.show === true)
		{
			//Save the canvas height
			this.draw.Height(this.height);
		}
	}
};
