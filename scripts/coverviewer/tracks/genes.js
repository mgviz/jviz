//CoverViewer Genes Track Clear
CoverViewer.prototype.GenesTrackClear = function()
{
  //Clear the first layer
  this.genes.Layer(0).Clear();
};

//CoverViewer Genes Track Draw no genes
CoverViewer.prototype.GenesTrackDrawNoGenes = function()
{
  //Clean the track
  this.GenesTrackClear();

  //Get the new track size
  this.genes.height = this.genes.draw.margin.top + this.genes.draw.margin.bottom + this.genes.nogenes.height;

	//Resize the track
	this.genes.Resize();

  //Get the canvas
  var canvas = this.genes.Layer(0);

  //Get the rectangle position x
  var rect_x = this.genes.width/2 - this.genes.nogenes.width/2;

  //Get the rectangle position y
  var rect_y = this.genes.height/2 - this.genes.nogenes.height/2;

  //Get the rectangle width
  var rect_width = this.genes.nogenes.width;

  //Get the rectangle height
  var rect_height = this.genes.nogenes.height;

  //Get the rectangle radius
  var rect_radius = this.genes.nogenes.radius;

  //Draw the rectangle
  canvas.Rect({ x: rect_x, y: rect_y, width: rect_width, height: rect_height, radius: rect_radius });

  //Draw the rectangle fill color
  canvas.Fill(this.genes.nogenes.color);

  //Get the no cover title text
  var tit_text = this.genes.nogenes.title.text;

  //Calculate the no cover title position x
  var tit_x = this.genes.width/2;

  //Get the no cover title position y
  var tit_y = this.genes.height/2 - this.genes.nogenes.height/2 + this.genes.nogenes.title.posy;

  //Get the title color
  var tit_color = this.genes.nogenes.title.color;

  //Get the title font
  var tit_font = this.genes.nogenes.title.font;

  //Get the title size
  var tit_size = this.genes.nogenes.title.size;

  //Get the tittle align
  var tit_align = this.genes.nogenes.title.align;

  //Draw the title
  canvas.Text({ x: tit_x, y: tit_y, text: tit_text, font: tit_font, size: tit_size, color: tit_color, align: tit_align });
};

//CoverViewer Genes Track Show specie info
CoverViewer.prototype.GenesTrackTitle = function()
{
  //Show the title
  this.genes.SetTitle(this.genes.title);

  //Show the subtitle
  this.genes.SetSubtitle(this.data.specie + ' (' + this.data.assembly + ')');
};

//CoverViewer Genes Track Title Reset
CoverViewer.prototype.GenesTrackTitleReset = function()
{
  //Show the title
  this.genes.SetTitle(this.genes.title);

  //Show the subtitle
  this.genes.SetSubtitle('');
};

//CoverViewer Genes Track height
CoverViewer.prototype.GenesTrackHeight = function()
{
  //Number of genes in the sale block
  var count = 0, countmax = 1;

  //For get the end point
  var endp = 0;

  //Loop for read all genes
  for(var i = 0; i < this.data.genes.list.length; i++)
  {
    //Get the gene
    var g = this.data.genes.list[i];

    //Check
    if(g.start >= endp)
    {
      //Save the count max
      countmax = Math.max(countmax, count);

      //Restart the count
      count = 0;
    }

    //Set the new end position
    endp = Math.max(endp, g.end);

    //Save the count
    this.data.genes.list[i].chunk = count;

    //Increment the counter
    count = count + 1;
  }

  //Save the count max
  countmax = Math.max(countmax, count);

  //Set the number of blocks
  this.genes.SetChunks(countmax);
};

//CoverViewer Genes Track Label
CoverViewer.prototype.GenesTrackLabel = function(g)
{
  //Check the custom function
  if(this.data.genes.label)
  {
    //Return the custom label
    return this.data.genes.label(g);
  }

  //Default value
  return g.name;
};

//CoverViewer Genes track draw
CoverViewer.prototype.GenesTrackDraw = function()
{
  //Get the canvas down layer
	var canvas = this.genes.Layer(0);

	//Clear the canvas
	canvas.Clear();

  //Save the position
  this.genes.SetPosition(this.cover.draw.start, this.cover.draw.end);

	//Draw the control points
	this.PointsDraw(canvas, this.genes.draw.start, this.genes.draw.end, this.genes.height, this.genes.draw.margin);

	//Reset the genes list
	this.genes.list = [];

  //Read all genes
  for(var i = 0; i < this.data.genes.list.length; i++)
  {
    //Save the gene
    var g = this.data.genes.list[i];

    //Check for the region
    if(this.genes.draw.end <= g.start || g.end < this.genes.draw.start){ continue; }

    //Get the color
    var color = (jvizFeatureStrand(g.strand) === '<') ? this.strand.reverse.color : this.strand.forward.color;

    //Draw the gene
    this.genes.DrawFeature(canvas, g, color);
  }

  //Clear position x
  var clear_x = this.genes.width - this.genes.draw.margin.right;

  //Clear position y
  var clear_y = 0;

  //Clear width
  var clear_width = this.genes.draw.margin.right;

  //Clear height
  var clear_height = this.genes.height;

  //Clear the margin right
  canvas.Clear({ x: clear_x, y: clear_y, width: clear_width, height: clear_height });
};

//CoverViewer Genes track info build
CoverViewer.prototype.GenesTrackInfoBuild = function()
{
	//Build the genes box div
  return '<div id="' + this.genes.box.id + '"></div>';
};

//CoverViewer Genes Track Create Info
CoverViewer.prototype.GenesTrackInfo = function(index, px, py)
{
  //Get the gene
  var g = this.genes.list[index];

  //Restart the position x
  px = px - this.genes.info.width/2 - this.genes.info.padding;

  //Restart the position y
  //py = py + 10;
  py = g.posy + 2*this.genes.el.rect;

  //Create the new label
  var div = '<div class="' + this.genes.info.class + '" style="';

  //Add the style
  div = div + 'width:' + this.genes.info.width + ';left:' + px + ';top:' + py + ';';
  div = div + 'padding:' + this.genes.info.padding + 'px;';

  //Close the div
  div = div + '">';

  //Add the content
  div = div + this.GenesTackInfoContent(this.data.genes.data.genes[g.index]);

  //Finish the div
  div = div + '</div>';

  //Show
  $('#' + this.genes.box.id).html(div);
};

//CoverViewer Genes Track Info Content
CoverViewer.prototype.GenesTackInfoContent = function(g)
{
  //Output content
  var content = '<b>';

  //Check the title
  if(this.data.genes.info.title)
  {
    //Generate the custom title
    content = content + this.data.genes.info.title(g);
  }
  else
  {
    //Generate the default title
    content = content + g.name;
  }

  //End the title
  content = content + '</b><hr>';

  //Add the content
  if(this.data.genes.info.content)
  {
    //Generate the custom title
    content = content + this.data.genes.info.content(g);
  }
  else
  {
    //Check for the ensembl
    if(typeof g.ensemblId !== 'undefined')
    {
      //Show the ensembl info
      content = content + 'EnsemblID: ' + EnsemblAdapter.LinkTo(g.ensemblId) + '<br>';
    }

    //Show the gene start and end
    content = content + 'Start-End: ' + g.start + '-' + g.end + '<br>';

    //Show the strand
    content = content + 'Strand: ' + g.strand;
  }

  //Return the content
  return content;
};

//CoverViewer Genes Track Info Clear
CoverViewer.prototype.GenesTrackInfoClear = function()
{
  //Destroy the labek
  $('#' + this.genes.box.id).html('');
};

//CoverViewer Genes Track mouse move
CoverViewer.prototype.GenesTrackMouseMove = function(x, y)
{
  //Check for move
  if(this.genes.mouse === true)
  {
    //Calculate the difference
    var diff = this.genes.click - x;

    //Calculate the start point
    this.preview.window.start = this.genes.clickstart + diff/this.preview.draw.scale;

    //Draw the region
    this.Move();
  }
};

//CoverViewer Genes Track mosue Down event
CoverViewer.prototype.GenesTrackMouseDown = function(x, y)
{
  //Check the status
  if(this.draw.status !== 'cover'){ return; }

  //Destroy the genes info
  this.GenesTrackInfoClear();

  //Activate the mouse
  this.genes.mouse = true;

  //Activate the click first
  this.genes.clickfirst = true;

  //Set cursor as move
  $('body').addClass(this.cursor.move);

  //Save the click position
  this.genes.click = x;

  //Save the start position
  this.genes.clickstart = this.preview.window.start;

  //Find for genes
  for(var i = 0; i < this.genes.list.length; i++)
  {
    //Save the gene
    var g = this.genes.list[i];

    //Checkthe position y
    if( g.posy <= y && y <= g.posy + this.genes.el.rect)
    {
      //Check position x
      if(g.posx1 <= x && x <= g.posx2)
      {
        //Show the info
        this.GenesTrackInfo(i, x, y);

        //Exit Loop
        break;
      }
    }
  }
};

//CoverViewer Genes track mouse up event
CoverViewer.prototype.GenesTrackMouseUp = function(x, y)
{
  //Check the status
  if(this.draw.status !== 'cover'){ return; }

  //Set mouse as false
  this.genes.mouse = false;

  //Set default cursor
  $('body').removeClass(this.cursor.move);
};

//CoverViewer Genes Track mouse function event
function CoverViewerGenesTrackEvents(_this)
{
  //Save the ID
  var _id = '#' + _this.genes.id;

  //Mouse up
  $(_id).mouseup(function(e){

    //Prevent
    e.preventDefault();

    //Call the click handler
    _this.GenesTrackMouseUp(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top);

  });

  //Mouse down
  $(_id).mousedown(function(e){

    //Prevent
    e.preventDefault();

    //Call the click handler
    _this.GenesTrackMouseDown(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top);

  });

  //Mouse move
  $(_id).mousemove(function(e){

    //Prevent
    e.preventDefault();

    //Call the click handler
    _this.GenesTrackMouseMove(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top);

  });
}
