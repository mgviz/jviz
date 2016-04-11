//jvizState object
function jvizState(opt)
{
	//Check for empty options
	if(typeof opt === 'undefined'){ var opt = {}; }

	//Check for default key
	this.key = (typeof opt.key === 'undefined') ? '' : opt.key;

	//Return this object
	return this;
}

//jvizState Get actual status
jvizState.prototype.Status = function()
{
	//Get the current hash
	var h = jvizHash.Get();

	//Get the object
	var obj = (h === '') ? {} : jvizB64.DecodeObject(h);

	//Return the object
	return obj;
};

//jvizState Get key status
jvizState.prototype.Get = function()
{
	//Get the actual object
	var obj = this.Status();

	//Get the value
	var value = (typeof obj[this.key] === 'undefined') ? {} : obj[this.key];

	//Return the value
	return value;
};

//jvizState Set status
jvizState.prototype.Set = function(value)
{
	//Get the actual object
	var obj = this.Status();

	//Replace the key
	obj[this.key] = value;

	//Encode
	var h = jvizB64.EncodeObject(obj);

	//Update the hash
	jvizHash.Set(h);
};
