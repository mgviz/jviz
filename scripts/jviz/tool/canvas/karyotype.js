//jvizToolKaryotypeTrack main class
function jvizToolKaryotypeTrack(obj)
{
	//Check the track class
	obj.class = (typeof obj.class !== 'undefined')? obj.class : 'jvizToolCanvasTrack';

	//Check the number of layers
	obj.layers = (typeof obj.layers !== 'undefined')? obj.layers : 1;

	//Extend the jvizToolCanvasTrack
	jvizToolCanvasTrack.call(this, obj);

	//Karyotypes
	this.karyotypes = {};
	this.karyotypes.width = 20; //Karyotypes width
	this.karyotypes.height = 0; //Karyotypes height
	this.karyotypes.list = []; //Karyotypes list
	this.karyotypes.margin = 0; //Margin between the chromosomes
	this.karyotypes.radius = 6; //Karyotypes radius
	this.karyotypes.fill = '#'; //Karyotypes fill color
	this.karyotypes.stroke = { width: 1, color: '#' }; //Karyotypes stroke

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

//jvizToolKaryotypeTrack draw karyotypes
jvizToolKaryotypeTrack.prototype.DrawKaryotypes = function(canvas)
{
	//Calculate free space
	var free = this.draw.width - this.karyotypes.list.length*this.karyotypes.width;

	//Get the margin
	this.karyotypes.margin = free/(this.karyotypes.list.length + 1);

	//Draw all the karyotypes
	for(var i = 0; i < this.karyotypes.list.length; i++)
	{
		//Get the chromosome
		var ch = this.karyotypes.list[i];

		//Get the chromosome position x
		var posx = this.draw.margin.left + (i + 1)*this.karyotypes.margin + i*this.karyotypes.width;

		//Get the chromosome position y
		var posy = this.draw.margin.top;

		//Get the chromosome width
		var width = this.karyotypes.width;

		//Get the chromosome height
		var height = this.draw.height;

		//Get the chromosome radius
		var radius = this.karyotypes.radius;

		//Draw the chromosome
		canvas.Rect({ x: posx, y: posy, width: width, height: height, radius: radius });

		//Set the chromsome fill color
		canvas.Fill(this.karyotypes.fill);

		//Set the chromosome stroke
		canvas.Stroke(this.karyotypes.stroke);

		//Get the regions for this chromosome
	}

};

//jvizToolKaryotypeTrack draw chromosome in detail
jvizToolKaryotypeTrack.prototype.DrawChromosome = function(canvas, chr)
{

};
