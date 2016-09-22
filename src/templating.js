//Templating code
// <script id="YOUR_ID" type="text/x-handlebars-template">YOUR_CODE</script>

//jviz templating module
jviz.templating = function(id)
{
  //Check the element ID
  if(typeof id !== 'string'){ return null; }

  //Save the element id
  this._id = id;

  //Get the element
  this._el = jviz.dom.get.id(this._id);

  //Check for undefined
  if(typeof this._el === 'undefined'){ return jviz.console.error('Undefined template id ' + this._id); }

  //Get the template content
  this._html = this._el.innerHTML;

  //Compiled data
  this._compiled = this._el.innerHTML;

  //Return this
  return this;
};

//Compile the template
jviz.templating.prototype.compile = function(data)
{
  //Check the data
  if(typeof data !== 'object'){ return this; }

  //Save the compiled string
  this._compiled = this._html.replace(/{{\s*[\w\.]+\s*}}/g, function(match)
  {
    //Get the real string
    var key = match.replace('{{', '').replace('}}', '').trim();

    //Check for empty
    if(key === ''){ return match; }

    //Check for undefined data
    if(typeof data[key] === 'undefined'){ return match; }

    //Return the value
    return data[key];
  });

  //Return this
  return this;
};

//Append the data
jviz.templating.prototype.appendTo = function(id)
{
  //Check the id
  if(typeof id === 'undefined'){ return this; }

  //Append the compiled data to an element
  jviz.dom.append(id, this._compiled);

  //Return this
  return this;
};

//Insert into html
jviz.templating.prototype.htmlTo = function(id)
{
  //Check the id
  if(typeof id === 'undefined'){ return this; }

  //Replace the compiled data to an element
  jviz.dom.html(id, this._compiled);

  //Return this
  return this;
};
