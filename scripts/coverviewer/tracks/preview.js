//CoverViewer Preview Track
CoverViewer.prototype.PreviewTrack = function(opt)
{
  //Check for stroke width
  if(typeof opt.stroke !== 'undefined') { this.preview.stroke = opt.stroke; }
};

//CoverViewer Preview build
CoverViewer.prototype.PreviewTrackBuild = function()
{
  //Create the main track div
	var div = '<div id="' + this.preview.id + '" class="' + this.preview.class + '">';

	//Create the track head
	div = div + '<div id="' + this.preview.head.id + '" class="' + this.preview.head.class + '">';

  //Add the arrow
  div = div + '<div id="' + this.preview.head.arrow.id + '" class="' + this.preview.head.arrow.class + '"></div>';

	//Add the track title
	div = div + '<div id="' + this.preview.head.title.id + '" class="' + this.preview.head.title.class + '"></div>';

  //Close the head track
	div = div + '</div>';

	//Show the canvas element
	div = div + '<canvas id="' + this.preview.canvas.id + '" class="' + this.preview.canvas.class + '"></canvas>';

	//Close the track div
	div = div + '</div>';

  //Return the new div
  return div;
};

//CoverViewer preview track show full region info
CoverViewer.prototype.PreviewTrackBarRegionInfo = function()
{
  //Add the chromosome
  var reg = 'Chromosome ' + this.draw.chromosome;

  //Add the start point
  reg = reg + ', start: '+ this.preview.start;

  //Add the end point
  reg = reg + ', end: ' + this.preview.end;

  //Show the region info
  this.preview.SetTitle(this.preview.title, reg);
};

//CoverViewer preview mouse
CoverViewer.prototype.PreviewTrackMouseEvnt = function()
{
  //Call the Mouse event
  CoverViewerPreviewTrackMouseEvnt(this);
};

//CoverViewer Preview Draw
CoverViewer.prototype.PreviewTrackDraw = function()
{
  //Save the down canvas
  var canvas = this.preview.Layer(0);

  //Clear the layer
	canvas.Clear();

  //Get the preview region draw width
  this.preview.draw.width = this.preview.width - this.preview.draw.margin.left - this.preview.draw.margin.right;

  //Get the preview region draw height
  this.preview.draw.height = this.preview.height - this.preview.draw.margin.top - this.preview.draw.margin.bottom;

  //Save the start position
  this.preview.start = this.data.cover.data[0].pos;

  //Save the end position
  this.preview.end = this.data.cover.data[this.data.cover.data.length - 1].pos;

  //Calculate
  this.preview.mult = (this.preview.end - this.preview.start)/this.preview.draw.width;

  //Check if is necessary adjust the data
  if(this.core.resized === true || this.preview.data === null)
  {
    //Adjust the data
    this.preview.data = this.DataGen(this.preview.draw.height);

    //Apply the Gauss filter
    this.preview.data = this.GaussFilter(this.preview.data);

    //Show in console
    console.log('CoverViewer: preview data successful adjusted to draw window');
  }

  //Draw the lines
  for(var j = 0; j < this.bams.num; j++)
  {
    //New object
    var obj = [];

    //Lines
    var poly = [];

    //Read all the positions
    for(var i = 0; i < this.preview.draw.width; i++)
    {
      //Calculate the x position
      var posx = this.preview.draw.margin.left + i;

      //Get the end index
      var index = this.DataFindPos(Math.floor(this.preview.start + i*this.preview.mult))

      //Calculate the y position
      var posy = this.preview.height - this.preview.draw.margin.bottom - this.preview.data[index][j];

      //Push the new point
      poly.push([posx, posy]);
    }

    //Draw the line
    canvas.Line(poly);

    //Set the line style
    canvas.Stroke({ width: this.preview.stroke, color: this.bams.color[j], opacity: this.preview.opacity });
  }

  //Calculate the window width
  this.preview.window.width = this.cover.draw.width/this.preview.mult;

  //Calculate the window height
  this.preview.window.height = this.preview.draw.height;

  //Reset the preview start point
  this.preview.window.start = this.preview.draw.margin.left;

  //Initialize the label position y
  this.preview.label.posy = this.preview.height - this.preview.draw.margin.bottom + this.preview.label.margin;

  //Draw the window
  this.PreviewTrackDrawWindow();

  //Show the region info
  this.PreviewTrackBarRegionInfo();
};

//CoverViewer Draw Preview Window
CoverViewer.prototype.PreviewTrackDrawWindow = function()
{
  //Get the canvas layer up
  var canvas = this.preview.Layer(1);

  //Clear the layer
	canvas.Clear();

  //Calculate the window start position
  //this.preview.window.start = Math.floor(px - this.preview.window.width/2);

  //Check the start position
  if(this.preview.window.start < this.preview.draw.margin.left)
  {
    //Set the start position in 0
    this.preview.window.start = this.preview.draw.margin.left;
  }

  //Check if start + length > margin-left + width
  if(this.preview.window.start + this.preview.window.width > this.preview.draw.margin.left + this.preview.draw.width)
  {
    //Change the start position
    this.preview.window.start = this.preview.draw.margin.left + this.preview.draw.width - this.preview.window.width;
  }

  //Calculate the end position
  this.preview.window.end = this.preview.window.start + this.preview.window.width;

  //Calculate the region start coordinates
  this.preview.window.region.start = (this.preview.window.start - this.preview.draw.margin.left)*this.preview.mult;
  this.preview.window.region.start = Math.floor(this.preview.start + this.preview.window.region.start);

  //Calculate the region end coordinates
  this.preview.window.region.end = (this.preview.window.end - this.preview.draw.margin.left)*this.preview.mult;
  this.preview.window.region.end = Math.floor(this.preview.start + this.preview.window.region.end);

  //Draw the rectangle
  canvas.Rect({
    x: this.preview.window.start,
    y: this.preview.draw.margin.top,
    width: this.preview.window.width,
    height: this.preview.window.height
  });

  //Add the fill
  canvas.Fill(this.preview.window.fill);

  //Draw label
  this.PreviewTrackDrawLabel();
};

//CoverViewer Preview Track Draw label
CoverViewer.prototype.PreviewTrackDrawLabel = function()
{
  //Get the canvas layer up
  var canvas = this.preview.Layer(1);

  //Save the position x
  var posx = this.preview.window.start+ this.preview.window.width/2;

  //Save the position y
  var posy = this.preview.label.posy;

  //Draw the rectangle
  canvas.Rect({
    x: posx - this.preview.label.width/2,
    y: posy,
    width: this.preview.label.width,
    height: this.preview.label.height,
    radius: this.preview.label.radius
  });

  //Set the style
  canvas.Fill(this.preview.label.fill);

  //Get the text
  var txt = this.preview.window.region.start + ' - ' + this.preview.window.region.end;

  //Show the text
  canvas.Text({
    text: txt,
    x: posx,
    y: posy + 2,
    font: this.preview.label.text.font,
    size: this.preview.label.text.size,
    align: this.preview.label.text.align,
    color: this.preview.label.text.color
  });

  //Draw the triangle
  canvas.Polygon([[posx - 6, posy + 2],[posx, posy - 6],[posx + 6, posy + 2]]);

  //Set the style
  canvas.Fill(this.preview.label.fill);
};

//CoverViewer Preview Track mouse down
CoverViewer.prototype.PreviewTrackMouseDown = function(x)
{
  //Activate the mouse
  this.preview.mouse = true;

  //Set cursor as move
  $('body').addClass(this.cursor.move);

  //Save the click position
  this.preview.window.click = x;

  //Save the start position
  this.preview.window.clickstart = this.preview.window.start;

  //Destroy the genes info
  this.GenesTrackInfoClear();
};

//CoverViewer Preview Track mouse move
CoverViewer.prototype.PreviewTrackMouseMove = function(x)
{
  //Check for draw
  if(this.preview.mouse === true)
  {
    //Calculate the start point
    this.preview.window.start = this.preview.window.clickstart + (x - this.preview.window.click);

    //Draw the region
    this.Move();
  }
};

//CoverViewer Preview Track mouse Up
CoverViewer.prototype.PreviewTrackMouseUp = function(x)
{
  //Set mouse as false
  this.preview.mouse = false;

  //Set default cursor
  $('body').removeClass(this.cursor.move);
};

//CoverViewer Preview Track mouse function event
function CoverViewerPreviewTrackMouseEvnt(_main)
{
  //Save the ID
  var _id = '#' + _main.preview.id;

  //Mouse up
  $(_id).mouseup(function(e){

    //Prevent
    e.preventDefault();

    //Call the click handler
    _main.PreviewTrackMouseUp(e.pageX - $(this).offset().left);

  });

  //Mouse down
  $(_id).mousedown(function(e){

    //Prevent
    e.preventDefault();

    //Call the click handler
    _main.PreviewTrackMouseDown(e.pageX - $(this).offset().left);

  });

  //Mouse move
  $(_id).mousemove(function(e){

    //Prevent
    e.preventDefault();

    //Call the click handler
    _main.PreviewTrackMouseMove(e.pageX - $(this).offset().left);

  });
}
