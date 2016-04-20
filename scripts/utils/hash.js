//jvizHash
var jvizHash = {};

//Get hash
jvizHash.Get = function()
{
	//Get the hash
	var h = window.location.hash.substr(1);

	//Return the decoded uri
	return decodeURIComponent(h);
};

//Set hash
jvizHash.Set = function(h)
{
	//Encode the hash value
	h = encodeURIComponent(h);

	//Set the hash
	window.location.hash = '#' + h;
};
