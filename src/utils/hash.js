//jviz.utils.hash object
var jviz.utils.hash = {};

//Get hash
jviz.utils.hash.get = function()
{
  //Get the hash
  var h = window.location.hash.substr(1);

  //Return the decoded uri
  return decodeURIComponent(h);
};

//Set hash
jviz.utils.hash.set = function(h)
{
  //Encode the hash value
  h = encodeURIComponent(h);

  //Set the hash
  window.location.hash = '#' + h;
};
