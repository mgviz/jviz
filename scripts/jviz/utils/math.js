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
