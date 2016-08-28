//jviz Screen loading
jviz.components.loading = function(opt)
{
  //Check the optons
  if(typeof opt === 'undefined'){ var opt = {}; }

  //Save the new object ID
  this.id = (typeof opt.id === 'undefined') ? jviz.utils.getID({ prefix: 'loading-', length: 5 }) : opt.id;

  //Save the object class
  this.class = (typeof opt.class === 'undefined') ? 'jviz-components-loading' : opt.class;

  //Save the parent
  this.parent = opt.parent;

  //Animation
  this.animation = {};
  this.animation.id = this.id + '-animation'; //Animation ID
  this.animation.class = this.class + '-animation'; //Animation class

  //Title
  this.title = {};
  this.title.id = this.id + '-title'; //Title ID
  this.title.class = this.class + '-title'; //Title class
  this.title.text = (typeof opt.title !== 'undefined') ? opt.title : '';

  //Build the loading
  this.build();

  //Initialize the color object
  var color = { };

  //Add the background color
  color.bg = (typeof opt.bgColor !== 'undefined') ? 'navy' : opt.bgColor;

  //Add the animation color
  color.animation = (typeof opt.animationColor !== 'undefined') ? 'white' : opt.animationColor;

  //Add the title color
  color.title = (typeof opt.titleColor !== 'undefined') ? 'white' : opt.titleColor;

  //Add the colors
  this.setColor(color);

  //Return the element
  return this;
};

//jviz screen loading build
jviz.components.loading.prototype.build = function()
{
  //Initialize the loading div
  jviz.dom.append({ _tag: 'div', id: this.id, class: this.class, style: 'display:none;' }, this.parent);

  //Add the animation
  jviz.dom.append({ _tag: 'div', id: this.animation.id, class: this.animation.class }, this.id);

  //Add the title div
  jviz.dom.append({ _tag: 'div', id: this.title.id, class: this.title.class, align: 'center', _html: this.title.text }, this.id);
};

//jviz screen loading set text
jviz.components.loading.prototype.setTitle = function(text)
{
  //Add the text
  $('#' + this.title.id).html(text);
};

//Set the color
jviz.components.loading.prototype.setColor = function(obj)
{
  //Check for undefined color object
  if(typeof obj === 'undefined'){ return; }

  //Check for string
  if(typeof obj === 'string'){ obj = { bg: obj }; }

  //Check the background color
  if(typeof obj.bg !== 'undefined'){ this.bgColor(obj.bg); }

  //Check the animation color
  if(typeof obj.animation !== 'undefined'){ this.animationColor(obj.animation); }

  //Check the title color
  if(typeof obj.title !== 'undefined'){ this.titleColor(obj.title); }
};

//Update the background color
jviz.components.loading.prototype.bgColor = function(color)
{
  //Update the background color
  $('#' + this.id).removeClass().addClass(this.class + ' ' this.class + '-' + color);
};

//Update the animation color
jviz.components.loading.prototype.animationColor = function(color)
{
  //Remove all classes and add the new classes
  $('#' + this.animation.id).removeClass().addClass(this.animation.class + ' ' this.animation.class + '-' + color);
};

//Update the title color
jviz.components.loading.prototype.titleColor = function(color)
{
  //Remove all classes and add the new classes
  $('#' + this.title.id).removeClass().addClass(this.title.class + ' ' this.title.class + '-' + color);
};

//jviz screen loading open
jviz.components.loading.prototype.open = function()
{
  //Show the screen
  $('#' + this.id).css('display', 'block');
};

//jviz screen loading close
jviz.components.loading.prototype.close = function()
{
  //Hide the screen
  $('#' + this.id).css('display', 'none');
};

//jviz screen loading show alias
jviz.components.loading.prototype.show = function(){ return this.open(); };

//jviz screen loading hide alias
jviz.components.loading.prototype.hide = function(){ return this.close(); };
