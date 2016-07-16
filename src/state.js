//jviz.state object
jviz.state = function(opt)
{
	//Check for empty options
	if(typeof opt === 'undefined'){ var opt = {}; }

	//Check for default key
	this.key = (typeof opt.key === 'undefined') ? '' : opt.key;

	//Return this object
	return this;
};

//jvizState Get actual status
jviz.state.prototype.status = function()
{
	//Get the current hash
	var h = jviz.hash.get();

	//Get the object
	var obj = (h === '') ? {} : jviz.base64.decodeJSON(h);

	//Return the object
	return obj;
};

//jvizState Get key status
jviz.state.prototype.get = function()
{
	//Get the actual object
	var obj = this.status();

	//Get the value
	var value = (typeof obj[this.key] === 'undefined') ? {} : obj[this.key];

	//Return the value
	return value;
};

//jvizState Set status
jviz.state.prototype.set = function(value)
{
	//Get the actual object
	var obj = this.status();

	//Replace the key
	obj[this.key] = value;

	//Encode
	var h = jviz.base64.encodeJSON(obj);

	//Update the hash
	jviz.hash.set(h);
};
