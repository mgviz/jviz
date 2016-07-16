//jviz Base 64 Encoder/Decoder
jviz.extend('base64');

//jviz base64 encode
jviz.base64.encode = function(str)
{
  //Return the encoded string
  return btoa(str);
};

//jviz base64 encode a json object
jviz.base64.encodeJSON = function(obj)
{
  //Convert to string
  var str = JSON.stringify(obj);

  //Encode the string object
  return jviz.base64.encode(str);
};

//jviz base64 decode
jviz.base64.decode = function(str)
{
  //Return the decoded string
  return atob(str);
};

//jvizB64 Decode Object
jviz.base64.decodeJSON = function(str)
{
  //Decode the string
  var obj = jviz.base64.decode(str);

  //Covert to object
  return JSON.parse(obj);
};
