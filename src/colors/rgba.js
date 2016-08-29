//RGBA tools
jviz.colors.rgba =
{
  //RBGA keys
  keys: [ 'r', 'g', 'b', 'a' ],

  //RGBA color parser
  parse: function(color)
  {
    //Check the type
    if(typeof color === 'string')
    {
      //Remove the blank spaces
      color = color.replace(/ /g, '');

      //Replace the RGBA or the RGB
      color = color.replace(/rgba/g, '').replace(/rgb/g, '');

      //Remove the ()
      color = color.replace(/\(/g, '').replace(/\)/g, '');

      //Split the color by comma
      color = color.split(',');
    }

    //Check for array
    if(Array.isArray(color) === true)
    {
      //Check the alpha
      var alpha = (color.length === 4) ? parseInt(color[3]) : 1;

      //Save all
      color = { r: parseInt(color[0]), g: parseInt(color[1]), b: parseInt(color[2]), a: alpha };
    }

    //Check the alpha
    if(typeof color.a === 'undefined'){ color.a = 1; }

    //Return the color parsed
    return color;
  },

  //Convert a RGBA color object to HEX
  toHEX: function(color)
  {
    //Check the color type
    if(typeof color === 'string'){ color = this.parse(color); }

    //Hex array
    var hex = [];

    //Read all the colors
    for(var i = 0; i < this.keys.length - 1; i++)
    {
      //Get the value
      var num = color[this.keys[i]];

      //Convert to hex
      num = Math.round(num).toString(16);

      //Check the length
      if(num.length === 1){ num = '0' + num; }

      //Save the number
      hex.push(num);
    }

    //Build the hex color and return
    return '#' + hex.join('');
  },

  //Convert a RGBA object to array
  toArray: function(color)
  {
    //Check for array
    if(Array.isArray(color) === true){ return color; }

    //Check for string
    if(typeof color === 'string'){ color = this.parse(color); }

    //Output array
    return [ color.r, color.g, color.b, color.a ];
  },

  //Convert a RGBA object to string
  toString: function(color, opt)
  {
    //Convert the RGBA object to array
    color = this.toArray(color);

    //Check the options
    if(typeof opt === 'undefined'){ var opt = {}; }

    //Check for save the alpha
    if(typeof opt.alpha === 'undefined'){ opt.alpha = true; }

    //Initialize the rgba type
    var type = 'rgba';

    //Check for return the RGBA or the RGB
    if(opt.alpha === false)
    {
      //Remove the alpa
      color.pop();

      //Update the type
      type = 'rgb';
    }

    //Convert to string and return
    return type + '(' + color.join(', ') + ')';
  }
};
