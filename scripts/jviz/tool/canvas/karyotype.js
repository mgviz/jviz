//jvizToolKaryotypeTrack main class
function jvizToolKaryotypeTrack(obj)
{
	//Check the track class
	obj.class = (typeof obj.class !== 'undefined')? obj.class : 'jvizToolCanvasTrack';

	//Check the number of layers
	obj.layers = (typeof obj.layers !== 'undefined')? obj.layers : 1;

	//Extend the jvizToolCanvasTrack
	jvizToolCanvasTrack.call(this, obj);

	//Actual status
	this.status = '';

	//Karyotypes
	this.karyotypes = {};
	this.karyotypes.width = 15; //Karyotypes width
	this.karyotypes.height = 0; //Karyotypes height
	this.karyotypes.list = []; //Karyotypes list
	this.karyotypes.margin = 0; //Margin between the chromosomes
	this.karyotypes.radius = 6; //Karyotypes radius
	this.karyotypes.fill = '#38b1eb'; //Karyotypes fill color
	this.karyotypes.max = 0; //Karyotypes max size
	this.karyotypes.positions = []; //Karyotypes positions

	//Karyotypes stroke
	this.karyotypes.stroke = {};
	this.karyotypes.stroke.width = 1; //Karyotypes stroke width
	this.karyotypes.stroke.color = '#'; //Karyotypes stroke color

	//Karyotypes text
	this.karyotypes.text = {};
	this.karyotypes.text.font = 'Quicksand'; //Karyotypes Text font
	this.karyotypes.text.size = '11px'; //Karyotypes text size
	this.karyotypes.text.color = '#38b1eb'; //Karyotypes text color
	this.karyotypes.text.align = 'center'; //Karyotypes text align
	this.karyotypes.text.margin = 5; //Karyotypes text margin top

	//Regions
	this.regions = {};
	this.regions.list = {}; //Regions list
}

//Inherit the jvizToolTrack methods
jvizToolKaryotypeTrack.prototype = Object.create(jvizToolCanvasTrack.prototype);

//Set the constructor
jvizToolKaryotypeTrack.prototype.constructor = jvizToolKaryotypeTrack;

//jvizToolKaryotypeTrack save karyotypes
jvizToolKaryotypeTrack.prototype.SetKaryotypes = function(kary)
{
	//Save the karyotypes list
	this.karyotypes.list = kary;

	//Reset the karyotypes max size
	this.karyotypes.max = 1;

	//Finc the max size
	for(var i = 0; i < this.karyotypes.list.length; i++)
	{
		//Get the karyotype
		var k = this.karyotypes.list[i];

		//Check
		this.karyotypes.max = (this.karyotypes.max < k.length) ? k.length : this.karyotypes.max;
	}
};

//jvizToolKaryotypeTrack save regions
jvizToolKaryotypeTrack.prototype.SetRegions = function(regions)
{
	//Reset the regions list
	this.regions.list = {};

	//Read all the regions list
	for(var i = 0; i < regions.length; i++)
	{
		//Get the region
		var re = regions[i];

		//Check if chromosome exists
		if(typeof this.regions.list[re.chromosome] === 'undefined')
		{
			//Create the chromosome
			this.regions.list[re.chromosome] = [];
		}

		//Save the region
		this.regions.list[re.chromosome].push({ start: re.start, end: re.end, name: re.name });
	}
};

//jvizToolKaryotypeTrack calculate the margin
jvizToolKaryotypeTrack.prototype.KaryotypesMargin = function()
{
	//Calculate free space
	var free = this.draw.width - this.karyotypes.list.length*this.karyotypes.width;

	//Get the margin
	this.karyotypes.margin = free/(this.karyotypes.list.length + 1);
};

//jvizToolKaryotypeTrack draw karyotypes
jvizToolKaryotypeTrack.prototype.KaryotypesDraw = function(canvas)
{
	//Calculate the margin
	this.KaryotypesMargin();

	//Reset the karyotypes positions
	this.karyotypes.positions = [];

	//Draw all the karyotypes
	for(var i = 0; i < this.karyotypes.list.length; i++)
	{
		//Get the chromosome
		var ch = this.karyotypes.list[i];

		//Get the chromosome width
		var width = this.karyotypes.width;

		//Get the chromosome height
		var height = this.draw.height*(ch.length/this.karyotypes.max);

		//Get the chromosome position x
		var posx = this.draw.margin.left + (i + 1)*this.karyotypes.margin + i*this.karyotypes.width;

		//Get the chromosome position y
		var posy = this.draw.margin.top + this.draw.height - height;

		//Get the chromosome radius
		var radius = this.karyotypes.radius;

		//Draw the chromosome
		canvas.Rect({ x: posx, y: posy, width: width, height: height, radius: radius });

		//Set the chromsome fill color
		canvas.Fill(this.karyotypes.fill);

		//Set the chromosome stroke
		//canvas.Stroke(this.karyotypes.stroke);

		//Save the position
		this.karyotypes.positions.push({ x: posx, y: posy, width: width, height: height });

		//Check for draw the centromere
		if(typeof ch.centromere !== 'undefined')
		{
			//Centromere width
			var cent_width = this.karyotypes.width;

			//Centromere start
			var cent_start = this.draw.height*(ch.centromere[0]/this.karyotypes.max);

			//Centromere end
			var cent_end = this.draw.height*(ch.centromere[1]/this.karyotypes.max);

			//Centromere height
			var cent_height = Math.abs(cent_end - cent_start);

			//Centromere position x
			var cent_x = posx;

			//Centromere position y
			var cent_y = this.draw.margin.top + this.draw.height - cent_start;

			//Clear the centromere region
			canvas.Clear({ x: cent_x, y: cent_y, width: cent_width, height: cent_height });

			//Centromere points
			var cent = [];

			//Add the top point
			cent.push([cent_x, cent_y]);

			//Add the middle point
			cent.push([cent_x + cent_width/2, cent_y + cent_height/2]);

			//Add the end point
			cent.push([cent_x, cent_y + cent_height]);

			//Add the end right
			cent.push([cent_x + cent_width, cent_y + cent_height]);

			//Add the middle right
			cent.push([cent_x + cent_width/2, cent_y + cent_height/2]);

			//Add the top right
			cent.push([cent_x + cent_width, cent_y]);

			//Draw the lines
			canvas.Line(cent);

			//Add the fill color
			canvas.Fill(this.karyotypes.fill);
		}

		//Get the chromosome name
		var text_txt = ch.id;

		//Get the text position x
		var text_x = posx + this.karyotypes.width/2;

		//Get the text position y
		var text_y = this.draw.margin.top + this.draw.height + this.karyotypes.text.margin;

		//Get the text color
		var text_color = this.karyotypes.text.color;

		//Get the text size
		var text_size = this.karyotypes.text.size;

		//Get the text font
		var text_font = this.karyotypes.text.font;

		//Get the text align
		var text_align = this.karyotypes.text.align;

		//Draw the chromosome title
		canvas.Text({ x: text_x, y: text_y, text: text_txt, color: text_color, size: text_size, font: text_font, align: text_align });

		//Get the regions for this chromosome
	}

};

//jvizToolKaryotypeTrack Karyotypes mouse up
jvizToolKaryotypeTrack.prototype.KaryotypesMouseUp = function(x, y)
{
	//Check for click on the margin left
	if(x < this.draw.margin.left + this.karyotypes.margin){ return; }

	//Check for click on the margin right
	if(this.draw.margin.left + this.draw.width - this.karyotypes.margin < x){ return; }

	//Check for click on the margin top
	if(y < this.draw.margin.top){ return; }

	//Check for click on the margin bottom
	if(this.draw.margin.top + this.draw.height < y){ return; }

	//Read all the chromosomes positions
	for(var i = 0; i < this.karyotypes.positions.length; i++)
	{
		//Get the position
		var pos = this.karyotypes.positions[i];

		//Check the left position x
		if(x < pos.x){ return; }

		//Check the right position x
		if(pos.x + pos.width < x){ continue; }

		//Do the karyotype callback
		this.KaryotypesCallback(i, this.karyotypes.list[i]);

		//Exit
		break;
	}
};

//jvizToolKaryotypeTrack do karyotypes callback
jvizToolKaryotypeTrack.prototype.KaryotypesCallback = function(index, chromosome)
{
	//Show in console
	console.log('Do callback for karyotypes on chromosome ' + chromosome.id);
};

//jvizToolKaryotypeTrack draw chromosome in detail
jvizToolKaryotypeTrack.prototype.ChromosomeDraw = function(canvas, chr)
{

};

//jvizToolKaryotypeTrack do chromosome callback
jvizToolKaryotypeTrack.prototype.ChromosomeCallback = function(chromosome, region)
{
	//Show in console
	console.log('Do callback for chromosome on region ' + region);
};

//Initialize the track events
jvizToolKaryotypeTrack.prototype.Events = function()
{
	//Initialize the canvas events
	jvizToolKaryotypeTrackEvents(this);
};

//jvizToolKaryotypeTrack events caller
jvizToolKaryotypeTrack.prototype.EventsDo = function(action, event, x, y)
{
	//Prevent default
	event.preventDefault();

	//Check for no status
	if(this.status === ''){ return; }

	//Check for karyotypes status
	if(this.status === 'karyotypes')
	{
		//Check the action
		if(action === 'up')
		{
			//Call the mouse up action
			this.KaryotypesMouseUp(x, y);
		}

	}
	else
	{
		//Call the other status event
		this.EventsCaller(action, x, y);
	}
};

//jvizToolKaryotypeTrack other status
jvizToolKaryotypeTrack.prototype.EventsCaller = function(action, x, y)
{
	//Show in console
	//console.log('Do EventsCaller for action ' + action);
};

//Function for initilize the karyotypes events
function jvizToolKaryotypeTrackEvents(_this)
{
	//Save the ID
  var _id = '#' + _this.id;

  //Mouse up
  $(_id).mouseup(function(e){ _this.EventsDo('up', e,  e.pageX - $(this).offset().left, e.pageY - $(this).offset().top); });

  //Mouse down
  $(_id).mousedown(function(e){ _this.EventsDo('down', e, e.pageX - $(this).offset().left, e.pageY - $(this).offset().top); });

  //Mouse move
  $(_id).mousemove(function(e){ _this.EventsDo('move', e, e.pageX - $(this).offset().left, e.pageY - $(this).offset().top); });
}
