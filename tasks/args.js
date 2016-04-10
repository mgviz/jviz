//Function for get the arguments
module.exports = function()
{
	//Get the arguments
	var args = process.argv;

	//Output argumtents
	var out = {};

	//Read all the arguments
	for(var i = 0; i < args.length; i++)
	{
		//Get the argument
		var a = args[i];

		//Check if argument starts with -
		if(a.substring(0, 1) !== '-'){ continue; }

		//Replace the -
		a = a.replace('-', '');

		//Check for ahoter -
		if(a.substring(0, 1) === '-'){ a = a.replace('-', ''); }

		//Check for invalid argument
		if(a === '' || a === ' '){ throw new Error('Invalid argument ' + args[i]); }

		//Check the next argument
		if(i + 1 >= args.length)
		{
			//Set the argument as true
			out[a] = true;
		}
		else if(args[i + 1].substring(0, 1) === '-')
		{
			//Set the argument as true
			out[a] = true;
		}
		else
		{
			//Set the argument as value
			out[a] = args[i + 1];
		}
	}

	//Return the arguments
	return out;
};
