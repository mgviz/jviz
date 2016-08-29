//Combine two HEX colors
jviz.colors.combine = function()
{
  //Initialize the colors array
  var colors = [];

  //Read all the arguments
  for(var i = 0; i < arguments.length; i++)
  {
    //Get the color
    var c = arguments[i];

    //Check for array
    if(Array.isArray(c) === true)
    {
      //Concatenate the two arrays
      colors = colors.concat(c);

      //Next argument
      continue;
    }

    //Default, add the color
    colors.push(c);
  }

  //Check for empty colors
  if(colors.length === 0){ return; }

  //Combined color
  var combined = jviz.colors.hex.toRGBA(colors[0]);

  //Combine the others colors
  for(var i = 1; i < colors.length; i++)
  {
    //Get the color
    var color = jviz.colors.hex.toRGBA(colors[i]);

    //Check the alpha
    if(combined.a === 0){ combined = color; continue; }

    //Check the color alpha
    if(color.a === 0){ continue; }

    //Generate the new color
    var mixed = { r: 0, g: 0, b: 0, a: 1 };

    //Mix the Red value
    mixed.r = Math.round((color.r * 0.5) + (combined.r * 0.5));

    //Mix the Green value
    mixed.g = Math.round((color.g * 0.5) + (combined.g * 0.5));

    //Mix the Blue value
    mixed.b = Math.round((color.b * 0.5) + (combined.b * 0.5));

    //Save the combined color
    combined = mixed;
  }

  //Return the combined color
  return combined;
};
