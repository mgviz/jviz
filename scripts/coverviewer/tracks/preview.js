//CoverViewer Preview Track
CoverViewer.prototype.PreviewTrack = function(opt)
{
  //Check for stroke width
  if(typeof opt.stroke !== 'undefined') { this.preview.stroke = opt.stroke; }
};

//CoverViewer preview track show full region info
CoverViewer.prototype.PreviewTrackBarRegionInfo = function()
{
  //Add the chromosome
  var reg = 'Chromosome ' + this.draw.chromosome;

  //Add the start point
  reg = reg + ', start: '+ this.preview.draw.start;

  //Add the end point
  reg = reg + ', end: ' + this.preview.draw.end;

  //Show the region info
  this.preview.SetTitle(this.preview.title, reg);
};

//CoverViewer Preview Draw
CoverViewer.prototype.PreviewTrackDraw = function()
{
  //Save the down canvas
  var canvas = this.preview.Layer(0);

  //Clear the layer
	canvas.Clear();

  //Save the start position
  this.preview.draw.start = this.draw.start;

  //Save the end position
  this.preview.draw.end = this.draw.end;

  //Save the draw length
  this.preview.draw.length = this.preview.draw.end - this.preview.draw.start;

  //Calculate the scale
  this.preview.draw.scale = this.preview.draw.length/this.preview.draw.width;

  //Check for adjust the data
  if(this.core.resized === true || this.preview.data === null)
  {
    //Adjust the data
    this.preview.data = this.DataGen(this.preview.draw.height);

    //Apply the Gauss filter
    //this.preview.data = this.GaussFilter(this.preview.data);

    //Show in console
    console.log('CoverViewer: preview data successful adjusted to draw window');
  }

  //Lines array
  var lines = [];

  //Initialize the lines array
  for(var j = 0; j < this.bams.num; j++)
  {
    //Initialize the lines array
    lines[j] = [];
  }

  //Real position counter
  var p = this.preview.draw.margin.left;

  //Read all the positions
  for(var i = 0; i < this.preview.draw.width; i++)
  {
    //Get the real index
    var index = Math.floor(this.preview.draw.start + i*this.preview.draw.scale);

    //Get the cover
    var cover = (typeof this.preview.data[index] === 'undefined') ? this.bams.empty : this.preview.data[index];

    //Draw all the lines
    for(var j = 0; j < this.bams.num; j++)
    {
      //Calculate the y position
      var py = this.preview.height - this.preview.draw.margin.bottom - cover[j];

      //Push
      lines[j].push([p, py]);
    }

    //Increment the position
    p = p + 1;
  }

  //Draw all the lines
  for(var j = 0; j < this.bams.num; j++)
  {
    //Draw the line
    canvas.Line(lines[j]);

    //Set the line style
    canvas.Stroke({ width: this.preview.stroke, color: this.bams.color[j], opacity: this.preview.opacity });
  }

  //Calculate the window width
  this.preview.window.width = this.cover.draw.width/this.preview.draw.scale;

  //Calculate the window height
  this.preview.window.height = this.preview.draw.height;

  //Reset the preview start point
  this.preview.window.start = 0;

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

  //Check the start position
  if(this.preview.window.start < 0)
  {
    //Set the start position in 0
    this.preview.window.start = 0;
  }

  //Check if start + length > margin-left + width
  if(this.preview.window.start + this.preview.window.width > this.preview.draw.width)
  {
    //Change the start position
    this.preview.window.start = this.preview.draw.width - this.preview.window.width;
  }

  //Calculate the end position
  this.preview.window.end = this.preview.window.start + this.preview.window.width;

  //Calculate the region start coordinates
  this.preview.region.start = Math.floor(this.preview.draw.start + this.preview.window.start*this.preview.draw.scale);

  //Calculate the region end coordinates
  this.preview.region.end = Math.floor(this.preview.draw.start + this.preview.window.end*this.preview.draw.scale);

  //Get the rectangle position x
  var rect_x = this.preview.window.start + this.preview.draw.margin.left;

  //Get the rectangle position y
  var rect_y = this.preview.draw.margin.top;

  //Get the rectangle width
  var rect_width = this.preview.window.width;

  //Get the rectangle height
  var rect_height = this.preview.window.height;

  //Draw the rectangle
  canvas.Rect({ x: rect_x, y: rect_y, width: rect_width, height: rect_height });

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
  var posx = this.preview.window.start + this.preview.window.width/2 + this.preview.draw.margin.left;

  //Save the position y
  var posy = this.preview.label.posy;

  //Get the rectangle position x
  var rect_x = posx - this.preview.label.width/2;

  //Get the rectangle position y
  var rect_y = posy;

  //Get the rectangle width
  var rect_width = this.preview.label.width;

  //Get the rectangle height
  var rect_height = this.preview.label.height;

  //Get the rectangle radius
  var rect_radius = this.preview.label.radius;

  //Draw the rectangle
  canvas.Rect({ x: rect_x, y: rect_y, width: rect_width, height: rect_height, radius: rect_radius });

  //Set the style
  canvas.Fill(this.preview.label.fill);

  //Get the start point
  var text_start = this.preview.region.start;

  //Get the end point
  var text_end = this.preview.region.end;

  //Get the text
  var text_txt = text_start + ' - ' + text_end;

  //Get the text position x
  var text_x = posx;

  //Get the text position y
  var text_y = posy + 4;

  //Get the text font
  var text_font = this.preview.label.text.font;

  //Get the text size
  var text_size = this.preview.label.text.size;

  //Get the text align
  var text_align = this.preview.label.text.align;

  //Get the text color
  var text_color = this.preview.label.text.color;

  //Show the text
  canvas.Text({ text: text_txt, x: text_x, y: text_y, font: text_font, size: text_size, align: text_align, color: text_color });

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
  this.preview.click.point = x;

  //Save the start position
  this.preview.click.start = this.preview.window.start;

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
    this.preview.window.start = this.preview.click.start + (x - this.preview.click.point);

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
function CoverViewerPreviewTrackEvents(_this)
{
  //Save the ID
  var _id = '#' + _this.preview.id;

  //Mouse up
  $(_id).mouseup(function(e){

    //Prevent
    e.preventDefault();

    //Call the click handler
    _this.PreviewTrackMouseUp(e.pageX - $(this).offset().left);

  });

  //Mouse down
  $(_id).mousedown(function(e){

    //Prevent
    e.preventDefault();

    //Call the click handler
    _this.PreviewTrackMouseDown(e.pageX - $(this).offset().left);

  });

  //Mouse move
  $(_id).mousemove(function(e){

    //Prevent
    e.preventDefault();

    //Call the click handler
    _this.PreviewTrackMouseMove(e.pageX - $(this).offset().left);

  });
}
