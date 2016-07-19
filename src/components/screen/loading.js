//jviz Screen loading
jviz.ui.screen.loading = function(opt)
{
  //Check the optons
  if(typeof opt === 'undefined'){ var opt = {}; }

  //Save the new object ID
  this.id = (typeof opt.id === 'undefined') ? jviz.utils.getID({ prefix: 'jviz-ui-screen-loading-', length: 5 }) : opt.id;

  //Save the object class
  this.class = (typeof opt.class === 'undefined') ? 'jviz-ui-screen-loading' : opt.class;

  //Active
  this.active = false;

  //Screen container
  this.screen = {};
  this.screen.id = this.id + '-screen'; //Screen ID
  this.screen.class = this.class + '-screen'; //Screen class

  //Animation
  this.animation = {};
  this.animation.id = this.id + '-animation'; //Animation ID
  this.animation.class = this.class + '-animation'; //Animation class

  //Text
  this.text = {};
  this.text.id = this.id + '-text'; //Text ID
  this.text.class = this.class + '-text'; //Text class
  this.text.text = ''; //Text

  //Return the element
  return this;
}

//jviz screen loading build
jviz.ui.screen.loading.prototype.build = function(parent)
{
  //Initialize the loading div
  jviz.dom.append({ type: 'div', id: this.id, class: this.class, style: 'display:none;' }, parent);

  //Add the screen
  jviz.dom.append({ type: 'div', id: this.screen.id, class: this.screen.class }, this.id);

  //Add the animation
  jviz.dom.append({ type: 'div', id: this.animation.id, class: this.animation.class }, this.screen.id);

  //Add the text div
  jviz.dom.append({ type: 'div', id: this.text.id, class: this.text.class, align: 'center' }, this.screen.id);
};

//jviz screen loading set text
jviz.ui.screen.loading.prototype.setText = function(text)
{
  //Save the text
  this.text.text = text;
};

//jviz screen loading open
jviz.ui.screen.loading.prototype.open = function()
{
  //Check for active
  if(this.active === true){ return; }

  //Show the screen
  $('#' + this.id).css('display', 'block');

  //Add the text
  $('#' + this.text.id).html(this.text.text);

  //Set active as true
  this.active = true;
};

//jviz screen loading close
jviz.ui.screen.loading.prototype.close = function()
{
  //Check for active
  if(this.active === false){ return; }

  //Hide the screen
  $('#' + this.id).css('display', 'none');

  //Set active as false
  this.active = false;
};

//jviz screen loading show alias
jviz.ui.screen.loading.prototype.show = function(){ this.open(); };

//jviz screen loading hide alias
jviz.ui.screen.loading.prototype.hide = function(){ this.close(); };
