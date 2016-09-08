//Initialize the get element
jviz.dom.get = {};

//Get element by ID
jviz.dom.get.id = function(id)
{
  //Return the element
  return document.getElementById(id);
};

//Get elements by tags
jviz.dom.get.tags = function(tag, index)
{
  //Get the elements
  var list = document.getElementsByTagName(tag);

  //Check the index
  if(typeof index !== 'undefined')
  {
    //Return the element
    return list[index];
  }

  //Return the full list
  return list;
};

//Get elements by class name
jviz.dom.get.class = function(name, index)
{
  //Get the elements
  var list = document.getElementsByClassName(name);

  //Check the index
  if(typeof index !== 'undefined')
  {
    //Return the element
    return list[index];
  }

  //Return the full list
  return list;
}