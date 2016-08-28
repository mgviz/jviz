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

  //Description
  this.description = {};
  this.description.id = this.id + '-description'; //Description ID
  this.description.class = this.class + '-description'; //Description class
  this.description.text = (typeof opt.description !== 'undefined') ? opt.description : '';

  //Color
  this.color = {};
  this.color.white = this.class + '-color-white'; //White color
  this.color.navy = this.class + '-color-navy'; //Navy color

  //Background colors
  this.bg = [ 'navy', 'red', 'blue', 'green', 'purple', 'pink', 'orange', 'white', 'grey' ];

  //Build the loading
  this.build();

  //Set the color
  this.setColor(opt.color);

  //Set the background
  this.setBg(opt.bg);

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
  jviz.dom.append({ _tag: 'div', id: this.title.id, class: this.title.class, align: 'center' }, this.id);

  //Add the description div
  jviz.dom.append({ _tag: 'div', id: this.description.id, class: this.description.class, align: 'center' }, this.id);

  //Add the title
  jviz.dom.html(this.title.text, this.title.id);

  //Add the description
  jviz.dom.html(this.description.text, this.description.id);
};

//jviz screen loading set text
jviz.components.loading.prototype.setTitle = function(text)
{
  //Update the title text
  jviz.dom.html(text, this.title.id);
};

//jviz loading set description
jviz.components.loading.prototype.setDescription = function(text)
{
  //Update the description text
  jviz.dom.html(text, this.description.id);
}

//Set the color
jviz.components.loading.prototype.setColor = function(color)
{
  //Check the color
  if(typeof color === 'undefined'){ var color = 'white'; }

  //Check the color
  if(typeof this.color[color] === 'undefined'){ return; }

  //Remove the colors
  $('#' + this.id).removeClass(this.color.white).removeClass(this.color.navy);

  //Add the new color
  $('#' + this.id).addClass(this.color[color]);
};

//Set the background color
jviz.components.loading.prototype.setBg = function(color)
{
  //Check the color
  if(typeof color === 'undefined'){ var color = 'navy'; }

  //Check the background color
  if(this.bg.indexOf(color) === -1){ return; }

  //Remove all the colors
  this.bg.forEach(function(el){ $('#' + this.id).removeClass(this.class + '-' + el); });

  //Add the new color
  $('#' + this.id).addClass(this.class + '-' + color);
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
