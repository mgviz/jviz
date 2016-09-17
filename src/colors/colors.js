//Extend jviz
jviz.extend('colors', {});

//Main class
jviz.colors =
{
  //Full colors list
  list: [ 'navy', 'grey', 'red', 'blue', 'pink', 'water', 'green', 'purple', 'orange', 'white'],

  //Navy base color
  navy: { hex: '#4a526c', rgba: { r: 74, g: 82, b: 108, a: 1 } },

  //Navy colors
  navy1: { hex: '#4a526c', rgba: { r: 74, g: 82, b: 108, a: 1 } },
  navy2: { hex: '#606c89', rgba: { } },
  navy3: { hex: '#8793b3', rgba: { } },
  navy4: { hex: '#b7c5d8', rgba: { } },

  //Grey base color
  grey: { hex: '#dbe6f0', rgba: { } },

  //Grey colors
  grey1: { hex: '#dbe6f0', rgba: { } },
  grey2: { hex: '#e2ebf4', rgba: { } },
  grey3: { hex: '#e8edf5', rgba: { } },
  grey4: { hex: '#f0f5fb', rgba: { } },

  //Red base color
  red: { hex: '#ea685a', rgba: { } },

  //Red colors
  red1: { hex: '#e54634', rgba: { } },
  red2: { hex: '#ea685a', rgba: { } },
  red3: { hex: '#ed8378', rgba: { } },
  red4: { hex: '#f0988e', rgba: { } },

  //Blue base color
  blue: { hex: '#38b1eb', rgba: { } },

  //Blue colors
  blue1: { hex: '#1595d1', rgba: { } },
  blue2: { hex: '#38b1eb', rgba: { } },
  blue3: { hex: '#45b8ed', rgba: { } },
  blue4: { hex: '#5dc1ef', rgba: { } },

  //Pink base color
  pink: { hex: '#f45b93', rgba: { } },

  //Pink colors
  pink1: { hex: '#f02872', rgba: { } },
  pink2: { hex: '#f45b93', rgba: { } },
  pink3: { hex: '#f570a1', rgba: { } },
  pink4: { hex: '#f788b0', rgba: { } },

  //Water base color
  water: { hex: '#18d2ba', rgba: { } },

  //Water colors
  water1: { hex: '#15b7a1', rgba: { } },
  water2: { hex: '#18d2ba', rgba: { } },
  water3: { hex: '#1be4c9', rgba: { } },
  water4: { hex: '#48ead4', rgba: { } },

  //Green base color
  green: { hex: '#67ba2f', rgba: { } },

  //Green colors
  green1: { hex: '#4f8f24', rgba: { } },
  green2: { hex: '#67ba2f', rgba: { } },
  green3: { hex: '#70cc33', rgba: { } },
  green4: { hex: '#8dd65c', rgba: { } },

  //Purple base color
  purple: { hex: '#b490f5', rgba: { } },

  //Purple colors
  purple1: { hex: '#905cf0', rgba: { } },
  purple2: { hex: '#b490f5', rgba: { } },
  purple3: { hex: '#bfa2f6', rgba: { } },
  purple4: { hex: '#cfb9f8', rgba: { } },

  //Orange base color
  orange: { hex: '#ed9e48', rgba: { } },

  //Orange colors
  orange1: { hex: '#e88317', rgba: { } },
  orange2: { hex: '#ed9e48', rgba: { } },
  orange3: { hex: '#efa85d', rgba: { } },
  orange4: { hex: '#f1b574', rgba: { } },

  //White base color
  white: { hex: '#ffffff', rgba: { } }
};

//Check if color exists
jviz.colors.exists = function(value)
{
  //Parse the value
  value = value.toLowerCase();

  //Check if exists
  var exists = (jviz.colors.list.indexOf(value) === -1) ? false : true;

  //Return if color exists
  return exists;
};
