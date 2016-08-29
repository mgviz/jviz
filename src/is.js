//Extend jviz
jviz.extend('is', {});

//Check if element is undefined
jviz.is.undefined = function(el){ return typeof el === 'undefined'; };

//Check if element is an array
jviz.is.array = function(el){ return Array.isArray(el); }

//Check if element is an object
jviz.is.object = function(el){ return typeof el === 'object'; };

//Check if element is a string
jviz.is.string = function(el){ return typeof el === 'string'; };

//Check if element is null
jviz.is.null = function(el){ return el === null; };

//Check if element is a number
jviz.is.number = function(el){ return typeof el === 'number'; };

//Check if element is not a number
jviz.is.nan = function(el){ return isNaN(el); };

//Check if element is an integer
jviz.is.int = function(el){ return el === parseInt(el); };
