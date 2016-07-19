//jvizDialog
jviz.components.dialog = function(opt)
{
  //Check the options
  if(typeof opt === 'undefined'){ var opt = {}; }

  //Dialog id
  this.id = (typeof opt.id === 'undefined') ? jviz.utils.getID({ prefix: 'jviz-dialog-', length: 5 }) : opt.id;

  //Dialog class
  this.class = (typeog opt.class === 'undefined') ? 'jviz-components-dialog' : obj.class;

  //Check for active
  this.active = false;

  //Panel
  this.panel = {};
  this.panel.id = this.id + '-panel'; //Panel ID
  this.panel.class = this.class + '-panel'; //Panel class

  //Panel head
  this.panel.head = {};
  this.panel.head.id = this.panel.id + '-head'; //Panel head ID
  this.panel.head.class = this.panel.class + '-head'; //Panel head class

  //Panel head title
  this.panel.head.title = {};
  this.panel.head.title.id = this.panel.head.id + '-title'; //Panel head title ID
  this.panel.head.title.class = this.panel.head.class + '-title'; //Panel head title Class

  //Close button
  this.panel.head.close = {};
  this.panel.head.close.id = this.panel.head.id + '-close'; //Close ID
  this.panel.head.close.class = this.panel.head.class + '-close'; //Close class

  //Panel body
  this.panel.body = {};
  this.panel.body.id = this.panel.id + '-body'; //Panel body ID
  this.panel.body.class = this.panel.class + '-body'; //Panel body class

  //Panel body Row
  this.panel.body.row = {};
  this.panel.body.row.class = this.panel.body.class + '-row'; //Panel body row class

  //Panel body column
  this.panel.body.col = {};
  this.panel.body.col.class = this.panel.body.class + '-col'; //Panel body column base class
  this.panel.body.col.c1 = this.panel.body.col.class + '-1'; //Panel body column one column class
  this.panel.body.col.c2 = this.panel.body.col.class + '-2'; //Panel body column two columns class
  this.panel.body.col.c3 = this.panel.body.col.class + '-3'; //Panel body column three columns class

  //Return the new element
  return this;
};

//jvizDialog build
jviz.components.dialog.prototype.build = function(parent)
{
  //Initialize the div
  jviz.dom.append({ type: 'div', id: this.id, class: this.class, align: 'center' }, parent);

  //Add the panel
  jviz.dom.append({ type: 'div', id: this.panel.id, class: this.panel.class }, this.id);

  //Add the panel head
  jviz.dom.append({ type: 'div', id: this.panel.head.id, class: this.panel.head.class, align: 'left' }, this.panel.id);

  //Add the panel title
  jviz.dom.append({ type: 'div', id: this.panel.head.title.id, class: this.panel.head.title.class }, this.panel.head.id);

  //Add the panel close button
  jviz.dom.append({ type: 'div', id: this.panel.head.close.id, class: this.panel.head.close.class }, this.panel.head.id);

  //Add the body panel
  jviz.dom.append({ type: 'div', id: this.panel.body.id, class: this.panel.body.class, align: 'left' }, this.panel.id);

  //Add the events
  jvizComponentsDialogEvent(this);
};

//jvizDialog set title
jviz.components.dialog.prototype.setTitle = function(title)
{
  //Add the title
  $('#' + this.panel.head.title.id).html(title);
};

//jvizDialog content
jviz.components.dialog.prototype.content = function(div)
{
  //Show the content div
  $('#' + this.panel.body.id).html(div);
};

//jvizDialog Show
jviz.components.dialog.prototype.show = function()
{
  //Show the dialog
  $('#' + this.id).css('display', 'block');

  //Set as active
  this.active = true;
};

//jvizDialog hide
jviz.components.dialog.prototype.hide = function()
{
  //Hide the dialog
  $('#' + this.id).css('display', 'none');

  //Set as inactive
  this.active = false;
};

//Function for add the dialog event
function jvizComponentsDialogEvent(_main)
{
  $('#' + _main.panel.head.close.id).on('click', function()
  {
    //Check if is active
    (_main.active === true) ? _main.show() : _main.hide();
  });
}
