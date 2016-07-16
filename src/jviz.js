//Jviz main object
var jviz = {};

//Create the jviz extend method
jviz.extend = function(el, cb)
{
  //Check for undefined element name
  if(typeof el === 'undefined'){ return console.error('ERROR: invalid element to extend'); }

  //Check for undefined callback
  if(typeof cb === 'undefined'){ var cb = {}; }

  //Check the element name
  if(typeof jviz[el] !== 'undefined'){ return console.error('ERROR: element ' + el + ' exists on jviz.'); }

  //Register the new element
  jviz[el] = cb;
};

//Extend the http library
jviz.extend('http');

//Extend the math lybrary
jviz.extend('math');

//Extend the ui library
jviz.extend('ui');

//Extend the utils library
jviz.extend('utils');

//Extend the keys method
jviz.extend('keys', function(obj){ return Object.keys(obj); });

//Create the each method
jviz.extend('each', function(obj, cb)
{
  //Check for object type
  if(typeof obj !== 'object'){ return console.error('ERROR: invalid object'); }

  //Save if object is an array
  var is_array = jviz.isArray(obj);

  //Check if is array
  if(is_array === true)
  {
    //Set the key length
    var keys = { length: obj.length };
  }
  else
  {
    //Get the keys
    var keys = jviz.keys(obj);
  }

  //Read all
  for(var i = 0; i < keys.length; i++)
  {
    //Get the value to call the function
    var value = (is_array === true) ? obj[i] : obj[keys[i]];

    //Do the callback and get the result
    var result = cb.call(value, i, obj);

    //Check for undefined
    if(typeof result === 'undefined'){ continue; } 

    //Check for break the loop
    if(result === false){ break; }
  }
});

//Check for exporting to node
if(typeof module !== 'undefined' && typeof module.exports !== 'undefined')
{
  //Exports to node
  module.exports = jviz;
}
