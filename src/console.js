//Extends jviz
jviz.extend('console', {});

//Display methods
[ 'error', 'warn', 'info'. 'log' ].forEach(function(el)
{
  //Initialize the console display
  jviz.console[el] = function(text, ret)
  {
    //Display the text
    console[el](text);

    //Return
    return ret;
  }
});