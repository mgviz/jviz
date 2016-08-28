//jvizz message component
jviz.components.message = function(opt)
{
  //Check the options
  if(typeof opt === 'undefined'){ var opt = {}; }

  //Save the message ID
  this.id = (typeof opt.id === 'undefined') ? jviz.utils.getID({ preffix: 'message-', length: 5 }) : opt.id;

  //Save the message class
  this.class = (typeof opt.class === 'undefined') ? 'jviz-components-message' : opt.class;

  //Save the parent
  this.parent = opt.parent;

  //Hide class
  this.hide_class = this.class + '-hide';

  //Message type
  this.type = {};
  this.type.done = this.class + '-done'; //Done message
  this.type.error = this.class + '-error'; //Error message
  this.type.warning = this.class + '-warning'; //Warning message
  this.type.tip = this.class + '-tip'; //Tip message

  //Build the message
  this.build();

  //Return
  return this;
};

//jviz message build
jviz.components.message.prototype.build = function()
{
  //Create the message div
  jviz.dom.append({ _tag: 'div', id: this.id, class: this.class, style: '' }, this.parent);
};

//jviz message done alert
jviz.components.message.prototype.done = function(text){ this.create('done', text); };

//jviz message error alert
jviz.components.message.prototype.error = function(text){ this.create('error', text); };

//jviz message warning alert
jviz.components.message.prototype.warning = function(text){ this.create('warning', text); };

//jviz message tip alert
jviz.components.message.prototype.tip = function(text){ this.create('tip', text); };

//jviz message create
jviz.components.message.prototype.create = function(type, text)
{
  //Check for empty text
  if(typeof text === 'undefined'){ return; }

  //Reset the style
  this.reset();

  //Add the alert style
  $('#' + this.id).addClass(this.type[type]);

  //Add the text
  $('#' + this.id).html(text);

  //Show
  this.show();
};

//jviz message Reset
jviz.components.message.prototype.reset = function()
{
  //Remove the done class
  $('#' + this.id).removeClass(this.type.done);

  //Remove the warning class
  $('#' + this.id).removeClass(this.type.warning);

  //Remove the error class
  $('#' + this.id).removeClass(this.type.error);

  //Remove the tip class
  $('#' + this.id).removeClass(this.type.tip);
};

//jviz message show
jviz.components.message.prototype.show = function()
{
  //Remove the hide class
  $('#' + this.id).removeClass(this.hide_class);
};

//jviz message hide
jviz.components.message.prototype.hide = function()
{
  //Add the hide class
  $('#' + this.id).addClass(this.hide_class);
};
