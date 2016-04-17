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

//Get a random number
jvizMath.Rand = function(min, max)
{
	//Check for undefined min
	if(typeof min === 'undefined'){ var min = 0; }

	//Check for undefined max
	if(typeof max === 'undefined'){ var max = 1; } 

	//Get a random number
	var r = Math.random()*(max - min);

	//Return the random number
	return r + min;
};

//Get a random integer
jvizMath.RandInt = function(min, max)
{
	//Check for undefined min
	if(typeof min === 'undefined'){ var min = 0; }

	//Check for undefined max
	if(typeof max === 'undefined'){ var max = 1; }

	//Get a random number
	var r = Math.random()*(max - min);

	//Convert to integer
  r = Math.floor(r) + min;

	//Return the random int
	return r;
};

//Rand alias
jvizMath.Random = function(min, max)
{
	//Return the random number
	return jvizMath.Rand(min, max);
};

//Rand Int alias
jvizMath.RandomInt = function(min, max)
{
	//Return the random integer
	return jvizMath.RandInt(min, max);
};

//Format number
//Found in http://stackoverflow.com/questions/2254185/regular-expression-for-formatting-numbers-in-javascript
jvizMath.FormatNumber = function(num, sep)
{
	//Check the separator
	if(typeof sep === 'undefined'){ var sep = ','; }

	//Return the formatted number
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + sep);
};

//Check for exports to node
if(typeof exports !== 'undefined')
{
	//Export module
	exports.Math = jvizMath;
}
