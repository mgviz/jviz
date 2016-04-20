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

//jvizDialog Create Row
jvizDialog.prototype.CreateRow = function(content)
{
	//Create the row div
	var div = '<div class="' + this.panel.body.row.class + '">';

	//Add the content
	div = div + content;

	//Close the row
	div = div + '</div>';

	//Return the row
	return div;
};

//jvizDialog Create column
jvizDialog.prototype.CreateCol = function(content, number)
{
	//Create the column div
	var div = '<div class="' + this.panel.body.col[number] + '">';

	//Add the content
	div = div + content;

	//Close the column
	div = div + '</div>';

	//Return the column code
	return div;
};

//jvizDialog Create column 1
jvizDialog.prototype.CreateCol1 = function(content)
{
	//Create the column
	return this.CreateCol(content, 'c1');
};

//jvizDialog Create column 2
jvizDialog.prototype.CreateCol2 = function(content)
{
	//Create the column
	return this.CreateCol(content, 'c2');
};

//jvizDialog Create column
jvizDialog.prototype.CreateCol3 = function(content)
{
	//Create the column 3
	return this.CreateCol(content, 'c3');
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
