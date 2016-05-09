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
	this.draw.margin = { top: 50, bottom: 40, left: 40, right: 40 };

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
	this.karyotypes.text.font = 'Quicksand-Bold'; //Karyotypes Text font
	this.karyotypes.text.size = '11px'; //Karyotypes text size
	this.karyotypes.text.color = '#38b1eb'; //Karyotypes text color
	this.karyotypes.text.align = 'center'; //Karyotypes text align
	this.karyotypes.text.margin = 5; //Karyotypes text margin top

	//Karyotypes hover
	this.karyotypes.hover = {};
	this.karyotypes.hover.hover = -1; //Hover karyotype index
	this.karyotypes.hover.margin = { top: 10, bottom: 20, left: 10, right: 10 }; //Hover margin
	this.karyotypes.hover.color = '#ffffff'; //Hover background color
	this.karyotypes.hover.opacity = 1.0; //Hover background color opacity
	this.karyotypes.hover.radius = 10; //Hover radius

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

	//Chromosome util positions
	this.chromosome.utils = {};
	this.chromosome.utils.posy_start = 0; //Position y start
	this.chromosome.utils.posy_end = 0; //Position y end
	this.chromosome.utils.up = 0; //Up zone
	this.chromosome.utils.down = 0; //Down zone

	//Chromosome position
	this.chromosome.position = {};
	this.chromosome.position.width = 90; //Position width
	this.chromosome.position.height = 20; //Position height
	this.chromosome.position.posx = 0; //Position x
	this.chromosome.position.posy = 0; //Position y
	this.chromosome.position.radius = 5; //Position radius
	this.chromosome.position.margin = 26; //Position margin
	this.chromosome.position.fill = '#38b1eb'; //Position fill color
	this.chromosome.position.triangle = 6; //Triangle width

	//Chromosome position text
	this.chromosome.position.text = {};
	this.chromosome.position.text.color = '#ffffff'; //Position text color
	this.chromosome.position.text.font = 'Quicksand'; //Position text font
	this.chromosome.position.text.size = '11px'; //Position text size
	this.chromosome.position.text.align = 'center'; //Position text align
	this.chromosome.position.text.margin = 4; //Position text margin

	//Chromosome regions
	this.chromosome.regions = {};
	this.chromosome.regions.list = []; //Regions list
	this.chromosome.regions.fill = '#ea685a'; //Regions color
	this.chromosome.regions.opacity = 0.8; //Regions opacity
	this.chromosome.regions.click = 3; //Regions click margin

	//Chromosome regions label
	this.chromosome.regions.label = {};
	this.chromosome.regions.label.posx = 0; //Regions label position x
	this.chromosome.regions.label.posy = 0; //Regions label position y
	this.chromosome.regions.label.width = 70; //Regions label width
	this.chromosome.regions.label.height = 18; //Regions label height
	this.chromosome.regions.label.margin = 6; //Regions label margin
	this.chromosome.regions.label.radius = 5; //Regions label radius
	this.chromosome.regions.label.fill = '#ea685a'; //Regions label color
	this.chromosome.regions.label.opacity = 1.0; //Regions label opacity
	this.chromosome.regions.label.triangle = 6; //Regions label triangle
	this.chromosome.regions.label.hover = -1; //Regions label hover now

	//Chromosome regions label text
	this.chromosome.regions.label.text = {};
	this.chromosome.regions.label.text.font = 'Quicksand'; //Label regions text font
	this.chromosome.regions.label.text.size = '10px'; //Label regions text size
	this.chromosome.regions.label.text.align = 'center'; //Label regions text align
	this.chromosome.regions.label.text.color = '#ffffff'; //Label regions text color
	this.chromosome.regions.label.text.margin = 3; //Label regions text margin

	//Chromosome regions preview
	this.chromosome.regions.preview = {};
	this.chromosome.regions.preview.active = true; //Preview chromosome regions active
	this.chromosome.regions.preview.opacity = 0.3; //Preview chromosome regions opacity

	//Marks
	this.marks = {};
	this.marks.list = {}; //Marks list
	this.marks.fill = '#b490f5'; //Marks fill color
	this.marks.triangle = 5; //Triangle width

	//Marks for karyotypes
	this.marks.karyotypes = {};
	this.marks.karyotypes.width = 25; //Mark for karyotypes width
	this.marks.karyotypes.height = 17; //Mark for karyotypes height
	this.marks.karyotypes.margin = 22; //Mark for karyotypes margin
	this.marks.karyotypes.radius = 5; //Mark for karyotypes radius
	this.marks.karyotypes.triangle = 1; //Mark for karyotyopes triangle margin
	this.marks.karyotypes.text = 2; //Marks for karyotypes text margin

	//Marks for chromosomes
	this.marks.chromosomes = {};
	this.marks.chromosomes.width = 25; //Mark for chromosomes width
	this.marks.chromosomes.height = 17; //Mark for chromosomes height
	this.marks.chromosomes.margin = 22; //Mark for chromosomes margin
	this.marks.chromosomes.radius = 5; //Mark for chromosomes radius
	this.marks.chromosomes.triangle = 1; //Mark for chromosomes triangle margin
	this.marks.chromosomes.text = 2; //Marks for chromosomes text margin
	this.marks.chromosomes.opacity = 1.0; //Marks for chromosomes default opacity

	//Marks for chromosomes preview
	this.marks.chromosomes.preview = {};
	this.marks.chromosomes.preview.active = true; //Chromosomes marks preview active
	this.marks.chromosomes.preview.opacity = 0.3; //Chromosomes marks preview opacity

	//Marks text
	this.marks.text = {};
	this.marks.text.x = 0; //Marks text position x
	this.marks.text.y = 0; //Marks text position y
	this.marks.text.text = ''; //Marks text text
	this.marks.text.font = 'Quicksand-Bold'; //Marks text font
	this.marks.text.size = '12px'; //Marks text size
	this.marks.text.color = '#ffffff'; //Marks text color
	this.marks.text.align = 'center'; //Marks text align

	//Return the track
	return this;
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

		//Check the region label
		re.label = (typeof re.label === 'undefined') ? re.name : re.label;

		//Save the region
		this.regions.list[re.chromosome].push(re);
	}
};

//jvizToolKaryotypeTrack set marks
jvizToolKaryotypeTrack.prototype.SetMarks = function(marks)
{
	//Restart the marks list
	this.marks.list = {};

	//Read all the marks
	for(var i = 0; i < marks.length; i++)
	{
		//Get the mark
		var m = marks[i];

		//Check the chromosome
		if(typeof this.marks.list[m.chromosome] === 'undefined')
		{
			//Create the chromosome
			this.marks.list[m.chromosome] = [];
		}

		//Create the new object
		var obj = {};

		//Save the start point
		obj.start = parseInt(m.start);

		//Save the end point
		obj.end = parseInt(m.end);

		//Save the mark
		this.marks.list[m.chromosome].push(obj);
	}

	//Get all the chromosome marks
	var chrs = Object.keys(this.marks.list);

	//Read all the chromosomes
	for(var i = 0; i < chrs.length; i++)
	{
		//Shor the marks by start position
		this.marks.list[chrs[i]] = ObjectSort(this.marks.list[chrs[i]], 'start');
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

//jvizToolKaryotypeTrack get chromosome now info
jvizToolKaryotypeTrack.prototype.GetChromosomeNowInfo = function()
{
	//Return the chromosome info
	return this.karyotypes.list[this.chromosome.now];
}

//jvizToolKaryotypeTrack get chromosome by index
jvizToolKaryotypeTrack.prototype.GetChromosomeByIndex = function(index)
{
	//Return the chromosome info
	return this.karyotypes.list[index];
};

//jvizToolKaryotypeTrack get marks by chromosome ID
jvizToolKaryotypeTrack.prototype.GetMarks = function(chr)
{
	//Check for undefined
	if(typeof this.marks.list[chr] === 'undefined'){ return []; }

	//Default, return the marks
	return this.marks.list[chr];
};

//jvizToolKaryotypeTrack find chromosome index
jvizToolKaryotypeTrack.prototype.FindChromosomeIndex = function(id)
{
	//Convert the id to lower case
	id = id.toLowerCase();

	//Read all the chromosomes
	for(var i = 0; i < this.karyotypes.list.length; i++)
	{
		//Get the karyotype
		var k = this.karyotypes.list[i];

		//Check
		if(k.id.toLowerCase() === id){ return i; }
	}

	//Default, return -1
	return -1;
};

//jvizToolKaryotypeTrack get region info
jvizToolKaryotypeTrack.prototype.GetRegion = function(index)
{
	//Get the actual chromosome
	var chr = this.karyotypes.list[this.chromosome.now];

	//Get the region info
	var region = this.regions.list[chr.id][index];

	//Return the region
	return region;
};

//jvizToolKaryotypeTrack calculate the margin
jvizToolKaryotypeTrack.prototype.KaryotypesMargin = function()
{
	//Calculate free space
	var free = this.draw.width - this.karyotypes.list.length*this.karyotypes.width;

	//Get the margin
	this.karyotypes.margin = free/(this.karyotypes.list.length - 1);
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

		//Get the mark for this chromosome
		var marks = this.GetMarks(ch.id);

		//Get the chromosome width
		var width = this.karyotypes.width;

		//Get the chromosome height
		var height = this.draw.height*(ch.length/this.karyotypes.max);

		//Get the chromosome position x
		var posx = this.draw.margin.left + (i + 0)*this.karyotypes.margin + i*this.karyotypes.width;

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
		var regions = (typeof this.regions.list[ch.id] === 'undefined') ? [] : this.regions.list[ch.id];

		//Number of marks
		var marks_count = 0;

		//Read all the regions
		for(var j = 0; j < regions.length; j++)
		{
			//Get the region
			var re = regions[j];

			//Region start
			var re_start = this.draw.height*(re.start/this.karyotypes.max);

			//Region end
			var re_end = this.draw.height*(re.end/this.karyotypes.max);

			//Region width
			var re_width = this.karyotypes.width;

			//Region height
			var re_height = Math.max(Math.abs(re_end - re_start), 1);

			//Region position x
			var re_x = posx;

			//Region position y
			var re_y = this.draw.margin.top + this.draw.height - re_start;

			//Draw the region
			canvas.Rect({ x: re_x, y: re_y, width: re_width, height: re_height });

			//Region fill
			canvas.Fill({ color: this.chromosome.regions.fill, opacity: this.chromosome.regions.opacity });

			//Read all the marks and find one on this chromosome
			for(var k = 0; k < marks.length; k++)
			{
				//Get the mark
				var m = marks[k];

				//Check if mark is on the region
				if(re.end < m.start || m.end < re.start){ continue; }

				//Increment the counter
				marks_count = marks_count + 1;
			}
		}

		//Check the number of marks
		if(marks_count === 0){ continue; }

		//Get the mark rectangle position x
		var mark_x = posx + this.karyotypes.width/2 - this.marks.karyotypes.width/2;

		//Get the mark rectange position y
		var mark_y = posy - this.marks.karyotypes.margin;

		//Get the mark rectange radius
		var mark_radius = this.marks.karyotypes.radius;

		//Get the mark width
		var mark_width = this.marks.karyotypes.width;

		//Get the mark rectangle height
		var mark_height = this.marks.karyotypes.height;

		//Draw the rectangle
		canvas.Rect({ x: mark_x, y: mark_y, width: mark_width, height: mark_height, radius: mark_radius });

		//Set the rectangle color
		canvas.Fill({ color: this.marks.fill });

		//Update the text position x
		this.marks.text.x = posx + this.karyotypes.width/2;

		//Update the text position y
		this.marks.text.y = mark_y + this.marks.karyotypes.text;

		//Update the text
		this.marks.text.text = marks_count.toString();

		//Draw the text
		canvas.Text(this.marks.text);

		//Update the mark position x
		mark_x = posx + this.karyotypes.width/2;

		//Update the mark position y
		mark_y = mark_y + this.marks.karyotypes.height - this.marks.karyotypes.triangle;

		//Initialize the triangle array
		var tri = [];

		//Add the first point
		tri.push([ mark_x - this.marks.triangle, mark_y ]);

		//Add the middle point
		tri.push([ mark_x, mark_y + this.marks.triangle ]);

		//Add the first point
		tri.push([ mark_x + this.marks.triangle, mark_y ]);

		//Add the line
		canvas.Line(tri);

		//Add the fill color
		canvas.Fill(this.marks.fill);

		//Next chromosome
	}

	//Reset the karyotypes hover
	this.karyotypes.hover.hover = -1;
};

//jvizToolKaryotypeTrack Karyotypes find chromosome
jvizToolKaryotypeTrack.prototype.KaryotypesClick = function(x, y)
{
	//Check for click on the margin left
	if(x < this.draw.margin.left + 0*this.karyotypes.margin){ return -1; }

	//Check for click on the margin right
	if(this.draw.margin.left + this.draw.width - 0*this.karyotypes.margin < x){ return -1; }

	//Check for click on the margin top
	if(y < this.draw.margin.top){ return -1; }

	//Check for click on the margin bottom
	if(this.draw.margin.top + this.draw.height < y){ return -1; }

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

//jvizToolKaryotypeTrack Karyotypes hover
jvizToolKaryotypeTrack.prototype.KaryotypesHover = function(x, y)
{
	//Get the hover chromosome
	var index = this.KaryotypesClick(x, y);

	//Check the index
	if(index === this.karyotypes.hover.hover){ return; }

	//Update the index
	this.karyotypes.hover.hover = index;

	//Get the canvas
	var canvas = this.Layer(1);

	//Clear the canvas
	canvas.Clear();

	//Check for no chromosome
	if(index < 0){ return this.CursorRemove('hand'); }

	//Get the chromosome position
	var chr = this.karyotypes.positions[index];

	//Calculate the hover position x
	var rect_x = chr.x - this.karyotypes.hover.margin.left;

	//Calculate the hover position y
	var rect_y = chr.y - this.karyotypes.hover.margin.top;

	//Calculate the hover width
	var rect_width = chr.width + this.karyotypes.hover.margin.left + this.karyotypes.hover.margin.right;

	//Calculate the hover height
	var rect_height = chr.height + this.karyotypes.hover.margin.top + this.karyotypes.hover.margin.bottom;

	//Get the hover radius
	var rect_radius = this.karyotypes.hover.radius;

	//Draw
	canvas.Rect({ x: rect_x, y: rect_y, width: rect_width, height: rect_height, radius: rect_radius });

	//Set the fill color
	canvas.Fill({ color: this.karyotypes.hover.color, opacity: this.karyotypes.hover.opacity });

	//Add the hand cursor
	this.CursorSet('hand');
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

	//Get the down canvas
	var canvas1 = this.Layer(0);

	//Clear the down canvas
	canvas1.Clear();

	//Get the chromosome info
	var chr = this.karyotypes.list[this.chromosome.now];

	//Get the mark for this chromosome
	var marks = this.GetMarks(chr.id);

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

	//Calculate the regions label position y
	this.chromosome.regions.label.posy = this.chromosome.posy + this.chromosome.height + this.chromosome.regions.label.margin;

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

		//Save the region start coordinate
		re.pstart = rect_start;

		//Save the region end coordinate
		re.pend = rect_end;

		//Save the middle point
		re.pmiddle = (re.pstart + re.pend)/2;

		//Marks count
		var marks_count = 0;

		//Read all the marks
		for(var j = 0; j < marks.length; j++)
		{
			//Get the mark
			var m = marks[j];

			//Check if mark is on the region
			if(re.end < m.start || m.end < re.start){ continue; }

			//Increment the counter
			marks_count = marks_count + 1;
		}

		//Save the marks count
		re.marks_count = marks_count;

		//Save the region position
		this.chromosome.regions.list.push(re);

		//Check for add the preview label
		if(this.chromosome.regions.preview.active === true)
		{
			//Add the preview label
			this.ChromosomeDrawRegionLabelIndex(canvas1, i, this.chromosome.regions.preview.opacity);
		}

		//Check for draw the marks preview
		if(this.marks.chromosomes.preview.active === true)
		{
			//Draw the mark this.marks.chromosomes.opacity
			this.ChromosomeDrawMarksIndex(canvas1, i, this.marks.chromosomes.preview.opacity);
		}

		//Next region
	}

	//Calculate the utils position y start
	this.chromosome.utils.posy_start = this.chromosome.posy;

	//Calculate the utils position y end
	this.chromosome.utils.posy_end = this.chromosome.posy + this.chromosome.height;

	//Calculate the up zone
	this.chromosome.utils.up = this.chromosome.posy;

	//Calculate the down zone
	this.chromosome.utils.down = this.height - this.chromosome.utils.posy_end;

	//Calculate the position coordinate y
	this.chromosome.position.posy = this.chromosome.posy - this.chromosome.position.margin;

	//Reset the hover region
	this.chromosome.regions.label.hover = -1;
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

//jvizToolKaryotypeTrack Chromosome click region
jvizToolKaryotypeTrack.prototype.ChromosomeClickRegion = function(x, y)
{
	//Check if user is hover the chromosome
	if(this.ChromosomeClick(x, y) === false){ return -1; }

	//Save the margin
	var m = this.chromosome.regions.click;

	//Find the region
	for(var i = 0; i < this.chromosome.regions.list.length; i++)
	{
		//Get the region
		var r = this.chromosome.regions.list[i];

		//Check the left position
		if(x < r.pstart - m){ return -1; }

		//Check the right position
		if(r.pend + m < x){ continue; }

		//Return the region index
		return i;
	}

	//Default, return -1
	return -1;
};

//jvizToolKaryotypeTrack Chromosome draw position
jvizToolKaryotypeTrack.prototype.ChromosomeDrawPosition = function(x, y)
{
	//Get the second layer
  var canvas = this.Layer(1);

  //Clear
  canvas.Clear({ x: 0, y: 0, width: this.width, height: this.chromosome.utils.posy_end });

	//Check the position
	if(this.ChromosomeClick(x, y) === false){ return; }

	//Rectangle position x
	var rect_x = x - this.chromosome.position.width/2;

	//Rectangle position y
	var rect_y = this.chromosome.position.posy;

	//Rectangle width
	var rect_width = this.chromosome.position.width;

	//Rectangle height
	var rect_height = this.chromosome.position.height;

	//Rectangle radius
	var rect_radius = this.chromosome.position.radius;

	//Draw the rectangle
	canvas.Rect({ x: rect_x, y: rect_y, width: rect_width, height: rect_height, radius: rect_radius });

	//Draw the fill color
	canvas.Fill(this.chromosome.position.fill);

	//Get the real position
	var text_text = Math.floor((x - this.chromosome.posx)/this.chromosome.scale);

	//Format the real position
	text_text = jvizMath.FormatNumber(text_text, '.');

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
	tri.push([ x - this.chromosome.position.triangle, py ]);

	//Add the middle point
	tri.push([ x, py + this.chromosome.position.triangle ]);

	//Add the first point
	tri.push([ x + this.chromosome.position.triangle, py ]);

	//Add the line
	canvas.Line(tri);

	//Add the fill color
	canvas.Fill(this.chromosome.position.fill);

	//Create the position line
	canvas.Line([[ x, py ], [ x, this.chromosome.posy + this.chromosome.height ]]);

	//Add the line stroke
	canvas.Stroke(this.chromosome.position.fill);
};

//jvizToolKaryotypeTrack Draw region label
jvizToolKaryotypeTrack.prototype.ChromosomeDrawRegionLabel = function(x, y)
{
	//Check the region
	var index = this.ChromosomeClickRegion(x, y);

	//Check for different index
	if(index === this.chromosome.regions.label.hover){ return; }

	//Update the index
	this.chromosome.regions.label.hover = index;

	//Get the canvas
	var canvas = this.Layer(3);

	//Clear the canvas
	//canvas.Clear({ x: 0, y: this.chromosome.utils.posy_end, width: this.width, height: this.chromosome.utils.down });
	canvas.Clear();

	//Check for null index
	if(index < 0) { return this.CursorRemove('hand'); }

	//Draw the region
	this.ChromosomeDrawRegionLabelIndex(canvas, index, this.chromosome.regions.label.opacity);

	//Draw the marks
	this.ChromosomeDrawMarksIndex(canvas, index, this.marks.chromosomes.opacity);

	//Add the hand cursor
	this.CursorSet('hand');
};

//jvizToolKaryotypeTrack Draw region label by index
jvizToolKaryotypeTrack.prototype.ChromosomeDrawRegionLabelIndex = function(canvas, index, opacity)
{
	//Check the opacity
	if(typeof opacity === 'undefined'){ var opacity = 1.0; }

	//Get the region info
	var region = this.chromosome.regions.list[index];

	//Get the rectangle position x
	var rect_x = region.pmiddle - this.chromosome.regions.label.width/2;

	//Get the rectangle position y
	var rect_y = this.chromosome.regions.label.posy;

	//Get the rectangle width
	var rect_width = this.chromosome.regions.label.width;

	//Get the rectangle height
	var rect_height = this.chromosome.regions.label.height;

	//Get the rectangle radius
	var rect_radius = this.chromosome.regions.label.radius;

	//Draw the rectangle
	canvas.Rect({ x: rect_x, y: rect_y, width: rect_width, height: rect_height, radius: rect_radius });

	//Draw the rectangle fill
	canvas.Fill({ color: this.chromosome.regions.label.fill, opacity: opacity });

	//Create the label triangle
	var tri = [];

	//Add the start point
	tri.push([ region.pmiddle - this.chromosome.regions.label.triangle, rect_y ]);

	//Add the middle point
	tri.push([ region.pmiddle, rect_y - this.chromosome.regions.label.triangle ]);

	//Add the end point
	tri.push([ region.pmiddle + this.chromosome.regions.label.triangle, rect_y ]);

	//Draw the lines
	canvas.Line(tri);

	//Fill the triangle
	canvas.Fill({ color: this.chromosome.regions.label.fill, opacity: opacity });

	//Get the text
	var text_text = region.name;

	//Get the text position x
	var text_x = region.pmiddle;

	//Get the text position y
	var text_y = this.chromosome.regions.label.posy + this.chromosome.regions.label.text.margin;

	//Get the text font
	var text_font = this.chromosome.regions.label.text.font;

	//Get the text size
	var text_size = this.chromosome.regions.label.text.size;

	//Get the text align
	var text_align = this.chromosome.regions.label.text.align;

	//Get the text color
	var text_color = this.chromosome.regions.label.text.color;

	//Draw the text
	canvas.Text({ text: text_text, x: text_x, y: text_y, font: text_font, color: text_color, size: text_size, align: text_align });

};

//jvizToolKaryotypeTrack Draw region marks by region index
jvizToolKaryotypeTrack.prototype.ChromosomeDrawMarksIndex = function(canvas, index, opacity)
{
	//Check the opacity
	if(typeof opacity === 'undefined'){ var opacity = 1.0; }

	//Get the region info
	var re = this.chromosome.regions.list[index];

	//Check the number of marks on this region
	if(re.marks_count === 0){ return; }

	//Get the mark rectangle position x
	var mark_x = re.pmiddle - this.marks.chromosomes.width/2;

	//Get the mark rectange position y
	var mark_y = this.chromosome.posy - this.marks.chromosomes.margin;

	//Get the mark rectange radius
	var mark_radius = this.marks.chromosomes.radius;

	//Get the mark width
	var mark_width = this.marks.chromosomes.width;

	//Get the mark rectangle height
	var mark_height = this.marks.chromosomes.height;

	//Draw the rectangle
	canvas.Rect({ x: mark_x, y: mark_y, width: mark_width, height: mark_height, radius: mark_radius });

	//Set the rectangle color
	canvas.Fill({ color: this.marks.fill , opacity: opacity });

	//Update the text position x
	this.marks.text.x = mark_x + this.marks.chromosomes.width/2;

	//Update the text position y
	this.marks.text.y = mark_y + this.marks.chromosomes.text;

	//Update the text
	this.marks.text.text = re.marks_count.toString();

	//Draw the text
	canvas.Text(this.marks.text);

	//Update the mark position x
	mark_x = mark_x + this.marks.chromosomes.width/2;

	//Update the mark position y
	mark_y = mark_y + this.marks.chromosomes.height - this.marks.chromosomes.triangle;

	//Initialize the triangle array
	var tri = [];

	//Add the first point
	tri.push([ mark_x - this.marks.triangle, mark_y ]);

	//Add the middle point
	tri.push([ mark_x, mark_y + this.marks.triangle ]);

	//Add the first point
	tri.push([ mark_x + this.marks.triangle, mark_y ]);

	//Add the line
	canvas.Line(tri);

	//Add the fill color
	canvas.Fill({ color: this.marks.fill, opacity: opacity });
};
