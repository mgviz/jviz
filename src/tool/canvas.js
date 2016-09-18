//Canvas tool
/*
// Arguments:
// opt: an object with the following keys:
// - id: the tool id
// - class: the tool class
// - parent: the parent ID (mandatory)
// - layers: the number of canvas layers (mandatory)
// - width: the tool width
// - height: the tool height
// - margin: an object with the tool margins. Default: { left: 50, right: 50, top: 30, bottom: 30 }
*/
jviz.tool.canvas = function(opt)
{
  //Check the options
  if(typeof opt === 'undefined'){ var opt = {}; }

  //Save the component id
  this._id = (typeof opt.id === 'undefined') ? jviz.utils.getID({ prefix: 'tool-canvas-', length: 5 }) : opt.id;

  //Save the component class name
  this._class = (typeof opt.class === 'undefined') ? 'jviz-tool-canvas' : opt.class;

  //Save the parent element
  this._parent = opt.parent;

  //Object width
  this._width = 0;

  //Object height
  this._height = 0;

  //Canvas object
  this._canvas = {};
  this._canvas.id = this._id + '-canvas'; //Canvas ID
  this._canvas.class = this._class + '-canvas'; //Canvas class

  //Draw object
  this._draw = {};
  this._draw.width = 0; //Draw width
  this._draw.height = 0; //Draw height
  this._draw.margin = { }; //Draw margins

  //Check the margins
  if(typeof opt.margin === 'object'){ opt.margin = {}; }

  //Save margin top
  this._draw.margin.top = (typeof opt.margin.top !== 'undefined') ? parseInt(opt.margin.top) : 30;

  //Set margin bottom
  this._draw.margin.bottom = (typeof opt.margin.bottom !== 'undefined') ? parseInt(opt.margin.bottom) : 30;

  //Set the margin left
  this._draw.margin.left = (typeof opt.margin.left !== 'undefined') ? parseInt(opt.margin.left) : 50;

  //Set the margin right
  this._draw.margin.right = (typeof opt.margin.right !== 'undefined') ? parseInt(opt.margin.right) : 50;

  //Layers elements
  this._layers = {};
  this._layers.num = (typeof opt.layers !== 'undefined') ? parseInt(opt.layers) : 1; //Number of layers
  this._layers.el = []; //Layers elements

  //Build the canvas tool
  this.build();

  //Set the size
  this.setSize(opt);

  //Return this
  return this;
};

//Build the canvas tool
jviz.tool.canvas.prototype.build = function()
{
  //Save this
  var self = this;

  //Add the container
  jviz.dom.append(this._parent, { _tag: 'div', id: this._id, class: this._class });

  //Build the layers
  this.buildLayers();

  //Exit
  return this;
};

//Build the layers
jviz.tool.canvas.prototype.buildLayers = function()
{
  //Clear the container
  jviz.dom.html(this._id, '');

  //Reset the layers
  this._layers.el = [];

  //Build the layers
  for(var i = 0; i < this._layers.num; i++)
  {
    //Generate the layer ID
    var id = this.layerID(i);

    //Add the layer
    jviz.dom.append(this._id, { _tag: 'canvas', id: id, class: this._canvas.class });

    //Initialize the new canvas object
    this._layers.el.push(new cvjs({ id: id, width: this._width, height: this._height }));
  }

  //Exit
  return this;
};

//Set the object size
jviz.tool.canvas.prototype.setSize = function(opt)
{
  //Check the options
  if(typeof opt === 'undefined'){ return this; }

  //Check for adding the width
  if(typeof opt.width !== 'undefined'){ $('#' + this._id).css('width', opt.width); }

  //Check the height
  if(typeof opt.height !== 'undefined'){ $('#' + this._id).css('height', opt.height); }

  //Resize
  this.resize();

  //Exit
  return this;
};

//Get the draw object
jviz.tool.canvas.prototype.draw = function(){ return this._draw; };

//Get the layer
jviz.tool.canvas.prototype.layer = function(index)
{
  //Check the index
  if(typeof index === 'undefined'){ return jviz.console.error('No layer index provided', null); }

  //Parse the index
  index = parseInt(index);

  //Check the index value
  if(index < 0 || index > this._layers.num){ return jviz.console.error('Invalid layer index', null); }

  //Return the layer element
  return this._layers.el(index);
};

//Get the number of layers
jviz.tool.canvas.prototype.layerNum = function()
{
  //Return the layers number
  return this._layers.num;
};

//Get the layer ID
jviz.tool.canvas.prototype.layerID = function(index)
{
  //Build the layer ID
  return this._canvas.id + '-' + index;
};

//Add the height and width attributes
[ 'width', 'height' ].forEach(function(el)
{
  //Add the canvas track feature
  jviz.tool.canvas.prototype[el] = function(value)
  {
    //Check the value
    if(typeof value === 'undefined'){ return this['_' + el]; }

    //Initialize the object
    var obj = {};

    //Add the value
    obj[el] = value;

    //Set the size
    this.setSize(obj);
  };
});

//Resize the tool
jviz.tool.canvas.prototype.resize = function()
{
  //Get the element
  var el = $('#' + this._id);

  //Get the width
  this._width = el.css('width');

  //Get the height
  this._height = el.css('height');

  //Read all the canvas layers
  for(var i = 0; i < this._layers.num; i++)
  {
    //Update the width
    this._layers.el[i].Width(this._width);

    //Update the height
    this._layers.el[i].Height(this._height);
  }

  //Update the draw width
  this._draw.width = Math.max(0, this._width - this._draw.margin.left - this._draw.margin.right);

  //Update the draw height
  this._draw.height = Math.max(0, this._height - this._draw.margin.top - this._draw.margin.bottom);
};

//Send the mouse down event
jviz.tool.canvas.prototype.onMouseDown = function(e, x, y)
{
  //Prevent default
  e.preventDefault();

  //Send the click event
  this.emit('mouse:down', x, y);
};

//Send the mouse up event
jviz.tool.canvas.prototype.onMouseUp = function(e, x, y)
{
  //Prevent default
  e.preventDefault();

  //Send the mouse up event
  this.emit('mouse:up', x, y);
};

