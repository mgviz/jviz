//Function for cloning an object
jviz.utils.clone = function(obj)
{
  //Convert the object to string
  var o = JSON.stringify(obj);

  //Convert again to json
  o = JSON.parse(o);

  //Return the object
  return o;
};
