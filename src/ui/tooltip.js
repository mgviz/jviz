//jvizToolTip class
jviz.ui.toolTip = function(opt)
{
  //Check the options
  if(typeof opt === 'undefined'){ var opt = {}; }

  //Save the ID
  this.id = (typeof opt.id === 'undefined') ? jviz.utils.getID({ prefix: 'jviz-tooltip-', length: 5 }) : opt.id;

  //Save the class
  this.class = (typeof opt.class === 'undefined') ? 'jviz-ui-tooltip' : opt.class;

  //Save the width
  this.width = (typeof opt.width === 'undefined') ? 200 : opt.width;

  //Other configurations
  this.height = 0; //height
  this.posx = 0; //Position x
  this.posy = 0; //Position y
  this.margin = { top: 6, bottom: 0, left: 0, right: 0 }; //Margin

  //Triangle
  this.triangle = {};
  this.triangle.id = this.id + '-triangle'; //Triangle ID
  this.triangle.class = this.class + '-triangle'; //Triangle class
  this.triangle.width = 0; //Triangle width
  this.triangle.height = 6; //Triangle height
  this.triangle.posx = 0; //Triangle position x
  this.triangle.posy = 0; //Triangle position y

  //Content
  this.content = {};
  this.content.id = this.id + '-content'; //Content ID
  this.content.class = this.class + '-content'; //Content class

  //Return
  return this;
};

//jvizToolTip Build
jviz.ui.toolTip.prototype.build = function(parent)
{
  //Create the new div
  jviz.dom.append({ type: 'div', id: this.id, class: this.class }, parent);

  //Add the triangle div
  jviz.dom.append({ type: 'div', id: this.triangle.id, class: this.triangle.class }, this.id);

  //Add the content div
  jviz.dom.append({ type: 'div', id: this.content.id, class: this.content.class }, this.id);

  //Set display as none
  $('#' + this.id).css('display', 'none');
};

//jvizToolTip Set content
jviz.ui.toolTip.prototype.setContent = function(content)
{
  //Set the content
  $('#' + this.content.id).html(content);
};

//jvizToolTip set position
jviz.ui.toolTip.prototype.setPosition = function(posx, posy)
{
  //Save the position x
  this.posx = posx;

  //Save the position y
  this.posy = posy;
};

//jvizToolTip set width
jviz.ui.toolTip.prototype.setWidth = function(w)
{
  //Save the width
  this.width = parseInt(w);
};

//jvizToolTip Show
jviz.ui.toolTip.prototype.show = function()
{
  //Set the position x
  $('#' + this.id).css('top', this.posy + this.margin.top);

  //Set the position y
  $('#' + this.id).css('left', this.posx - this.width/2);

  //Set the width
  $('#' + this.id).width(this.width);

  //Update the triangle position left
  $('#' + this.triangle.id).css('left', this.width/2 - this.triangle.width/2);

  //Show the tooltip
  $('#' + this.id).css('display', 'block');
};

//jvizToolTip Hide
jviz.ui.toolTip.prototype.hide = function()
{
  //Hide the tooltip
  $('#' + this.id).css('display', 'none');
};
