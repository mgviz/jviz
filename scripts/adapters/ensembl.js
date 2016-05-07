//jvizEnsemblAdapter
var jvizEnsemblAdapter = function()
{
  //Return the element
  return this;
};

//jvizEnsemblAdapter generate a link for find an element
jvizEnsemblAdapter.prototype.SearchLink = function(id)
{
  //Generate the link
  var link = '<a target="_blank" ';

  //Add thelink for view the ensembl id
  link = link + 'href="http://www.ensembl.org/Multi/Search/Results?q=' + id + '">';

  //Add the text
  link = link + id + '</a>';

  //Return the link
  return link;
};
