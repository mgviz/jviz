//jvizExtend: extend an object with the keys in another object
function jvizExtend(original, extend, keys)
{
	//Read the full list
	for(var i = 0; i < keys.length; i++)
	{
		//Get the key
		var key = key[i];

		//Extend
		original[key] = extend[key];
	}

	//Return the extended object
	return original;
}
