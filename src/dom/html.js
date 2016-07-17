//Insert html without removing the content
jviz.dom.append = function(obj, id)
{
  //Get the element
  var el = (typeof id === 'undefined') ? document.getElementsByTagName('body')[0] : document.getElementById(id);

  //Insert
  el.innerHTML = el.innerHTML + jviz.dom.build(obj);
};

//Insert html code
jviz.dom.html = function(obj, id)
{
  //Get the element
  var el = (typeof id === 'undefined') ? document.getElementsByTagName('body')[0] : document.getElementById(id);

  //Insert
  el.innerHTML = jviz.dom.build(obj);
};

//Remove the element
jviz.dom.remove = function(id)
{
  //Get the element
  var el = document.getElementById(id);

  //Check the parent node
  if(typeof el.parentNode !== 'undefined' && el.parentNode)
  {
    //Remove the node
    el.parentNode.removeChild(el);
  }
};

//Empty the element content
jviz.dom.empty = function(id)
{
  //Empty the content
  document.getElementById(id).innerHTML = '';
};
