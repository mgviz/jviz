//jvizAlert main class
function jvizAlert(obj)
{
	//Check the object
	if(typeof obj === 'undefined'){ var obj = {}; }

	//Save the alert ID
	this.id = (typeof obj.id === 'undefined') ? 'alert' : obj.id;

	//Save the alert class
	this.class = (typeof obj.class === 'undefined') ? 'jvizAlert' : obj.class;

	//Open class
	this.open = this.class + '-open';

	//Alert types
	this.type = {};
	this.type.done = this.class + '-done'; //Done alert
	this.type.error = this.class + '-error'; //Error alert
	this.type.warning = this.class + '-warning'; //Warning alert

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

	//Return
	return this;
}

//jvizAlert Build
jvizAlert.prototype.Build = function(parent)
{
	//Initialize the default style
	var style = '';

	//Create the alert div
	var div = '<div id="' + this.id + '" class="' + this.class + '" style="' + style + '">';

	//Add the text div
	div = div + '<div id="' + this.text.id + '" class="' + this.text.class + '"></div>';

	//Close the alert div
	div = div + '</div>';

	//Append the div
	$('#' + parent).append(div);
};

//jvizAlert Done alert
jvizAlert.prototype.Done = function(obj)
{
	//Create the alert
	this.Create('done', obj);
};

//jvizAlert Error alert
jvizAlert.prototype.Error = function(obj)
{
	//Create the alert
	this.Create('error', obj);
};

//jvizAlert Warning alert
jvizAlert.prototype.Warning = function(obj)
{
	//Create the alert
	this.Create('warning', obj);
};

//jvizAlert Create
jvizAlert.prototype.Create = function(type, obj)
{
	//Check the obj
	if(typeof obj === 'undefined'){ return; }

	//Check for empty text
	if(typeof obj.text === 'undefined'){ return; }

	//Check the active
	if(this.active === true){ return; }

	//Parse the time
	obj.time = (typeof obj.time === 'undefined') ? this.default.time : parseInt(obj.time);

	//Reset the style
	this.Reset();

	//Add the alert style
	$('#' + this.id).addClass(this.type[type]);

	//Add the text
	$('#' + this.text.id).html(obj.text);

	//Add the open class
	$('#' + this.id).addClass(this.open);

	//Set the time out
	jvizAlertTimeOut(this, obj.time);

	//Set active as true
	this.active = true;
};

//jvizAlert Reset
jvizAlert.prototype.Reset = function()
{
	//Remove the done class
	$('#' + this.id).removeClass(this.type.done);

	//Remove the warning class
	$('#' + this.id).removeClass(this.type.warning);

	//Remove the error class
	$('#' + this.id).removeClass(this.type.error);
};

//jvizAlert clear
jvizAlert.prototype.Hide = function()
{
	//Set active as false
	this.active = false;

	//Check for clear the time out
	if(this.timeOut){ clearTimeout(this.timeOut); }

	//Remove the open class
	$('#' + this.id).removeClass(this.open);
};

//jvizAlert time out
function jvizAlertTimeOut(_this, _time)
{
	//Set the time out
	_this.timeOut = setTimeout(function(){ _this.timeOut = null; _this.Hide(); }, _time);
}
