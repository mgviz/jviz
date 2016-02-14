//Use Cover Track
CoverViewer.prototype.CoverTrack = function()
{

};

//CoverViewer Cover Track Show region info
CoverViewer.prototype.CoverTrackBarRegionInfo = function()
{
  //Generate the region
  var reg = ' ' + this.cover.start + '-' + this.cover.end;

  //Show on the bar
  this.cover.SetTitle(this.cover.title, reg);
};

//CoverViewer cover track mouse
CoverViewer.prototype.CoverTrackMouseEvnt = function()
{
  //Call the Mouse event
  CoverViewerCoverTrackMouseEvnt(this);
}

//CoverViewer Cover track draw
CoverViewer.prototype.CoverTrackDraw = function(s)
{
  //Save the canvas down layer
	var canvas = this.cover.Layer(0);

	//Clear the layer
	canvas.Clear();

  //Calculate the draw width
  this.cover.draw.width = this.cover.width - this.cover.draw.margin.left - this.cover.draw.margin.right;

  //Calculate the draw height
  this.cover.draw.height = this.cover.height - this.cover.draw.margin.top - this.cover.draw.margin.bottom;

  //Show in console
  //console.log('CoverViewer: Cover Track ' + this.cover.draw.width + 'x' + this.cover.draw.height);

  //Check for adjust the data
  //if(this.core.resized === true || this.cover.data === null)
  if(this.cover.data === null)
  {
    //Adjust the data
    this.cover.data = this.DataGen(this.cover.draw.height);

    //Apply the Gauss filter
    this.cover.data = this.GaussFilter(this.cover.data);

    //Show in console
    console.log('CoverViewer: data successful adjusted to draw window');
  }

  //Save the start position
  this.cover.start = s;

  //Save the length window
  this.cover.length = this.cover.draw.width;

  //Check the start position
  if(s < this.data.cover.data[0].pos)
  {
    //Set the start position at the region start
    this.cover.start = this.data.cover.data[0].pos;
  }

  //Calculate the end position
  this.cover.end = this.cover.start + this.cover.length;

  //Check if end > region end
  if(this.cover.end > this.data.cover.data[this.data.cover.data.length - 1].pos)
  {
    //Change the end position
    this.cover.end = this.data.cover.data[this.data.cover.data.length - 1].pos;

    //Move the start
    this.cover.start = this.cover.end - this.cover.length;

    //Show error in console
    console.log('CoverViewer: window end > region end');
  }

  //Show in console
  //console.log('CoverViewer: drawing [' + this.cover.start + ',' + this.cover.end + ']');

  //Find the start position
  var starti = this.DataFindPos(this.cover.start);

  //Find the end position
  var endi = this.DataFindPos(this.cover.end);

  //Check the starti and endi
  if(starti < 0 || endi < 0)
  {
    //Show error
    console.error('CoverViewer: start position not found...');

    //Exit
    return;
  }

  //Draw the control points
	this.PointsDraw(canvas, this.cover.start, this.cover.end, this.cover.height, this.cover.draw.margin);

  //Draw the lines
  for(var j = 0; j < this.bams.num; j++)
  {
    //Poly lines
    var poly = [];

    //Real position counter
    var p = this.cover.draw.margin.left;

    //Get the line style
    var lstyle = { "width": this.cover.stroke, "color": this.bams.color[j] };

		//Check the line opacity
		lstyle.opacity = (this.bams.active[j] === false)? this.bams.opacity : 1.0;

    //Read all the positions
    for(var i = starti; i < endi; i++)
    {
      //Calculate the next position
      var py = this.cover.height - this.cover.draw.margin.bottom - this.cover.data[i][j];

      //Push
      poly.push([p, py]);

      //Increment the position
      p = p + 1;
    }

    //Draw the line
    canvas.Line(poly);

    //Set the line style
    canvas.Stroke(lstyle);
  }

  //Initialize the position y for the cover label
  this.cover.label.posy = this.cover.height - this.cover.draw.margin.bottom + this.cover.label.margin;

  //Initialize the height for the line
  this.cover.hover.height = this.cover.draw.height;

  //Show the region info
  this.CoverTrackBarRegionInfo();
};

//CoverViewer draw label
CoverViewer.prototype.CoverTrackDrawLabel = function(px)
{
  //Get the up layer
	var canvas = this.cover.Layer(1);

	//Clear the canvas
	//canvas.Clear();

  //Save the position x
  var posx = px;

  //Save the position y
  var posy = this.cover.label.posy;

  //Draw the rectangle
  canvas.Rect({
		x: posx - this.cover.label.width/2,
		y: posy,
		width: this.cover.label.width,
		height: this.cover.label.height,
		radius: this.cover.label.radius
	});

  //Set the style
  canvas.Fill(this.cover.label.fill);

  //Show the text
  canvas.Text({
		text: this.cover.hover.position.toString(),
		x: posx,
		y: posy + 2,
		font: this.cover.label.text.font,
		size: this.cover.label.text.size,
		align: this.cover.label.text.align,
		color: this.cover.label.text.color
	});

  //Draw the triangle
  canvas.Polygon([[posx - 6, posy + 2],[posx, posy - 6],[posx + 6, posy + 2]]);

  //Set the style
  canvas.Fill(this.cover.label.fill);
};

//CoverViewer Draw hover line
CoverViewer.prototype.CoverTrackDrawHover = function(px, py)
{
	//Get the up layer
	var canvas = this.cover.Layer(1);

	//Clear the canvas
	canvas.Clear();

	//Reset the circles array
	this.cover.hover.circle = [];

  //Save the position x
  var posx = px;

  //Save the position y
  var posy = py - this.cover.draw.margin.top;

  //Save the real position
  this.cover.hover.position = Math.floor(this.cover.start + posx - this.cover.draw.margin.left);

  //Save the index
  this.cover.hover.positioni = this.DataFindPos(this.cover.hover.position);

  //Draw the line
  canvas.Line([[ posx, this.cover.draw.margin.top], [posx, this.cover.draw.margin.top + this.cover.hover.height]]);

  //Add the style
  canvas.Stroke(this.cover.hover.stroke);

  //Create one circle for each bam file
  for(var i = 0; i < this.bams.num; i++)
  {
    //Create the new object circle
    var circ = {};

    //Calculate the position x
    circ.posx = px;

    //Calculate the position y
    circ.posy = this.cover.height - this.cover.draw.margin.bottom - this.cover.data[this.cover.hover.positioni][i];

    //Set the radius
    canvas.Circle({ x: circ.posx, y: circ.posy, radius: this.cover.hover.radius });

    //Add the style
    canvas.Fill(this.bams.color[i]);

		//Push the circle
    this.cover.hover.circle.push(circ);
  }

  //Draw the cover value
  this.CoverTrackDrawValue(px, py);
};

//CoverViewer Cover Track draw value label
CoverViewer.prototype.CoverTrackDrawValue = function(px, py)
{
	//Get the up layer
	var canvas = this.cover.Layer(1);

  //Check the circles
  for(var i = this.cover.hover.circle.length - 1; i >= 0; i--)
  {
    //Save the difference
    var diff = Math.abs(this.cover.hover.circle[i].posy - py);

    //Check the difference
    if(diff < this.cover.value.mindiff)
    {
      //Save the position x
      var posx = px - this.cover.value.margin;

      //Save the position y
      var posy = this.cover.hover.circle[i].posy - this.cover.value.height/2;

      //Draw the rectangle
      canvas.Rect({
				x: posx - this.cover.value.width,
				y: posy,
				width: this.cover.value.width,
				height: this.cover.value.height,
				radius: this.cover.value.radius,
			});

      //Set the style
      canvas.Fill(this.bams.color[i]);

      //Create the text
      var txt = this.data.cover.data[this.cover.hover.positioni].cover[i].toString();

      //Move the text
      canvas.Text({
				text: txt,
				font: this.cover.value.text.font,
				color: this.cover.value.text.color,
				size: this.cover.value.text.size,
				x: posx - this.cover.value.width/2,
				y: posy - 1,
				align: this.cover.value.text.align
			});

      //Change the positions for the triangle
      posx = posx - 1;
      posy = this.cover.hover.circle[i].posy;

      //Draw the triangle
      canvas.Polygon([[posx,posy-5],[posx+6,posy],[posx,posy+5]]);

      //Set the style
      canvas.Fill(this.bams.color[i]);

      //Exit
      break;
    }
  }
};

//CoverViewer Cover Track mouse move
CoverViewer.prototype.CoverTrackMouseMove = function(x, y)
{
  //Check for move
  if(this.cover.mouse === true)
  {
    //Calculate the difference
    var diff = this.cover.click - x;

    //Calculate the start point
    this.preview.window.start = this.cover.clickstart + diff/this.preview.mult;

    //Draw the region
    this.Move();
  }

  //Check click first
  //if(this.cover.clickfirst === true) { this.cover.clickfirst = false; }

  //Show the hover position
  if(this.cover.draw.margin.left <= x && x <= this.cover.draw.margin.left + this.cover.draw.width)
  {
    //Draw the hover line
    this.CoverTrackDrawHover(x, y);

    //Draw the label
    this.CoverTrackDrawLabel(x);
  }
};

//CoverViewer Cover Track mosue Down event
CoverViewer.prototype.CoverTrackMouseDown = function(x)
{
  //Activate the mouse
  this.cover.mouse = true;

  //Activate the click first
  this.cover.clickfirst = true;

  //Set cursor as move
  $('body').addClass(this.cursor.move);

  //Save the click position
  this.cover.click = x;

  //Save the start position
  this.cover.clickstart = this.preview.window.start;

  //Destroy the genes info
  this.GenesTrackInfoClear();
};

//CoverViewer Cover track mouse up event
CoverViewer.prototype.CoverTrackMouseUp = function(x)
{
  //Set mouse as false
  this.cover.mouse = false;

  //Set default cursor
  $('body').removeClass(this.cursor.move);
};

//CoverViewer Cover Track mouse function event
function CoverViewerCoverTrackMouseEvnt(_main)
{
  //Save the ID
  var _id = '#' + _main.cover.id;

  //Mouse up
  $(_id).mouseup(function(e){

    //Prevent
    e.preventDefault();

    //Call the click handler
    _main.CoverTrackMouseUp(e.pageX - $(this).offset().left);

  });

  //Mouse down
  $(_id).mousedown(function(e){

    //Prevent
    e.preventDefault();

    //Call the click handler
    _main.CoverTrackMouseDown(e.pageX - $(this).offset().left);

  });

  //Mouse move
  $(_id).mousemove(function(e){

    //Prevent
    e.preventDefault();

    //Call the click handler
    _main.CoverTrackMouseMove(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top);

  });
}
