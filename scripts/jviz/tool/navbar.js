//jviz tool navbar main class
function jvizToolNavbar(obj)
{
	//Check for undefined object
	if(typeof obj === 'undefined'){ var obj = {}; }

	//Navbar ID
	this.id = (typeof obj.id !== 'undefined')? obj.id : '';

	//Navbar class
	this.class = (typeof obj.class !== 'undefined')? obj.class : 'jvizToolNavbar';

	//Navbar show
	this.show = true;

	//Navbar items
	this.items = [];

	//Return the navbar
	return this;
}

//jvizToolNavbar register item
jvizToolNavbar.prototype.AddItem = function(obj)
{
	//Save the new item
	this.items.push(obj);
};

//jvizToolNavbar remove item by ID
jvizToolNavbar.prototype.RemoveItemByID = function(id)
{
	//Read all the items
	for(var i = 0; i < this.items.length; i++)
	{
		//Check the item id
		if(this.items[i].id !== id){ continue; }

		//Remove the item
		this.items.splice(i, 1);

		//Exit
		return;
	}
};

//jvizToolNavbar build
jvizToolNavbar.prototype.Build = function(parent)
{
	//Create the new navbar element
  var div = '<div id="' + this.id + '" class="' + this.class + '" ';

  //Check if navbar is visible
  if(this.show === false)
  {
    //Add the display as none
    div = div + 'style="display:none;"'
  }

  //End the div
  div = div + '>';

	//Add all the items
	for(var i = 0; i < this.items.length; i++)
	{
		//Get the element
		var item = this.items[i];

		//Check for button
		if(item.type === 'button'){ div = div + this.BuildBtn(item); }

		//Check for button icon
		else if(item.type === 'button-icon'){ div = div + this.BuildBtnIcon(item); }

		//Check for input
		else if(item.type === 'input'){ div = div + this.BuildInput(item); }

		//Check for label
		else if(item.type === 'label'){ div = div + this.BuildLabel(item); }
	}

	//Close the navbar div
  div = div + '</div>';

	//Add the navbar
	$('#' + parent).append(div);
};

//jvizToolNavbar build button
jvizToolNavbar.prototype.BuildBtn = function(obj)
{
	//Return the button
  return '<div id="' + obj.id + '" class="' + obj.class + '">' + obj.title + '</div>';
};

//jvizToolNavbar build button icon
jvizToolNavbar.prototype.BuildBtnIcon = function(obj)
{
	//Return the button
  return '<div id="' + obj.id + '" class="' + obj.class + '" title="' + obj.title + '"></div>';
};

//jvizToolNavbar build input
jvizToolNavbar.prototype.BuildInput = function(obj)
{
	//Return the input
	return '<input type="text" id="' + obj.id + '" class="' + obj.class + '" placeholder="' + obj.placeholder + '">';
};

//jvizToolNavbar build label
jvizToolNavbar.prototype.BuildLabel = function(obj)
{
	//Return the label
	return '<div id="' + obj.id + '" class="' + obj.class + '">' + obj.text + '</div>';
};

//jvizTool navbar button  class
function jvizToolNavbarBtn(obj)
{
	//Check for undefined object
	if(typeof obj === 'undefined'){ var obj = {}; }

	//Button ID
	this.id = (typeof obj.id !== 'undefined')? obj.id : '';

	//Button class
	this.class = (typeof obj.class !== 'undefined')? obj.class : 'jvizFormBtn';

	//Button title
	this.title = (typeof obj.title === 'undefined') ? 'Button' : obj.title;

	//Show button
	this.show = true;

	//Element type
	this.type = 'button';

	//Return the button
	return this;
}

//jvizTool navbar button icon class
function jvizToolNavbarBtnIcon(obj)
{
	//Check for undefined object
	if(typeof obj === 'undefined'){ var obj = {}; }

	//Button ID
	this.id = (typeof obj.id !== 'undefined')? obj.id : '';

	//Button class
	this.class = (typeof obj.class !== 'undefined')? obj.class : 'jvizFormBtnIconLight';

	//Button title
	this.title = (typeof obj.title === 'undefined') ? 'Button' : obj.title;

	//Show button
	this.show = true;

	//Element type
	this.type = 'button-icon';

	//Return the button
	return this;
}

//jvizTool navbar input class
function jvizToolNavbarInput(obj)
{
	//Check for undefined object
	if(typeof obj === 'undefined'){ var obj = {}; }

	//Input ID
	this.id = (typeof obj.id !== 'undefined')? obj.id : '';

	//Input class
	this.class = (typeof obj.class !== 'undefined')? obj.class : 'jvizFormInput';

	//Input placeholder
	this.placeholder = (typeof obj.placeholder === 'undefined') ? '' : obj.placeholder;

	//Show input
	this.show = true;

	//Element type
	this.type = 'input';

	//Return the input
	return this;
}

//jvizTool navbar label class
function jvizToolNavbarLabel(obj)
{
	//Check for undefined object
	if(typeof obj === 'undefined'){ var obj = {}; }

	//Label ID
	this.id = (typeof obj.id !== 'undefined')? obj.id : '';

	//Label class
	this.class = (typeof obj.class !== 'undefined')? obj.class : 'jvizFormLabel';

	//Label text
	this.text = (typeof obj.text === 'undefined') ? '' : obj.text;

	//Show label
	this.show = true;

	//Element type
	this.type = 'label';

	//Return the label
	return this;
}
