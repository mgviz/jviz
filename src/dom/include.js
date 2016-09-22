//Dom include
jviz.dom.include = function(id, url, callback)
{
  //Check the callback
  if(typeof callback !== 'function'){ var callback = function(){ }; }

  //Create the new http request
  var xhttp = new XMLHttpRequest();

  //Ready function
  xhttp.onreadystatechange = function()
  {
    //Check the deady state
    if(this.xhttp.readyState !== 4){ return; }

    //Check the status
    if(this.xhttp.status === 200)
    {
      //Check the result type
      var result = this.xhttp.responseText;

      //Append to the element
      jviz.dom.append(id, result);

      //Exit
      return callback(false, result);
    }

    //Do the error function
    return callback(true);
  };

  //Open the connection in async mode
  xhttp.open('GET', url, true);

  //Send the data
  this.xhttp.send('');
};
