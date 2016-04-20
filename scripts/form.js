//jvizForm main class
function jvizForm(obj)
{
	//Element ID
	this.id = obj.id;

	//Element class
	this.class = obj.class;

	//Show element
	this.show = true;

	//Element type
	this.type = obj.type;

	//Return the element
	return this;
}

//jvizFormButton Append Element
jvizForm.prototype.Append = function(parent)
{
	//Get the button code
	var div = this.Build();

	//Append the button
	$('#' + parent).append(div);
};

//jvizForm Build Element
jvizForm.prototype.Build = function()
{
	//Return the element
  return '';
};

//jvizForm Button class
function jvizFormBtn(obj)
{
	//Check for undefined object
	if(typeof obj === 'undefined'){ var obj = {}; }

	//Check for undefined ID
	if(typeof obj.id === 'undefined'){ obj.id = jvizGetID({ prefix: 'btn', length: 10 }); }

	//Check for undefined class
	if(typeof obj.class === 'undefined'){ obj.class = 'jvizFormBtnBlue'; }

	//Add the type
	obj.type = 'button';

	//Extend the jvizForm
	jvizForm.call(this, obj);

	//Button title
	this.title = (typeof obj.title === 'undefined') ? 'Button' : obj.title;

	//Return the button
	return this;
}

//Inherit the jvizForm methods
jvizFormBtn.prototype = Object.create(jvizForm.prototype);

//Set the constructor
jvizFormBtn.prototype.constructor = jvizFormBtn;

//jvizFormBtn Extend the build method
jvizFormBtn.prototype.Build = function()
{
	//Return the button
  return '<div id="' + this.id + '" class="' + this.class + '">' + this.title + '</div>';
};

//jvizForm Button Icon class
function jvizFormBtnIcon(obj)
{
	//Check for undefined object
	if(typeof obj === 'undefined'){ var obj = {}; }

	//Check for undefined ID
	if(typeof obj.id === 'undefined'){ obj.id = jvizGetID({ prefix: 'btn-icon', length: 10 }); }

	//Check for undefined class
	if(typeof obj.class === 'undefined'){ obj.class = 'jvizFormBtnIconLight'; }

	//Add the type
	obj.type = 'button-icon';

	//Extend the jvizForm
	jvizForm.call(this, obj);

	//Button title
	this.title = (typeof obj.title === 'undefined') ? 'Button' : obj.title;

	//Return the button
	return this;
}

//Inherit the jvizForm methods
jvizFormBtnIcon.prototype = Object.create(jvizForm.prototype);

//Set the constructor
jvizFormBtnIcon.prototype.constructor = jvizFormBtnIcon;

//jvizFormBtnIcon Extend the build method
jvizFormBtnIcon.prototype.Build = function()
{
	//Return the button
  return '<div id="' + this.id + '" class="' + this.class + '" title="' + this.title + '"></div>';
};

//jvizForm Input class
function jvizFormInput(obj)
{
	//Check for undefined object
	if(typeof obj === 'undefined'){ var obj = {}; }

	//Check for undefined ID
	if(typeof obj.id === 'undefined'){ obj.id = jvizGetID({ prefix: 'input', length: 10 }); }

	//Check for undefined class
	if(typeof obj.class === 'undefined'){ obj.class = 'jvizFormInput'; }

	//Add the type
	obj.type = 'input';

	//Extend the jvizForm
	jvizForm.call(this, obj);

	//Input placeholder
	this.placeholder = (typeof obj.placeholder === 'undefined') ? '' : obj.placeholder;

	//Return the input
	return this;
}

//Inherit the jvizForm methods
jvizFormInput.prototype = Object.create(jvizForm.prototype);

//Set the constructor
jvizFormInput.prototype.constructor = jvizFormInput;

//jvizFormInput Extend the build method
jvizFormInput.prototype.Build = function()
{
	//Return the button
  return '<input type="text" id="' + this.id + '" class="' + this.class + '" placeholder="' + this.placeholder + '">';
};

//jvizForm Select class
function jvizFormSelect(obj)
{
	//Check for undefined object
	if(typeof obj === 'undefined'){ var obj = {}; }

	//Check for undefined ID
	if(typeof obj.id === 'undefined'){ obj.id = jvizGetID({ prefix: 'select', length: 10 }); }

	//Check for undefined class
	if(typeof obj.class === 'undefined'){ obj.class = 'jvizFormSelect'; }

	//Add the type
	obj.type = 'select';

	//Extend the jvizForm
	jvizForm.call(this, obj);

	//Return the input
	return this;
}

//Inherit the jvizForm methods
jvizFormSelect.prototype = Object.create(jvizForm.prototype);

//Set the constructor
jvizFormSelect.prototype.constructor = jvizFormSelect;

//jvizFormSelect Extend the build method
jvizFormSelect.prototype.Build = function()
{
	//Return the input
	return '<select id="' + this.id + '" class="' + this.class + '"></select>';
};

//jvizFormSelect Add option
jvizFormSelect.prototype.AddOption = function(opt)
{
	//Create the new option
	var div = '<option value="' + opt.value + '">' + opt.name + '</option>';

	//Add the option
	$('#' + this.id).append(div);
};

//jvizFormSelect Clear options
jvizFormSelect.prototype.ClearOptions = function()
{
	//Remove all the options
	$('#' + this.id).html('');
};

//jvizForm Label class
function jvizFormLabel(obj)
{
	//Check for undefined object
	if(typeof obj === 'undefined'){ var obj = {}; }

	//Check for undefined ID
	if(typeof obj.id === 'undefined'){ obj.id = jvizGetID({ prefix: 'label', length: 10 }); }

	//Check for undefined class
	if(typeof obj.class === 'undefined'){ obj.class = 'jvizFormLabel'; }

	//Add the type
	obj.type = 'label';

	//Extend the jvizForm
	jvizForm.call(this, obj);

	//Label text
	this.text = (typeof obj.text === 'undefined') ? '' : obj.text;

	//Return the label
	return this;
}

//Inherit the jvizForm methods
jvizFormLabel.prototype = Object.create(jvizForm.prototype);

//Set the constructor
jvizFormLabel.prototype.constructor = jvizFormLabel;

//jvizFormLabel Extend the build method
jvizFormLabel.prototype.Build = function()
{
	//Return the input
	return '<div id="' + this.id + '" class="' + this.class + '">' + this.text + '</div>';
};

//jvizForm Switch class
function jvizFormSwitch(obj)
{
	//Check for undefined object
	if(typeof obj === 'undefined'){ var obj = {}; }

	//Check for undefined ID
	if(typeof obj.id === 'undefined'){ obj.id = jvizGetID({ prefix: 'switch', length: 10 }); }

	//Check for undefined class
	if(typeof obj.class === 'undefined'){ obj.class = 'jvizFormSwitch'; }

	//Add the type
	obj.type = 'switch';

	//Extend the jvizForm
	jvizForm.call(this, obj);

	//Switch checked
	this.checked = (typeof obj.checked !== 'undefined') ? obj.checked : 1;

	//Switch parent ID
	this.parent = this.id + '-parent';

	//Return the switch
	return this;
}

//Inherit the jvizForm methods
jvizFormSwitch.prototype = Object.create(jvizForm.prototype);

//Set the constructor
jvizFormSwitch.prototype.constructor = jvizFormSwitch;

//jvizFormSwitch Extend the build method
jvizFormSwitch.prototype.Build = function()
{
	//Create the switch div
	var div = '<div id="' + this.parent + '" class="' + this.class + '">';

	//Add the checkbox
	div = div + '<input type="checkbox" value="' + this.checked + '" id="' + this.id + '" name="" />';

	//Add the label
	div = div + '<label for="' + this.id + '"></label>';

	//Add the background div
	div = div + '<div></div>';

	//Close the switch div
	div = div + '</div>';

	//Return the new div
	return div;
};

//jvizFormSwitch Set state
jvizFormSwitch.prototype.Set = function(status)
{
	//Update the switch status
	$('#' + this.id).prop('checked', status);
};

//jvizFormSwitch Get actual status
jvizFormSwitch.prototype.Get = function()
{
	//Return the status
	return $('#' + this.id).is(':checked');
};

//jvizForm Checkbox class
function jvizFormCheckbox(obj)
{
	//Check for undefined object
	if(typeof obj === 'undefined'){ var obj = {}; }

	//Check for undefined ID
	if(typeof obj.id === 'undefined'){ obj.id = jvizGetID({ prefix: 'checkbox', length: 10 }); }

	//Check for undefined class
	if(typeof obj.class === 'undefined'){ obj.class = 'jvizFormCheckbox'; }

	//Add the type
	obj.type = 'checkbox';

	//Extend the jvizForm
	jvizForm.call(this, obj);

	//Checkbox checked
	this.checked = (typeof obj.checked !== 'undefined') ? obj.checked : 1;

	//Checkbox parent div
	this.parent = this.id + '-parent';

	//Return the Checkbox
	return this;
}

//Inherit the jvizForm methods
jvizFormCheckbox.prototype = Object.create(jvizForm.prototype);

//Set the constructor
jvizFormCheckbox.prototype.constructor = jvizFormCheckbox;

//jvizFormCheckbox Extend the build method
jvizFormCheckbox.prototype.Build = function()
{
	//Create the checkbox div
	var div = '<div id="' + this.parent + '" class="' + this.class + '">';

	//Add the checkbox
	div = div + '<input type="checkbox" value="' + this.checked + '" id="' + this.id + '" name="" />';

	//Add the checkbox label
	div = div + '<label for="' + this.id + '"></label>';

	//Close the checkbox div
	div = div + '</div>';

	//Return the checkbox
	return div;
};

//jvizFormCheckbox Set state
jvizFormCheckbox.prototype.Set = function(status)
{
	//Update the switch status
	$('#' + this.id).prop('checked', status);
};

//jvizFormCheckbox Get actual status
jvizFormCheckbox.prototype.Get = function()
{
	//Return the status
	return $('#' + this.id).is(':checked');
};
