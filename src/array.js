//Extend jviz
jviz.extend('array', {});

//Check if object is an array
jviz.array.is = function(el){ return Array.isArray(el); };

//Create an array with zeros
jviz.array.zeros = function(num)
{
	//Return the zeros array
	return Array.apply(null, Array(num)).map(Number.prototype.valueOf, 0);
};

//Create an array with ones
jviz.array.ones = function(num)
{
	//Return the zeros array
	return Array.apply(null, Array(num)).map(Number.prototype.valueOf, 1);
};

//Calculate the max value of an array
jviz.array.max = function(obj)
{
  //Return the max value
  return Math.max.apply(Math, obj);
};

//Calculate the min value of an array
jviz.array.min = function(obj)
{
  //Return the min value
  return Math.min.apply(Math, obj);
};
