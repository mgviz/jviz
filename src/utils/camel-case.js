//Generate the camelCase varsion of a string
jviz.utils.camelCase = function(str)
{
  //Code extracted from http://stackoverflow.com/a/15829686/2328955

  //Example of use:
  // jviz.utils.camelCase('background-color') -> "backgroundColor"
  // jviz.utils.camelCase('background-Color') -> "backgroundColor"
  // jviz.utils.camelCase('background Color') -> "backgroundColor"
  // jviz.utils.camelCase('background_color') -> "backgroundColor"

  //Generate the string in camelCase format
  return str.replace(/^([A-Z])|[\s-_](\w)/g, function(match, reg1, reg2)
  {
    //Check the second match
    if(typeof reg2 !== 'undefined' && reg2){ return reg2.toUpperCase(); }

    //Return the first match
    return reg1.toLowerCase();
  });
};
