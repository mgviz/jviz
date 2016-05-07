//jviz GDBase adapter
var jvizGDBaseAdapter = function(mirror)
{
	//Save the mirror
	this.mirror = (typeof mirror === 'undefined') ? 'http://bioinfolab005.uv.es:3000' : mirror;

	//Parse the mirror
	if(this.mirror.charAt(this.mirror.length - 1) === '/')
	{
		//Remove the last character
		this.mirror = this.mirror.substring(0, this.mirror.length - 1);
	}

	//Base url for data
	this.data = '/get/{specie}/{assembly}/{dataset}';

	//Find type
	this.find = { 'id': '/id/{id}', 'region': '/region/{region}' };

	//Base url for species
	this.species = '/species';

	//Return
	return this;
};

//jvisGDBaseAdapter URL for get data
jvizGDBaseAdapter.prototype.Url = function(find, opt)
{
	//Check the dataset
	if(typeof opt === 'undefined'){ var opt = {}; }

	//Check the find type
	if(typeof this.find[find] === 'undefined')
	{
		//Prepare error
		var e = 'GDBaseAdapter: The find argument must be one of the following: ' ;

		//Show the error
		console.error(e + Object.keys(this.find).join(', '));

		//Return null
		return null;
	}

	//Generate the url
	var url = this.mirror + this.data + this.find[find];

	//Replace the options
	url = jvizRepStr(url, opt, { prefix: '{', suffix: '}' });

	//Return the url
	return url;
};

//jvizGDBaseAdapter Parse the result
jvizGDBaseAdapter.prototype.Parse = function(data)
{
	//Check the error
	if(data.error){ return []; }

	//Output
	var out = [];

	//Read all the response
	for(var i = 0; i < data.response.length; i++)
	{
		//Get the results
		var results = (typeof data.response[i].results === 'undefined') ? [] : data.response[i].results;

		//Save and continue
		out.push(results);
	}

	//Return the results
	return out;
};

//jvizGDBaseAdapter Parse and concat the result
jvizGDBaseAdapter.prototype.ParseConcat = function(data)
{
	//Check the error
	if(data.error){ return []; }

	//Output
	var out = [];

	//Read all the response
	for(var i = 0; i < data.response.length; i++)
	{
		//Get the results
		var results = (typeof data.response[i].results === 'undefined') ? [] : data.response[i].results;

		//Concatenate
		out = out.concat(results);
	}

	//Return the results
	return out;
};

//jvizGDBaseAdapter Get data
jvizGDBaseAdapter.prototype.Get = function(find, opt)
{
	//Get the url
	var url = this.Url(find, opt);

	//Get the json file
	var data = jvizGetJSON(url);

	//Parse the data
	data = this.Parse(data);

	//Return the data
	return data;
};

//jvizGDBaseAdapter Get species
jvizGDBaseAdapter.prototype.Species = function()
{
	//Get the url for the species
	var url = this.mirror + this.species;

	//Get the json file
	var json = jvizGetJSON(url);

	//Return the species list
	return json;
};
