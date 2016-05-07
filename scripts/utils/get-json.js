//jvizGetJSON
function jvizGetJSON(url)
{
  //Get the json file
  var file = jvizGetFile(url, 'application/json');

  //Check for null
  if(!file){ return {}; }

  //Parse the json and return
  return JSON.parse(file);
}
