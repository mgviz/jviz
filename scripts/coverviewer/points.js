//CoverViewer Control Points get near point
CoverViewer.prototype.PointsNear = function(p)
{
  //Get the real point
  return Math.floor(p/this.points.gap);
};

//CoverViewer draw control points
CoverViewer.prototype.PointsDraw = function(canvas, start, end, height, margin)
{
  //Get the start point
  var pstart = this.PointsNear(start) + 1;

  //Loop
  for(var i = pstart; i*this.points.gap <= end; i++)
  {
    //Get the value
    var value = i*this.points.gap;

    //Create the new line
    var obj = {};

    //Posx
    obj.posx = margin.left + (value - start);

    //Posy
    obj.posy = height - this.points.margin;

    //Generate the line
    canvas.Line([[obj.posx, margin.top], [obj.posx, obj.posy]]);

    //Add the line style
    canvas.Stroke(this.points.stroke);

    //Add the text position
    this.points.text.x = obj.posx + this.points.textmargin.left;
    this.points.text.y = obj.posy - this.points.textmargin.top;

    //Add the text value
    this.points.text.text = value + this.points.letter;

    //Add the text
    canvas.Text(this.points.text);
  }
};
