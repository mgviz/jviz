//jvizAlert main class
jviz.components.alert = function(opt)
{
  //Check the options
  if(typeof opt === 'undefined'){ var opt = {}; }

  //Save the alert ID
  this.id = (typeof opt.id === 'undefined') ? jviz.utils.getID({ preffix: 'alert-', length: 5 }) : opt.id;

  //Save the alert class
  this.class = (typeof opt.class === 'undefined') ? 'jviz-components-alert' : opt.class;

  //Save the parent
  this.parent = opt.parent;

  //Open class
  this.open = this.class + '-open';

  //Alert types
  this.type = {};
  this.type.done = this.class + '-done'; //Done alert
  this.type.error = this.class + '-error'; //Error alert
  this.type.warning = this.class + '-warning'; //Warning alert
  this.type.tip = this.class + '-tip'; //Tip alert

  //Text
  this.text = {};
  this.text.id = this.id + '-text'; //Text ID
  this.text.class = this.class + '-text'; //Text class

  //Alert active
  this.active = false;

  //Time out
  this.timeOut = null;

  //Default values
  this.default = {};
  this.default.time = 3000; //Default active time

  //Build the alert
  this.build();

  //Return
  return this;
};

//jviz alert build
jviz.components.alert.prototype.build = function()
{
  //Create the alert div
  jviz.dom.append(this.parent, { _tag: 'div', id: this.id, class: this.class, style: '' });

  //Add the text div
  jviz.dom.append(this.id, { _tag: 'div', id: this.text.id, class: this.text.class });
};

//jviz alert done alert
jviz.components.alert.prototype.done = function(obj)
{
  //Create the alert
  this.create('done', obj);
};

//jviz alert error alert
jviz.components.alert.prototype.error = function(obj)
{
  //Create the alert
  this.create('error', obj);
};

//jviz alert warning alert
jviz.components.alert.prototype.warning = function(obj)
{
  //Create the alert
  this.create('warning', obj);
};

//jviz alert tip alert
jviz.components.alert.prototype.tip = function(obj)
{
  //Create the alert
  this.create('tip', obj);
};

//jviz alert create
jviz.components.alert.prototype.create = function(type, obj)
{
  //Check the obj
  if(typeof obj === 'undefined'){ return; }

  //Check for string
  if(typeof obj === 'string'){ obj = { text: obj }; }

  //Check for empty text
  if(typeof obj.text === 'undefined'){ return; }

  //Check the active
  if(this.active === true){ return; }

  //Parse the time
  obj.time = (typeof obj.time === 'undefined') ? this.default.time : parseInt(obj.time);

  //Reset the style
  this.reset();

  //Add the alert style
  $('#' + this.id).addClass(this.type[type]);

  //Add the text
  $('#' + this.text.id).html(obj.text);

  //Add the open class
  $('#' + this.id).addClass(this.open);

  //Save this
  var self = this;

  //Save the time out
  self.timeOut = setTimeout(function(){ self.timeOut = null; self.hide(); }, obj.time);

  //Set active as true
  this.active = true;
};

//jviz alert Reset
jviz.components.alert.prototype.reset = function()
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

//jviz alert clear
jviz.components.alert.prototype.hide = function()
{
  //Set active as false
  this.active = false;

  //Check for clear the time out
  if(this.timeOut){ clearTimeout(this.timeOut); }

  //Remove the open class
  $('#' + this.id).removeClass(this.open);
};
