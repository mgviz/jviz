//jviz Generate an ID
//Extracted from https://github.com/jmjuanes/getid/
jviz.utils.getID = function(opt)
{
  //Check the options
  if(typeof opt === 'undefined'){ var opt = {}; }
  
  //Characters available
  var _chars = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  //Initialize the exists array
  var _exists = (typeof opt.exists !== 'undefined') ? opt.exists : [];

  //Initialize the ID length
  var _length = (typeof opt.length !== 'undefined') ? parseInt(opt.length) : 22;

  //Initialize the prefix
  var _prefix = (typeof opt.prefix !== 'undefined') ? opt.prefix : '';

  //Initialize the suffix
  var _suffix = (typeof opt.suffix !== 'undefined') ? opt.suffix : '';

  //Generated id
  var id = '';

  //Build the new ID
  do
  {
    //Get the time
    id = Date.now().toString();

    //Get a random number of insertions
    var ins = jviz.math.randInt(4, 10);

    //Check the length
    if(_length > 0)
    {
      //Check if the actual ID exceeds the length
      if(id.length > _length)
      {
        //Calculate the number of insertions in function the length
        ins = (_length > 4)? 2 : 1;

        //Get a new random integer
        var p = jviz.math.randInt(0, id.length - _length - 1);

        //Slice the actual ID
        id = id.slice(p, p + _length - ins);
      }
      else if(id.length + ins > _length)
      {
        //Change the number of insertions
        ins = _length - id.length;
      }
      else if(id.length + ins < _length)
      {
        //Change the number of insertions
        ins = _length - id.length;
      }
    }

    //Add the insertions
    for(var i = 0; i < ins; i++)
    {
      //Get a random character
      var ch = _chars[jviz.math.randInt(0, _chars.length - 1)];

      //Get the new position for insert
      var po = jviz.math.randInt(0, id.length - 1);

      //Insert
      id = id.slice(0, po) + ch + id.slice(po);
    }

    //Add the prefix and the suffix
    id = _prefix + id + _suffix;
  }
  while(_exists.indexOf(id) > -1);

  //Return the new ID
  return id;
};

//Alias for GetID
jviz.utils.genID = function(opt)
{
  //Generate an ID
  return jviz.utils.getID(opt);
};
