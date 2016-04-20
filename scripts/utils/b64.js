//jviz Base 64 Encoder/Decoder
var jvizB64 = {};

//jvizB64 Encode
jvizB64.Encode = function(str)
{
	//Return the encoded string
	return btoa(str);
};

//jvizB64 Encode Object
jvizB64.EncodeObject = function(obj)
{
	//Convert to string
	var str = JSON.stringify(obj);

	//Encode the string object
	return jvizB64.Encode(str);
};

//jvizB64 Decode
jvizB64.Decode = function(str)
{
	//Return the decoded string
	return atob(str);
};

//jvizB64 Decode Object
jvizB64.DecodeObject = function(str)
{
	//Decode the string
	var obj = jvizB64.Decode(str);

	//Covert to object
	return JSON.parse(obj);
};
