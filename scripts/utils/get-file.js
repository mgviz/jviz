//Function for read a file sync
//Inspired on http://stackoverflow.com/a/4117299

//jvizGetFile
function jvizGetFile(url, mime)
{
  //Create the new XMLHttp request
  var xmlhttp = new XMLHttpRequest();

  //Prepare the get request
  xmlhttp.open('GET', url, false);

  //Check the mime type
  if(typeof mime !== 'undefined')
  {
    //Check for override mime type
    if(xmlhttp.overrideMimeType){ xmlhttp.overrideMimeType(mime); }
  }

  //Send the request
  xmlhttp.send();

  //Check the response status
  if(xmlhttp.status === 200)
  {
    //Return the response
    return xmlhttp.responseText;
  }

  //Show error in console
  console.error('Error reading data from ' + url);

  //Return null
  return null;
}
