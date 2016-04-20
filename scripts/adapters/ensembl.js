//Ensembl Main class
var EnsemblAdapter = new function()
{
  //Function for create a link to a ensembl ID
  this.LinkTo = function(id)
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
};
