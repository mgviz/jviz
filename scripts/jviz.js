//jviz main class
function jviz(opt)
{
	//Check the options
	if(typeof opt === 'undefined'){ var opt = {}; }

	//Check the parent
	this.parent = (typeof opt.parent === 'undefined') ? 'body' : opt.parent;

	//Check the add type
	this.mode = (typeof opt.mode === 'undefined') ? 'html' : opt.mode;

	//List with the elements
	this.el = [];

	//Return this element
	return this;
}

//Clear list
jviz.prototype.Clear = function(){ this.el = []; };

//Build the full list
jviz.prototype.Build = function()
{
	//Build the list recursive
	var div = this.BuildRecursive(this.el);

	//Check the parent
	var p = (this.parent === 'body') ? '' : '#';

	//Add the div
	$(p + this.parent)[this.mode](div);
};

//Build the elements recursive
jviz.prototype.BuildRecursive = function(list)
{
	//Output div
	var div = '';

	//Check for string
	if(typeof list === 'string'){ return list; }

	//Read the full list
	for(var i = 0; i < list.length; i++)
	{
		//Get the element
		var el = list[i];

		//
	}
};

//Add a new element
jviz.prototype.Add = function(element)
{
	//Register the new element
	this.el.push(element);
};

//Parse an element
jviz.prototype.Parse = function(element)
{

};
