//Extend the keys in an object
jviz.utils.extend = function(opt, extend)
{
  //Read all the keys
  for(var key in extend)
  {
    //Save the options
    opt[key] = extend[key];
  }

  //Return the new options
  return opt;
};
