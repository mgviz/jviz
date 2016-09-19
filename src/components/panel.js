//Panel component
jviz.components.panel = function(opt)
{
  //Check the options
  if(typeof opt === 'undefined'){ var opt = {}; }

  //Save the panel ID
  this._id = (typeof opt.id === 'undefined') ? jviz.utils.genID({ prefix: 'tool-panel', length: 5 }) : opt.id;

  //Save the panel class
  this._class = (typeof opt.class === 'undefined') ? 'jviz-tool-panel' : opt.class;

  //Save the panel parent
  this._parent = opt.parent;

  //Build the panel
  this.build();

  //Return this
  return this;
};

//Build the panel
jviz.components.panel.prototype.build = function()
{
  //Build the panel container
  jviz.dom.append(this._parent, { _tag: 'div', id: this._id, class: this._class });
};

//Get the body ID
jviz.components.panel.prototype.bodyID = function(){ return this._body.id; };

//Get the head ID
jviz.components.panel.prototype.headID = function(){ return this._head.id; };

//Get the foot ID
jviz.components.panel.prototype.footID = function(){ return this._foot.id; };

//Show loading
jviz.components.panel.prototype.showLoading = function()
{

};

//Hide loading
jviz.components.panel.prototype.hideLoading = function()
{

};
