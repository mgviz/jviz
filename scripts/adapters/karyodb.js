//jvizKaryoDBAdapter
var jvizKaryoDBAdapter = function(mirror)
{
	//Check the mirror
	if(typeof mirror === 'undefined'){ var mirror = ''; }

	//Save the mirror
	this.mirror = (mirror === '') ? 'https://' + 'raw.githubusercontent.com/biowt/karyojs-species/v1' : mirror;

	//Parse the mirror
	if(this.mirror.charAt(this.mirror.length - 1) === '/')
	{
		//Remove the last character
		this.mirror = this.mirror.substring(0, this.mirror.length - 1);
	}

	//Base url for data
	this.data = '/{specie}/{assembly}.json';

	//Return the adapter
	return this;
};

//jvizKaryoDBAdapter generate the url
jvizKaryoDBAdapter.prototype.Url = function(opt)
{
	//Check the dataset
	if(typeof opt === 'undefined'){ var opt = {}; }

	//Generate the url
	var url = this.mirror + this.data;

	//Replace the options
	url = jvizRepStr(url, opt, { prefix: '{', suffix: '}' });

	//Return the url
	return url;
};

//jvizKaryoDBAdapter parse the result
jvizKaryoDBAdapter.prototype.Parse = function(data)
{
	//Return the chromosomes list
	return data.chr;
};

//jvizKaryoDBAdapter get data
jvizKaryoDBAdapter.prototype.Get = function(opt)
{
	//Get the json file
	var data = jvizGetJSON(this.Url(opt));

	//Parse the data and return
	return this.Parse(data);
};
