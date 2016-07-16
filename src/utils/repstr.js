//jviz.utils.repStr method
//Extracted from https://github.com/jmjuanes/repstr
jviz.utils.repStr = function(str, obj, opt)
{
	//Check the object
	if(typeof obj === 'undefined'){ return str; }

	//Check the options
	if(typeof opt === 'undefined'){ var opt = {}; }

	//Check the prefix
	if(typeof opt.prefix === 'undefined'){ opt.prefix = ''; }

	//Check the suffix
	if(typeof opt.suffix === 'undefined'){ opt.suffix = ''; }

	//Get all the keys
	var keys = Object.keys(obj);

	//Read all the keys
	for(var i = 0; i < keys.length; i++)
	{
		//Get the key
		var key = keys[i];

		//Get the value
		var value = obj[key];

		//Create the RegExp
		var exp = new RegExp(opt.prefix + key + opt.suffix, 'g');

		//Replace the value
		str = str.replace(exp, value);
	}

	//Return the string
	return str;
};
