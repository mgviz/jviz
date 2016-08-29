//Convert HEX to RGBA
jviz.colors.hex =
{
  //Parse a HEX color
  parse: function(color)
  {
    //Check the type
    if(typeof color !== 'string'){ return this.error(color); }

    //Check the #
    if(color.indexOf('#') === -1){ color = '#' + color; }

    //Check to convert 3-based hex color to 6-based hex color
    if(color.length === 4)
    {
      //Convert
      color = '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
    }

    //Check the color length
    if(color.length !== 7){ return this.error(color); }

    //Return the color
    return color;
  },

  //Error handler
  error: function(color)
  {
    //Show error in console
    console.error('ERROR: "' + color + '" is not a valid HEX color.');

    //Exit with a black color
    return '#000000';
  },

  //Convert HEX color to RGBA
  toRGBA: function(color)
  {
    //Parse the hex color
    color = this.parse(color);

    //Create the new rgba object
    var rgba = { r: 0, g: 0, b: 0, a: 1 };

    //Save the Red value
    rgba.r = parseInt(color[1] + color[2], 16);

    //Save the Green value
    rgba.g = parseInt(color[3] + color[4], 16);

    //Save the Blue value
    rgba.b = parseInt(color[5] + color[6], 16);

    //Return the new rgba object
    return rgba;
  }
};
