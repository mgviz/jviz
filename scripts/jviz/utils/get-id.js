//jviz Generate an ID
//Extracted from https://github.com/jmjuanes/getid/
function jvizGetID(opt)
{
	//Characters available
	var _chars = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	//Initialize the exists array
	var _exists = [];

	//Initialize the ID length
	var _length = 22;

	//Initialize the prefix
	var _prefix = '';

	//Initialize the suffix
	var _suffix = '';

	//Check the user options
	if(typeof opt !== 'undefined')
	{
		//Check the existen IDs
		if(typeof opt.exists !== 'undefined'){ _exists = opt.exists; }

		//Check the ID length
		if(typeof opt.length !== 'undefined'){ _length = parseInt(opt.length); }

		//Check the prefix option
		if(typeof opt.prefix !== 'undefined'){ _prefix = opt.prefix; }

		//Check the suffix option
		if(typeof opt.suffix !== 'undefined'){ _suffix = opt.suffix ; }
	}

	//Generated id
	var id = '';

	//Build the new ID
	do
	{
		//Get the time
		id = Date.now().toString();

		//Get a random number of insertions
		var ins = jvizMath.RandInt(4, 10);

		//Check the length
		if(_length > 0)
		{
			//Check if the actual ID exceeds the length
			if(id.length > _length)
			{
				//Calculate the number of insertions in function the length
				ins = (_length > 4)? 2 : 1;

				//Get a new random integer
				var p = jvizMath.RandInt(0, id.length - _length - 1);

				//Slice the actual ID
				id = id.slice(p, p + _length - ins);
			}
			else if(id.length + ins > _length)
			{
				//Change the number of insertions
				ins = _length - id.length;
			}
			else if(id.length + ins < _length)
			{
				//Change the number of insertions
				ins = _length - id.length;
			}
		}

		//Add the insertions
		for(var i = 0; i < ins; i++)
		{
			//Get a random character
			var ch = _chars[jvizMath.RandInt(0, _chars.length - 1)];

			//Get the new position for insert
			var po = jvizMath.RandInt(0, id.length - 1);

			//Insert
			id = id.slice(0, po) + ch + id.slice(po);
		}

		//Add the prefix and the suffix
		id = _prefix + id + _suffix;
	}
	while(_exists.indexOf(id) > -1);

	//Return the new ID
	return id;
}

//Check for exports
if(typeof exports !== 'undefined')
{
	//Export module
	exports.GetID = jvizGetID;
}
