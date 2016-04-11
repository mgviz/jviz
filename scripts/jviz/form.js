//jvizForm main class
var jvizForm = {};

//jvizForm Build element
jvizForm.Build = function(el)
{
	//Check for button element
	if(el.type === 'button'){ return jvizForm.BuildBtn(el); }

	//Check for button icon element
	if(el.type === 'button-icon'){ return jvizForm.BuildBtnIcon(el); }

	//Check for input element
	if(el.type === 'input'){ return jvizForm.BuildInput(el); }

	//Check for label element
	if(el.type === 'label'){ return jvizForm.BuildLabel(el); }

	//Check for switch element
	if(el.type === 'switch'){ return jvizForm.BuildSwitch(el); }

	//Check for checkbox element
	if(el.type === 'checkbox'){ return jvizform.BuildCheckbox(el); }

	//Default, return empty
	return '';
};

//jvizForm Build button
jvizForm.BuildBtn = function(obj)
{
	//Return the button
  return '<div id="' + obj.id + '" class="' + obj.class + '">' + obj.title + '</div>';
};

//jvizForm Build button icon
jvizForm.BuildBtnIcon = function(obj)
{
	//Return the button
  return '<div id="' + obj.id + '" class="' + obj.class + '" title="' + obj.title + '"></div>';
};

//jvizForm Build input
jvizForm.BuildInput = function(obj)
{
	//Return the input
	return '<input type="text" id="' + obj.id + '" class="' + obj.class + '" placeholder="' + obj.placeholder + '">';
};

//jvizForm build label
jvizForm.BuildLabel = function(obj)
{
	//Return the label
	return '<div id="' + obj.id + '" class="' + obj.class + '">' + obj.text + '</div>';
};

//jvizForm Build switch
jvizForm.BuildSwitch = function(obj)
{
	//Create the switch div
	var div = '<div id="' + obj.parent + '" class="' + obj.class + '">';

	//Add the checkbox
	div = div + '<input type="checkbox" value="' + obj.checked + '" id="' + obj.id + '" name="" />';

	//Add the label
	div = div + '<label for="' + obj.id + '"></label>';

	//Add the background div
	div = div + '<div></div>';

	//Close the switch div
	div = div + '</div>';

	//Return the new div
	return div;
};

//jvizForm Build Checkbox
jvizForm.BuildCheckbox = function(obj)
{
	//Create the checkbox div
	var div = '<div id="' + obj.parent + '" class="' + obj.class + '">';

	//Add the checkbox
	div = div + '<input type="checkbox" value="' + obj.checked + '" id="' + obj.id + '" name="" />';

	//Add the checkbox label
	div = div + '<label for="' + obj.id + '"></label>';

	//Close the checkbox div
	div = div + '</div>';

	//Return the checkbox
	return div;
};

//jvizForm Button class
function jvizFormBtn(obj)
{
	//Check for undefined object
	if(typeof obj === 'undefined'){ var obj = {}; }

	//Button ID
	this.id = (typeof obj.id !== 'undefined') ? obj.id : '';

	//Button class
	this.class = (typeof obj.class !== 'undefined') ? obj.class : 'jvizFormBtn';

	//Button title
	this.title = (typeof obj.title === 'undefined') ? 'Button' : obj.title;

	//Show button
	this.show = true;

	//Element type
	this.type = 'button';

	//Return the button
	return this;
}

//jvizForm Button Icon class
function jvizFormBtnIcon(obj)
{
	//Check for undefined object
	if(typeof obj === 'undefined'){ var obj = {}; }

	//Button ID
	this.id = (typeof obj.id !== 'undefined') ? obj.id : '';

	//Button class
	this.class = (typeof obj.class !== 'undefined') ? obj.class : 'jvizFormBtnIconLight';

	//Button title
	this.title = (typeof obj.title === 'undefined') ? 'Button' : obj.title;

	//Show button
	this.show = true;

	//Element type
	this.type = 'button-icon';

	//Return the button
	return this;
}

//jvizForm Input class
function jvizFormInput(obj)
{
	//Check for undefined object
	if(typeof obj === 'undefined'){ var obj = {}; }

	//Input ID
	this.id = (typeof obj.id !== 'undefined') ? obj.id : '';

	//Input class
	this.class = (typeof obj.class !== 'undefined') ? obj.class : 'jvizFormInput';

	//Input placeholder
	this.placeholder = (typeof obj.placeholder === 'undefined') ? '' : obj.placeholder;

	//Show input
	this.show = true;

	//Element type
	this.type = 'input';

	//Return the input
	return this;
}

//jvizForm Label class
function jvizFormLabel(obj)
{
	//Check for undefined object
	if(typeof obj === 'undefined'){ var obj = {}; }

	//Label ID
	this.id = (typeof obj.id !== 'undefined') ? obj.id : '';

	//Label class
	this.class = (typeof obj.class !== 'undefined') ? obj.class : 'jvizFormLabel';

	//Label text
	this.text = (typeof obj.text === 'undefined') ? '' : obj.text;

	//Show label
	this.show = true;

	//Element type
	this.type = 'label';

	//Return the label
	return this;
}

//jvizForm Switch class
function jvizFormSwitch(obj)
{
	//Check for undefined object
	if(typeof obj === 'undefined'){ var obj = {}; }

	//Switch ID
	this.id = (typeof obj.id !== 'undefined') ? obj.id : 'switch';

	//Switch class
	this.class = (typeof obj.class !== 'undefined') ? obj.class : 'jvizFormSwitch';

	//Switch checked
	this.checked = (typeof obj.checked !== 'undefined') ? obj.checked : 1;

	//Switch parent ID
	this.parent = this.id + '-parent';

	//Show switch
	this.show = true;

	//Element type
	this.type = 'switch';

	//Return the switch
	return this;
}

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

	//Checkbox ID
	this.id = (typeof obj.id !== 'undefined')? obj.id : 'checkbox';

	//Checkbox class
	this.class = (typeof obj.class !== 'undefined')? obj.class : 'jvizFormCheckbox';

	//Checkbox checked
	this.checked = (typeof obj.checked !== 'undefined') ? obj.checked : 1;

	//Checkbox parent div
	this.parent = this.id + '-parent';

	//Show Checkbox
	this.show = true;

	//Element type
	this.type = 'checkbox';

	//Return the Checkbox
	return this;
}

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
