//jviz main class
function jviz(opt)
{
	//Check the options
	if(typeof opt === 'undefined'){ var opt = {}; }

	//Check for string
	if(typeof opt === 'string'){ opt = { parent: opt }; }

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

//Export the full list
jviz.prototype.Export = function()
{
	//Build the list recursive and return the html content
	return this.BuildRecursive(this.el);
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

		//Check the element type
		if(typeof el === 'string')
		{
			//Add the string
			div = div + el;

			//Next element
			continue;
		}

		//Check for text
		if(el._type === 'text')
		{
			//Add the text
			div = div + el.text;

			//Continue
			continue;
		}

		//Initialize the tag
		var d = '<' + el._type;

		//Read all the attributes
		for(var key in el)
		{
			//Check for type or html
			if(key === '_type' || key === 'html' || key === '_parent'){ continue; }

			//Check for boolean
			if(typeof el[key] === 'boolean')
			{
				//Add a boolean option
				d = d + ' ' + key;

				//Continue
				continue;
			}

			//Add the attribute
			d = d + ' ' + key + '="' + el[key] + '"';
		}

		//Close the tag
		d = d + '>';

		//Check for add the html
		if(typeof el.html !== 'undefined'){ d = d + this.BuildRecursive(el.html); }

		//Check for close the tag
		if(el._type !== 'input' && el._type !== 'br')
		{
			//Close the tag
			d = d + '</' + el._type + '>';
		}

		//Add to the output
		div = div + d;
	}

	//Return the full div
	return div;
};

//Add a new element
jviz.prototype.Add = function(type, element, parent)
{
	//Check for undefined element
	if(typeof element === 'undefined')
	{
		//Get the element
		var element = type;

		//Update the type
		type = element._type;
	}

	//Parse the element
	element = this.Parse(element);

	//Save the type
	element._type = type;

	//Check for undefined element ID
	if(typeof element.id === 'undefined'){ element.id = jvizGetID({ prefix: element._type, length: 10 }); }

	//Check the element parent
	if(typeof element._parent === 'undefined'){ element._parent = ''; }

	//Check the parent
	if(typeof parent !== 'undefined'){ element._parent = parent; }

	//Check for empty parent
	if(element._parent === '' || element._parent === ' ')
	{
		//Register the new element
		this.el.push(element);

		//Return the element ID
		return element.id;
	}

	//Check the append
	var append = element._parent.split('.');

	//Element to append
	var item = this.el;

	//Read all
	for(var i = 0; i < append.length; i++)
	{
		//Index
		var index = -1;

		//Find the item
		for(var j = 0; j < item.length; j++)
		{
			//Check the id
			if(item[j].id !== append[i]){ continue; }

			//Save the index
			index = j;

			//Exit
			break;
		}

		//Check the index
		if(index === -1){ return console.error('Error: element with ID "' + append[i] + '" not found...'); }

		//Check the html
		if(typeof item[index].html === 'undefined'){ item[index].html = []; }

		//Check for string
		if(typeof item[index].html === 'string'){ return console.error('Error: content of ' + item[index].id + ' is a string'); }

		//Save the item to append
		item = item[index].html;
	}

	//Add to the item
	item.push(element);

	//Return the element ID
	return element.id;
};

//Parse an element
jviz.prototype.Parse = function(element)
{
	//Check the element type
	if(typeof element === 'object'){ return element; }
};

//Create div
jviz.prototype.AddDiv = function(opt, p){ return this.Add('div', opt, p); };

//Create paragraph
jviz.prototype.AddParagraph = function(opt, p){ return this.Add('p', opt, p); };

//Create paragraph alias
jviz.prototype.AddP = function(opt, p){ return this.Add('p', opt, p); };

//Create span
jviz.prototype.AddSpan = function(opt, p){ return this.Add('span', opt, p); };

//Create text
jviz.prototype.AddText = function(opt, p){ return this.Add('text', { text: opt }, p); };

//Create bold text
jviz.prototype.AddBold = function(opt, p){ return this.Add('b', opt, p); };

//Create italic text
jviz.prototype.AddItalic = function(opt, p){ return this.Add('i', opt, p); };

//Create underline text
jviz.prototype.AddUnderline = function(opt, p){ return this.Add('u', opt, p); };

//Create small text
jviz.prototype.AddSmallText = function(opt, p)

//Create heading 1
jviz.prototype.AddH1 = function(opt, p){ return this.Add('h1', opt, p); };

//Create heading 2
jviz.prototype.AddH2 = function(opt, p){ return this.Add('h2', opt, p); };

//Create heading 3
jviz.prototype.AddH3 = function(opt, p){ return this.Add('h3', opt, p); };

//Create heading 4
jviz.prototype.AddH4 = function(opt, p){ return this.Add('h4', opt, p); };

//Create heading 5
jviz.prototype.AddH5 = function(opt, p){ return this.Add('h5', opt, p); };

//Create heading 6
jviz.prototype.AddH6 = function(opt, p){ return this.Add('h6', opt, p); };

//Create line break
jviz.prototype.AddLineBreak = function(opt, p){ return this.Add('br', opt, p); };

//Create line break alias
jviz.prototype.AddBR = function(opt, p){ return this.Add('br', opt, p); };

//Create a canvas element
jviz.prototype.AddCanvas = function(opt, p){ return this.Add('canvas', opt, p); };

//Create a switch
jviz.prototype.AddSwitch = function(opt, p)
{
	//Create the main object
	var main = { id: opt.id + '-parent', class: opt.class, html: [], _parent: opt._parent };

	//Add the input
	main.html.push({ _type: 'input', type: 'checkbox', checked: opt.checked, id: opt.id, name: '' });

	//Add the label
	main.html.push({ _type: 'label', for: opt.id });

	//Add an empty div
	main.html.push({ _type: 'div' });

	//Add the switch
	return this.Add('div', main, p);
};

//Create a checkbox
jviz.prototype.AddCheckbox = function(opt, p)
{
	//Create the main object
	var main = { id: opt.id + '-parent', class: opt.class, html: [], _parent: opt._parent };

	//Add the input
	main.html.push({ _type: 'input', type: 'checkbox', checked: opt.checked, id: opt.id, name: '' });

	//Add the label
	main.html.push({ _type: 'label', for: opt.id });

	//Add the switch
	return this.Add('div', main, p);
};

//Create an input
jviz.prototype.AddInput = function(opt, p){ return this.Add('input', opt, p); };

//Create a textare
jviz.prototype.AddTextarea = function(opt, p){ return this.Add('textarea', opt, p); };

//Create a label
jviz.prototype.AddLabel = function(opt, p){ return this.Add('label', opt, p); };

//Create a select
jviz.prototype.AddSelect = function(opt, p){ return this.Add('select', opt, p); };

//Create a select's option
jviz.prototype.AddOption = function(opt, p){ return this.Add('option', opt, p); };

//Create a new panel
jviz.prototype.AddPanel = function(opt, p)
{
	//Add the html object
	opt.html = [];

	//Create the panel description
	opt.html.push({ _type: 'div', id: opt.id + '-description', class: opt.class + '-description', html: [] });

	//Create the panel content
	opt.html.push({ _type: 'div', id: opt.id + '-content', class: opt.class + '-content', html: [] });

	//Register the new panel
	return this.Add('div', opt, p);
};
