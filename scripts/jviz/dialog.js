//jvizDialog
function jvizDialog(obj)
{
	//Check for ID
	if(typeof obj.id === 'undefined'){ return console.error('jvizDialog: no object ID'); }

	//Check for class
	if(typeof obj.class === 'undefined'){ return console.error('jvizDialog: no object class'); }

	//Dialog id
	this.id = obj.id;

	//Dialog class
	this.class = obj.class;

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


	//Return the new element
	return this;
}

//jvizDialog build
jvizDialog.prototype.Build = function(parent)
{
	//Initialize the div
	var div = '<div id="' + this.id + '" class="' + this.class + '" align="center">';

	//Add the panel
	div = div + '<div id="' + this.panel.id + '" class="' + this.panel.class + '">';

	//Add the panel head
	div = div + '<div id="' + this.panel.head.id + '" class="' + this.panel.head.class + '" align="left">';

	//Add the panel title
	div = div + '<div id="' + this.panel.head.title.id + '" class="' + this.panel.head.title.class + '"></div>';

	//Add the panel close button
	div = div + '<div id="' + this.panel.head.close.id + '" class="' + this.panel.head.close.class + '"></div>';

	//Close the head panel
	div = div + '</div>';

	//Add the body panel
	div = div + '<div id="' + this.panel.body.id + '" class="' + this.panel.body.class + '" align="left"></div>';

	//Close the panel
	div = div + '</div>';

	//Close the main div
	div = div + '</div>';

	//Append the div
	$('#' + parent).append(div);

	//Add the events
	jvizDialogEvent(this);
};

//jvizDialog set title
jvizDialog.prototype.SetTitle = function(title)
{
	//Add the title
	$('#' + this.panel.head.title.id).html(title);
};

//jvizDialog content
jvizDialog.prototype.Content = function(div)
{
	//Show the content div
	$('#' + this.panel.body.id).html(div);
};

//jvizDialog show/hide
jvizDialog.prototype.ShowHide = function()
{
	//Check for active
	if(this.active === true)
	{
		//Hide the dialog
		this.Hide();
	}
	else
	{
		//Show the dialog
		this.Show();
	}
};

//jvizDialog Show
jvizDialog.prototype.Show = function()
{
	//Show the dialog
	$('#' + this.id).css('display', 'block');

	//Set as active
	this.active = true;
};

//jvizDialog hide
jvizDialog.prototype.Hide = function()
{
	//Hide the dialog
	$('#' + this.id).css('display', 'none');

	//Set as inactive
	this.active = false;
};

//Function for add the dialog event
function jvizDialogEvent(_main)
{
	$('#' + _main.panel.head.close.id).on('click', function(){ _main.ShowHide(); });
}
