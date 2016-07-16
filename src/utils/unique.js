//Function that returns the unique elements of an array
jviz.utils.unique = function(array, by)
{
	//Check the by function
	if(typeof by !== 'function')
	{
		//Get the JSON.stringify function
		var by = JSON.stringify;
	}

	//List with the unique elements
	var unique = [];

	//Filter the array
	array.filter(function(item){

		//Filter and get the unique element
		var str = by(item);

		//Check if exists
		if(unique.indexOf(str) < 0)
		{
			//Item does not exists
			unique.push(str);

			//Return valid
			return true;
		}

		//Default, return false
		return false;
	});

	//Return the filtered array
	return array;
};
