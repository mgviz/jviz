//Combine two colors
jviz.colors.combine = function(color1, color2)
{
  //Initialize the colors array
  var colors = [];

  //Check the color1
  if(Array.isArray(color1) === true) { colors = color1; }

  //Check the color2
  else if(typeof color2 === 'undefined'){ return jviz.colors.hex.toRGBA(color1); }

  //If the two colors exists
  else { colors = [ color1, color2 ]; }

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
