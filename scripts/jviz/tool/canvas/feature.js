//jvizToolFeatureTrack main class
function jvizToolFeatureTrack(obj)
{
	//Check the track class
	obj.class = (typeof obj.class !== 'undefined')? obj.class : 'jvizToolCanvasTrack';

	//Check the number of layers
	obj.layers = (typeof obj.layers !== 'undefined')? obj.layers : 1;

	//Extend the jvizToolCanvasTrack
	jvizToolCanvasTrack.call(this, obj);

	//Initialize the feature options
	this.feature = {};
	this.feature.width = 0; //Feature width
	this.feature.height = 40; //Frature height
	this.feature.posx = 0; //Feature position x
	this.feature.posy = 0; //Feature position y
	this.feature.color = ''; //Feature color

	//Feature box
	this.feature.box = {};
	this.feature.box.width = 0; //Feature box width
	this.feature.box.height = 8; //Feature box height
	this.feature.box.margin = { top: 8, bottom: 5 }; //Feature box margin

	//Feature name
	this.feature.name = {};
	this.feature.name.font = 'Quicksand-Bold'; //Feature name font
	this.feature.name.size = '12px'; //Feature name size
};

//Inherit the jvizToolTrack methods
jvizToolFeatureTrack.prototype = Object.create(jvizToolCanvasTrack.prototype);

//Set the constructor
jvizToolFeatureTrack.prototype.constructor = jvizToolFeatureTrack;

//jvizToolFeatureTrack set chunk height
jvizToolFeatureTrack.prototype.SetChunks = function(num)
{
	//Save the track height
	this.height = this.draw.margin.top + this.draw.margin.bottom + this.feature.height*num;

	//Resize the track
	this.Resize();
};

//jvizToolFeatureTrack draw feature
jvizToolFeatureTrack.prototype.DrawFeature = function(canvas, feature, color)
{
	//Check the chunk
	if(typeof feature.chunk === 'undefined'){ feature.chunk = 0; }

	//Save the feature color
	this.feature.color = color;

	//Get the position x
	this.feature.posx = this.draw.margin.left + Math.max(feature.start - this.draw.start, 0)*this.draw.scale;

	//Get the position y
	this.feature.posy = this.draw.margin.top + this.feature.height*feature.chunk;

	//Draw the box
	this.DrawBox(canvas, feature);

	//Draw the text
	this.DrawName(canvas, jvizFeatureStrand(feature.strand) + ' ' + feature.name);
};

//jvizToolFeatureTrack draw gene
jvizToolFeatureTrack.prototype.DrawGene = function(canvas, gene, color)
{
	//Check the gene chunk
	if(typeof gene.chunk === 'undefined'){ gene.chunk = 0; }

	//Check the transcripts
	if(typeof gene.transcripts === 'undefined'){ gene.transcripts = []; }

	//Draw the gene
	this.DrawFeature(canvas, gene, color);

	//Draw the transcripts
	for(var i = 0; i < gene.transcripts.length; i++)
	{
		//Check the transcript chunk
		if(typeof gene.transcripts[i].chunk === 'undefined'){ gene.transcripts[i].chunk = gene.chunk + i + 1; }

		//Draw the transcript
		this.DrawTranscript(canvas, gene.transcripts[i], color);
	}
};

//jvizToolFeatureTrack draw transcript
jvizToolFeatureTrack.prototype.DrawTranscript = function(canvas, transcript, color)
{
	//Check the transcript exons
	if(typeof transcript.exons === 'undefined'){ transcript.exons = []; }

	//Check the transcript chunk
	if(typeof transcript.chunk === 'undefined'){ transcript.chunk = 0; }

	//Save the feature color
	this.feature.color = color;

	//Get the position x
	this.feature.posx = this.draw.margin.left + Math.max(transcript.start - this.draw.start, 0)*this.draw.scale;

	//Get the position y
	this.feature.posy = this.draw.margin.top + this.feature.height*transcript.chunk;

	//Draw the line
	this.DrawLine(canvas, transcript);

	//Read all the features
	for(var i = 0; i < transcript.exons.length; i++)
	{
		//Get the exon
		var feature = transcript.exons[i];

		//Check the position
		if(feature.start > this.draw.end || feature.end < this.draw.start){ continue; }

		//Draw the box
		this.DrawBox(canvas, feature);
	}

	//Draw the transcript name
	this.DrawName(canvas, transcript.name);
};

//jvizToolFeatureTrack draw feature box
jvizToolFeatureTrack.prototype.DrawBox = function(canvas, feature)
{
	//Get the feature start point
	var feature_start = this.draw.margin.left + Math.max(feature.start - this.draw.start, 0)*this.draw.scale;

	//Feature end point
	var feature_end = this.draw.margin.left + (Math.min(feature.end, this.draw.end) - this.draw.start)*this.draw.scale;

	//Get the feature y point
	var feature_y = this.feature.posy + this.feature.box.margin.top;

	//Get the feature width
	var feature_width = Math.max(1, feature_end - feature_start);

	//Get the feature height
	var feature_height = this.feature.box.height;

	//Draw the rectangle
	canvas.Rect({ x: feature_start, y: feature_y, width: feature_width, height: feature_height });

	//Add the rectangle fill color
	canvas.Fill(this.feature.color);
};

//jvizToolFeatureTrack draw feature name
jvizToolFeatureTrack.prototype.DrawName = function(canvas, name)
{
	//Set the feature text position x
	var name_x = this.feature.posx;

	//Set the feature text position y
	var name_y = this.feature.posy + this.feature.box.height + this.feature.box.margin.top + this.feature.box.margin.bottom;

	//Get the feature name font
	var name_font = this.feature.name.font;

	//Get the feature name size
	var name_size = this.feature.name.size;

	//Get the feature color
	var name_color = this.feature.color;

	//Add the transcript text
	canvas.Text({ x: name_x, y: name_y, text: name, font: name_font, size: name_size, color: name_color });
};

//jvizToolFeatureTrack draw line
jvizToolFeatureTrack.prototype.DrawLine = function(canvas, feature)
{
	//Get the line start point
	var feature_start = this.draw.margin.left + Math.max(feature.start - this.draw.start, 0)*this.draw.scale;

	//Get the line end point
	var feature_end = this.draw.margin.left + (Math.min(feature.end, this.draw.end) - this.draw.start)*this.draw.scale;

	//Get the line position y
	var feature_y = this.feature.posy + this.feature.box.height/2 + this.feature.box.margin.top;

	//Draw the line
	canvas.Line([[feature_start, feature_y], [feature_end, feature_y]]);

	//Add the color
	canvas.Stroke(this.feature.color);
};
