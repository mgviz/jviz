//jviz templating module
jviz.extend('templating', function(id, obj)
{
  //Check the element ID
  if(typeof id !== 'string'){ return ''; }
  
  //Check the object
  if(typeof obj === 'undefined'){ var obj = {}; }

  //Get the element
  var el = document.getElementById(id);

  //Check for undefined
  if(typeof el === 'undefined')
  {
    //Show error
    console.error('Undefined template id ' + id);

    //Exit
    return '';
  }

  //Get the template content
  var html = el.innerHTML;

  //Compile the template
  html = Handlebars.compile(html);

  //Return the html code with our data
  return html(obj);
});
