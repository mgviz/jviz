//jviz Math class
var jvizMath = {};

//Create the zeros method
jvizMath.Zeros = function(num)
{
	//Create a new array
	var a = [];

	//Insert zeros
	for(var i = 0; i < num; i++){ a[i] = 0; }

	//Return the zeros array
	return a;
};

//Format number
//Found in http://stackoverflow.com/questions/2254185/regular-expression-for-formatting-numbers-in-javascript
jvizMath.FormatNumber = function(num)
{
	//Return the formatted number
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
