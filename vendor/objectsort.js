//Sort main function
function ObjectSort(array, columns, order)
{
	//Check the columns
	if(typeof columns === 'undefined')
	{
		//Create the columns array
		var columns = [];

		//Add the keys
		for(var key in array[0]){ columns.push(key); }
	}

	//Check if columns is not an array
	else if(Array.isArray(columns) === false)
	{
		//Convert it to array
		columns = [columns];
	}

	//Check the order
	if(typeof order === 'undefined')
	{
		//Create the order array
		var order = [];

		//Add ASC order
		for(var i = 0; i < columns.length; i++){ order.push('ASC'); }
	}

	//Check if order is not an array
	else if(Array.isArray(order) === false)
	{
		//Convert it to array
		order = [order];
	}

	//Else, check for lowercase
	else
	{
		//Add the order to uppercase
		for(var i = 0; i < order.length; i++){ order[i] = order[i].toUpperCase(); }
	}

	//Check the order array length
	if(order.length < columns.length)
	{
		//Complete the order array
		for(var i = order.length; i < columns.length; i++){ order.push('ASC'); }
	}

	//Sort the array
	array.sort(function(left, right){ return Compare(left, right, columns, order); });

	//Return the array
	return array;
}

//Function for compare two elements
function Compare(left, right, columns, order)
{
	//Compare all
	for(var i = 0; i < columns.length; i++)
	{
		//Check if que difference is numeric
		var numeric = !isNaN(+left[columns[i]] - +right[columns[i]]);

		//Get the values
		var a = (numeric === true) ? +left[columns[i]] : left[columns[i]].toLowerCase();
		var b = (numeric === true) ? +right[columns[i]] : right[columns[i]].toLowerCase();

		//Check the values
		if(a < b)
		{
			//Check the order
			return (order[i] === 'ASC') ? -1 : 1;
		}
		else if(a > b)
		{
			//Check the order
			return (order[i] === 'ASC') ? 1 : -1;
		}
	}

	//Default, return 0
	return 0;
}

//Check for exports
if (typeof module === "object" && module.exports)
{
	//Export module
	module.exports = ObjectSort;
}
