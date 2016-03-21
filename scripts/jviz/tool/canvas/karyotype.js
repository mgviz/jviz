//jvizToolKaryotypeTrack main class
function jvizToolKaryotypeTrack(obj)
{
	//Check the track class
	obj.class = (typeof obj.class !== 'undefined')? obj.class : 'jvizToolCanvasTrack';

	//Check the track layers
	obj.layers = (typeof obj.layers !== 'undefined') ? obj.layers : 5;

	//Check the number of layers
	if(obj.layers < 5){ obj.layers = 5; }

	//Extend the jvizToolCanvasTrack
	jvizToolCanvasTrack.call(this, obj);

	//Track height
	this.height = 160;

	//Track draw margin
	this.draw.margin = { top: 50, bottom: 40, left: 50, right: 50 };

	//Actual status
	this.status = '';

	//Fill object
	this.fill = {};

	//Fill chromosome
	this.fill.chromosome = {};
	this.fill.chromosome.color = '#38b1eb'; //Chromosome fill color
	this.fill.chromosome.opacity = 0.5; //Chromosome fill opacity

	//Centromere
	this.fill.centromere = {};
	this.fill.centromere.color = '#38b1eb'; //Centromere fill color
	this.fill.centromere.opacity = 0.8; //Centromere fill opacity

	//Karyotypes
	this.karyotypes = {};
	this.karyotypes.width = 15; //Karyotypes width
	this.karyotypes.height = 0; //Karyotypes height
	this.karyotypes.list = []; //Karyotypes list
	this.karyotypes.margin = 0; //Margin between the chromosomes
	this.karyotypes.radius = 6; //Karyotypes radius
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

	//Chromosome
	this.chromosome = {};
	this.chromosome.posx = 0; //Chromosome position x
	this.chromosome.posy = 0; //Chromosome position y
	this.chromosome.width = 0; //Chromsome width
	this.chromosome.height = 50; //Chromosome height
	this.chromosome.now = -1; //Actual chromosome
	this.chromosome.scale = 1; //Chromosome scale
	this.chromosome.radius = 20; //Chromosome radius

	//Chromosome position
	this.chromosome.position = {};
	this.chromosome.position.width = 90; //Position width
	this.chromosome.position.height = 20; //Position height
	this.chromosome.position.posx = 0; //Position x
	this.chromosome.position.posy = 0; //Position y
	this.chromosome.position.radius = 5; //Position radius
	this.chromosome.position.margin = 26; //Position margin
	this.chromosome.position.fill = '#38b1eb'; //Position fill color

	//Chromosome position text
	this.chromosome.position.text = {};
	this.chromosome.position.text.color = '#ffffff'; //Position text color
	this.chromosome.position.text.font = 'Quicksand'; //Position text font
	this.chromosome.position.text.size = '11px'; //Position text size
	this.chromosome.position.text.align = 'center'; //Position text align
	this.chromosome.position.text.margin = 4; //Position text margin

	//Chromosome regions
	this.chromosome.regions = {};
	this.chromosome.regions.preview = true; //Preview chromosome regions
	this.chromosome.regions.list = []; //Regions list
	this.chromosome.regions.fill = '#ea685a'; //Regions color
	this.chromosome.regions.opacity = 0.8; //Regions opacity
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

		//Check the region name or label
		re.name = (typeof re.name === 'undefined') ? 'Region ' + i : re.name;

		//Chekc the region label
		re.name = (typeof re.label === 'undefined') ? re.name : re.label;

		//Save the region
		this.regions.list[re.chromosome].push({ start: re.start, end: re.end, name: re.name });
	}
};

//jvizToolKaryotypeTrack set chromosome now
jvizToolKaryotypeTrack.prototype.SetChromosomeNow = function(index)
{
	//Save the actual chromosome
	this.chromosome.now = index;
};

//jvizToolKaryotypeTrack get chromosome now
jvizToolKaryotypeTrack.prototype.GetChromosomeNow = function()
{
	//Return the actual chromosome
	return this.chromosome.now;
};

//jvizToolKaryotypeTrack get chromosome by index
jvizToolKaryotypeTrack.prototype.GetChromosomeByIndex = function(index)
{
	//Return the chromosome info
	return this.karyotypes.list[index];
};

//jvizToolKaryotypeTrack get region info
jvizToolKaryotypeTrack.prototype.GetRegion = function(chr, index)
{
	//Return the region info
	return this.regions.list[chr][index];
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

	//Get the middle layer
	var canvas = this.Layer(2);

	//Clear the canvas
  canvas.Clear();

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
		canvas.Fill({ color: this.fill.chromosome.color, opacity: this.fill.chromosome.opacity });

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
			canvas.Fill({ color: this.fill.centromere.color, opacity: this.fill.centromere.opacity });
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

//jvizToolKaryotypeTrack Karyotypes find chromosome
jvizToolKaryotypeTrack.prototype.KaryotypesClick = function(x, y)
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
		if(x < pos.x){ return -1; }

		//Check the right position x
		if(pos.x + pos.width < x){ continue; }

		//Return the chromosome index
		return i;
	}

	//Default, return -1
	return -1;
};

//jvizToolKaryotypeTrack draw chromosome in detail
jvizToolKaryotypeTrack.prototype.ChromosomeDraw = function()
{
	//Check the actual chromosome
	if(this.chromosome.now < 0){ return; }

	//Get the middle canvas
  var canvas = this.Layer(2);

  //Clear
  canvas.Clear();

	//Get the chromosome info
	var chr = this.karyotypes.list[this.chromosome.now];

	//Save the chromosome scale
	this.chromosome.scale = this.draw.width/chr.length;

	//Save the chromosome width
	this.chromosome.width = this.draw.width;

	//Calculate the chromosome position x
	this.chromosome.posx = this.draw.margin.left;

	//Calculate the chromosome position y
	this.chromosome.posy = this.draw.margin.top + (this.draw.height - this.chromosome.height)/2;

	//Get the chromosome x point
	var chr_x = this.chromosome.posx;

	//Get the chromosome y point
	var chr_y = this.chromosome.posy;

	//Get the chromosome width
	var chr_width = this.chromosome.width;

	//Get the chromosome height
	var chr_height = this.chromosome.height;

	//Get the chromosome radius
	var chr_radius = this.chromosome.radius;

	//Draw the chromosome rectangle
	canvas.Rect({ x: chr_x, y: chr_y, width: chr_width, height: chr_height, radius: chr_radius });

	//Chromosome rectangle fill
	canvas.Fill({ color: this.fill.chromosome.color, opacity: this.fill.chromosome.opacity });

	//Check for draw the centromere
	if(typeof chr.centromere !== 'undefined')
	{
		//Calculate the centromere start point
		var cent_start = Math.floor(chr.centromere[0]*this.chromosome.scale);

		//Calculate the centromere end
		var cent_end = Math.floor(chr.centromere[1]*this.chromosome.scale);

		//Calculate the centromere width
		var cent_width = Math.abs(cent_end - cent_start);

		//Clear the centromere rectangle
		canvas.Clear({ x: cent_start, y: chr_y, width: cent_width, height: chr_height });

		//Create the centromere points
		var p = [];

		//Add the centromere top start
		p.push([ cent_start, chr_y ]);

		//Add the centromere top middle
		p.push([ cent_start + cent_width/2, chr_y + chr_height/2 ]);

		//Add the centromere top end
		p.push([ cent_end, chr_y ]);

		//Add the centromere bottom end
		p.push([ cent_end, chr_y + chr_height ]);

		//Add the centromere bottom middle
		p.push([ cent_start + cent_width/2, chr_y + chr_height/2 ]);

		//Add the centromere bottom start
		p.push([ cent_start, chr_y + chr_height ]);

		//Add the lines
		canvas.Line(p);

		//Add the fill
		canvas.Fill({ color: this.fill.centromere.color, opacity: this.fill.centromere.opacity });
	}

	//Get the regions for this chromosome
	var regions = (typeof this.regions.list[chr.id] === 'undefined') ? [] : this.regions.list[chr.id];

	//Initialize the chromosome regions positions list
	this.chromosome.regions.list = [];

	//Read all the regions
	for(var i = 0; i < regions.length; i++)
	{
		//Get the region
		var re = regions[i];

		//Calculate the start position
		var rect_start = this.chromosome.posx + re.start*this.chromosome.scale;

		//Calculate the end position
		var rect_end = this.chromosome.posx + re.end*this.chromosome.scale;

		//Calculate the width
		var rect_width = Math.max(1, rect_end - rect_start);

		//Save the rectangle height
		var rect_height = this.chromosome.height;

		//Save the Y position
		var rect_y = this.chromosome.posy;

		//Draw the region
		canvas.Rect({ x: rect_start, y: rect_y, width: rect_width, height: rect_height });

		//Fill the region
		canvas.Fill({ color: this.chromosome.regions.fill, opacity: this.chromosome.regions.opacity });


		//Save the region position
		this.chromosome.regions.list.push([ rect_start, rect_end ]);
	}


	//Calculate the position coordinate y
	this.chromosome.position.posy = this.chromosome.posy - this.chromosome.position.margin;

};

//jvizToolKaryotypeTrack check chromosome click
jvizToolKaryotypeTrack.prototype.ChromosomeClick = function(x, y)
{
	//Check the x coordinate
	if(x < this.chromosome.posx || this.chromosome.posx + this.chromosome.width < x){ return false; }

	//Check the y coordinate
	//if(y < this.chromosome.posy || this.chromosome.posy + this.chromosome.height < y){ return false; }

	//Return true
	return true;
};

//jvizToolKaryotypeTrack Chromosome draw position
jvizToolKaryotypeTrack.prototype.ChromosomeDrawPosition = function(x, y)
{
	//Get the second layer
  var canvas = this.Layer(1);

  //Clear
  canvas.Clear({ x: 0, y: 0, width: this.width, height: this.chromosome.posy + this.chromosome.height });

	//Check the position
	if(this.ChromosomeClick(x, y) === false){ return; }

	//Rectangle position x
	var rect_x = x - this.chromosome.position.width/2;

	//Rectangle position y
	var rect_y = this.chromosome.position.posy;

	//Rectangle width
	var rect_widt = this.chromosome.position.width;

	//Rectangle height
	var rect_height = this.chromosome.position.height;

	//Rectangle radius
	var rect_radius = this.chromosome.position.radius;

	//Draw the rectangle
	canvas.Rect({ x: rect_x, y: rect_y, width: rect_widt, height: rect_height, radius: rect_radius });

	//Draw the fill color
	canvas.Fill(this.chromosome.position.fill);

	//Get the real position
	var text_text = Math.floor((x - this.chromosome.posx)/this.chromosome.scale);

	//Text position x
	var text_x = x;

	//Text position y
	var text_y = this.chromosome.position.posy + this.chromosome.position.text.margin;

	//Text align
	var text_align = this.chromosome.position.text.align;

	//Text color
	var text_color = this.chromosome.position.text.color;

	//Text font
	var text_font = this.chromosome.position.text.font;

	//Text size
	var text_size = this.chromosome.position.text.size;

	//Draw the text
	canvas.Text({ text: text_text, x: text_x, y: text_y, align: text_align, color: text_color, font: text_font, size: text_size });

	//Initialize the triangle array
	var tri = [];

	//Calculate the y position
	var py = this.chromosome.position.posy + this.chromosome.position.height;

	//Add the first point
	tri.push([ x - 6, py ]);

	//Add the middle point
	tri.push([ x, py + 6 ]);

	//Add the first point
	tri.push([ x + 6, py ]);

	//Add the line
	canvas.Line(tri);

	//Add the fill color
	canvas.Fill(this.chromosome.position.fill);

	//Create the position line
	canvas.Line([[ x, py ], [ x, this.chromosome.posy + this.chromosome.height ]]);

	//Add the line stroke
	canvas.Stroke(this.chromosome.position.fill);

};
