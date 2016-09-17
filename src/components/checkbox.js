//Checkbox component
jviz.components.checkbox = function(opt)
{
  //Check the options
  if(typeof opt === 'undefined'){ var opt = {}; }

  //Save the new checkbox id
  this.id = (typeof opt.id === 'undefined') ? jviz.utils.getID({ preffix: 'checkbox', length: 5 }) : opt.id;

  //Save the checkbox class
  this.class = (typeof opt.class === 'undefined') ? 'jviz-components-checkbox' : opt.class;

  //Save the parent
  this.parent = (typeof opt.parent === 'undefined') ? undefined : opt.parent;

  //Checkbox object
  this.checkbox = {};
  this.checkbox.id = this.id + '-checkbox'; //Checkbox id
  this.checkbox.default = (typeof opt.checked === 'undefined') ? false : opt.checked; //Default status

  //Label object
  this.label = {};
  this.label.id = this.id + '-label'; //Label id

  //Build the checkbox
  this.build();

  //Return this
  return this;
};

//Build the checkbox
jviz.components.checkbox.prototype.build = function()
{
  //<div class="jviz-components-checkbox" id="checkboxDiv">
  //	<input type="checkbox" value="1" id="myCheckbox" name="" />
  //	<label for="myCheckbox"></label>
  //</div>

  //Create the parent div
  jviz.dom.append(this.parent, { _tag: 'div', id: this.id, class: this.class });

  //Add the input
  jviz.dom.append(this.id, { _tag: 'input', type: 'checkbox', id: this.checkbox.id, value: 0, name: '' });

  //Add the label
  jviz.dom.append(this.id, { _tag: 'label', id: this.label.id, for: this.checkbox.id });

  //Set checked
  this.checked(this.checkbox.default);
};

//Set if checkbox is checked
jviz.components.checkbox.prototype.checked = function(status)
{
  //Get the element
  var el = document.getElementById(this.checkbox.id);

  //Check for status
  if(typeof status !== 'boolean'){ return el.checked; }

  //Set the checkbox status
  el.checked = status;
};
