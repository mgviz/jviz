//Build a html component from string/object/array
jviz.dom.build = function(obj)
{
  //Output html
  var html = '';

  //Check for string
	if(typeof obj === 'string'){ return obj; }

  //Check for object
  if(typeof obj !== 'object'){ return obj; }

  //Check for array
  if(Array.isArray(obj) === false){ obj = [ obj ]; }

  //Read the list of elements
  for(var i = 0; i < obj.length; i++)
  {
    //Get the element
    var el = obj[i];

    //Check the element type
    if(typeof el === 'string')
    {
      //Print to the output html
      html = html + el;

      //Next element
      continue;
    }

    //Check for text
    if(el._tag === 'text')
    {
      //Print the text
      html = (typeof el._html !== 'undefined') ? html + el._html : html + el.text;

      //Continue with the next element of the list
      continue;
    }

    //Initialize the tag
    html = html + '<' + el._tag;

    //Read all the object attributes
    for(var key in el)
    {
      //Check for type OR html
      if(key === '_tag' || key === '_html'){ continue; }

      //Check for boolean
      if(typeof el[key] === 'boolean')
      {
        //Add the attribute
        html = html + ' ' + key;

        //Continue
        continue;
      }

      //Add the attribute
      html = html + ' ' + key + '="' + el[key] + '"';
    }

    //Close the tag
    html = html + '>';

    //Check the html content
    if(typeof el._html !== 'undefined'){ html = html + jviz.dom.build(el._html); }

    //Check for closing the tag
    if(el._tag !== 'input' && el._tag !== 'br' && el._tag !== 'hr'){ continue; }

    //Close the tag
    html = html + '</' + el._tag + '>';
  }

  //Return the html
  return html;
};
