//Extend jviz
jviz.extend('hash');

//Get hash
jviz.hash.get = function()
{
	//Get the hash
	var h = window.location.hash.substr(1);

	//Return the decoded uri
	return decodeURIComponent(h);
};

//Set hash
jviz.hash.set = function(h)
{
	//Encode the hash value
	h = encodeURIComponent(h);

	//Set the hash
	window.location.hash = '#' + h;
};
