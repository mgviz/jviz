//Get a random number
jviz.math.rand = function(min, max)
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
jviz.math.randInt = function(min, max)
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
jviz.math.random = function(min, max)
{
	//Return the random number
	return jviz.math.rand(min, max);
};

//Rand Int alias
jviz.math.randomInt = function(min, max)
{
	//Return the random integer
	return jviz.math.randInt(min, max);
};
