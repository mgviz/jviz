//Use Genes Track
CoverViewer.prototype.GenesTrack = function(opt)
{

};

//CoverViewer genes track mouse Init
CoverViewer.prototype.GenesTrackMouseEvnt = function()
{
  //Call the Mouse event
  CoverViewerGenesTrackMouseEvnt(this);
}

//CoverViewer Genes Track Show specie info
CoverViewer.prototype.GenesTrackBarSpecieInfo = function()
{
  //Generate the region
  var spe = this.data.genes.data.specie + ' (' + this.data.genes.data.assembly + ')';

  //Show in the bar
  this.genes.SetTitle(this.genes.title, spe);
};

//CoverViewer Genes Track height
CoverViewer.prototype.GenesTrackHeight = function()
{
  //Number of genes in the sale block
  var count = 0, countmax = 0;

  //For get the end point
  var endp = 0;

  //Loop for read all genes
  for(var i = 0; i < this.data.genes.data.genes.length; i++)
  {
    //Get the gene
    var g = this.data.genes.data.genes[i];

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
    this.data.genes.data.genes[i].count = count;

    //Increement the counter
    count = count + 1;
  }

  //Save the count max
  countmax = Math.max(countmax, count);

  //Calculate the genes block total
  this.genes.el.block = this.genes.el.margin + this.genes.el.rect + this.genes.el.text;

  //Check for add the exons track
  if(this.data.exons.use === true)
  {
    //Add the exons track
    this.genes.el.block = this.genes.el.block + this.genes.el.exon;

    //Check for add the text to the exon
    if(this.exons.showtext === true)
    {
      //Add the text space
      this.genes.el.block = this.genes.el.block + this.genes.el.text
    }
  }

  //Required height
  var req = Math.max(this.genes.minheight, countmax*this.genes.el.block);

  //Calculate the new height
  this.genes.height = req + this.genes.draw.margin.top + this.genes.draw.margin.bottom;

  //Resize the track
	this.genes.Resize();
};

//CoverViewer Genes Track strand check
CoverViewer.prototype.GenesTrackStrandCheck = function()
{
  //Read all genes
  for(var i = 0; i < this.data.genes.data.genes.length; i++)
  {
    //Save
    var g = this.data.genes.data.genes[i];

    //Check for positive strand
    if(g.strand === '1' || g.strand === 1 || g.strand === '+')
    {
      //Save as positive
      this.data.genes.data.genes[i].strand = this.strand.forward.id;

      //Save the strand index for styles
      this.data.genes.data.genes[i].strandindex = this.strand.forward.index;
    }
    else if(g.strand === '-1' || g.strand === -1 || g.strand === '-')
    {
      //Save as negative
      this.data.genes.data.genes[i].strand = this.strand.reverse.id;

      //Save the strand index for styles
      this.data.genes.data.genes[i].strandindex = this.strand.reverse.index;
    }
    else
    {
      //Show error
      console.error('CoverViewer: unknow strand "' + g.strand + '"');
    }
  }
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

  //Calculate the draw width
  this.genes.draw.width = this.genes.width - this.genes.draw.margin.left - this.genes.draw.margin.right;

  //Calculate the draw height
  this.genes.draw.height = this.genes.height - this.genes.draw.margin.top - this.genes.draw.margin.bottom;

  //Save the start position
  this.genes.start = this.cover.start;

  //Save the end position
  this.genes.end = this.cover.end;

  //Save the genes length
  this.genes.length = this.cover.length;

	//Draw the control points
	this.PointsDraw(canvas, this.genes.start, this.genes.end, this.genes.height, this.genes.draw.margin);

	//Reset the genes list
	this.genes.list = [];

  //Read all genes
  for(var i = 0; i < this.data.genes.data.genes.length; i++)
  {
    //Save the gene
    var g = this.data.genes.data.genes[i];

    //Check for the region
    if(g.start <= this.genes.end && this.genes.start <= g.end)
    {
      //Selected gene, draw
      var obj = {};

      //Save the gene index
      obj.index = i;

      //Position x1
      obj.posx1 = this.genes.draw.margin.left + Math.max(0, g.start - this.genes.start);

      //Position x2
      obj.posx2 = Math.max(0, Math.min(this.genes.draw.width, g.end - this.genes.start));
      obj.posx2 = obj.posx2 + this.genes.draw.margin.left;

      //Length
      obj.length = Math.max(0, obj.posx2 - obj.posx1);

      //Position y
      obj.posy = this.genes.draw.margin.top + g.count*this.genes.el.block;

      //Draw the rectangle
      canvas.Rect({ x: obj.posx1, y: obj.posy, width: obj.length, height: this.genes.el.rect });

      //Add the rectangle fill
      canvas.Fill(this.strand.color[g.strandindex]);

      //Create the text
      canvas.Text({
				text: this.strand.dir[g.strandindex] + this.GenesTrackLabel(g),
				x: obj.posx1,
				y: obj.posy + this.genes.el.rect,
				font: this.strand.text.font,
				size: this.strand.text.size,
				color: this.strand.color[g.strandindex]
			});

      //Read all the exons for this gene
      for(var j = 0; j < this.data.exons.data[i].length; j++)
      {
        //Save the exon
        var e = this.data.exons.data[i][j];

        //Check for the region
        if(e.start <= this.genes.end && this.genes.start <= e.end)
        {
          //Create the new exon
          var ex = {};

          //Position x1
          ex.posx1 = this.genes.draw.margin.left + Math.max(0, e.start - this.genes.start);

          //Position x2
          ex.posx2 = Math.max(0, Math.min(this.genes.draw.width, e.end - this.genes.start));
          ex.posx2 = ex.posx2 + this.genes.draw.margin.left;

          //Length
          ex.length = Math.max(0, ex.posx2 - ex.posx1);

          //Position y
          ex.posy = this.genes.draw.margin.top + g.count*this.genes.el.block + this.genes.el.rect + this.genes.el.text;

          //Draw the rectangle
        	canvas.Rect({ x: ex.posx1, y: ex.posy, width: ex.length, height: this.genes.el.exon });

          //Add the rectangle color
          canvas.Fill(this.exons.color[g.strandindex]);
        }
      }

      //Check for add the exons lines
      if(this.data.exons.use === true)
      {
        //Get the position y
        var py = obj.posy + 3*this.genes.el.rect/2 + this.genes.el.text;

        //Add the line between the exons
        canvas.Line([[obj.posx1, py], [obj.posx2, py]]);

        //Add the color
        canvas.Stroke(this.exons.color[g.strandindex]);
      }

      //Push
      this.genes.list.push(obj);
    }
  }

  //Clear the margin right
  canvas.Clear({ x: this.genes.width - this.genes.draw.margin.right, y: 0, width: this.genes.draw.margin.right, height: this.genes.height });

  //Show the specie info
  this.GenesTrackBarSpecieInfo();
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
    this.preview.window.start = this.genes.clickstart + diff/this.preview.mult;

    //Draw the region
    this.Move();
  }
};

//CoverViewer Genes Track mosue Down event
CoverViewer.prototype.GenesTrackMouseDown = function(x, y)
{
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
  //Set mouse as false
  this.genes.mouse = false;

  //Set default cursor
  $('body').removeClass(this.cursor.move);
};

//CoverViewer Genes Track mouse function event
function CoverViewerGenesTrackMouseEvnt(_main)
{
  //Save the ID
  var _id = '#' + _main.genes.id;

  //Mouse up
  $(_id).mouseup(function(e){

    //Prevent
    e.preventDefault();

    //Call the click handler
    _main.GenesTrackMouseUp(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top);

  });

  //Mouse down
  $(_id).mousedown(function(e){

    //Prevent
    e.preventDefault();

    //Call the click handler
    _main.GenesTrackMouseDown(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top);

  });

  //Mouse move
  $(_id).mousemove(function(e){

    //Prevent
    e.preventDefault();

    //Call the click handler
    _main.GenesTrackMouseMove(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top);

  });
}
