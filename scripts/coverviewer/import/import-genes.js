//CoverViewer Import genes for region
CoverViewer.prototype.ImportDataGenes = function(region)
{
  //Get the real url
  var url = this.data.genes.url;

  //Replace the region
  url = url.replace(/{region}/gi, region); //Replace for region without spaces
  url = url.replace(/{ region }/gi, region); //Replace for region with spaces

  //Show in console
  console.log('CoverViewer: reading genes data from "' + url + '"');

  //Set genes as busy
  this.data.genes.busy = true;

  //Set genes error as false
  this.data.genes.error = false;

  //Import from url
  CoverViewerImportDataGenesJson(url, this);
};

//CoverViewer Genes Track import error
CoverViewer.prototype.ImportDataGenesError = function(url)
{
  //Show error in console
  console.log('CoverViewer: Error reading genes data from "' + url + '"');

  //Set true the error for genes
  this.data.genes.error = true;

  //Set genes busy as false
  this.data.genes.busy = false;

  //Continue
  this.DrawReady();
};

//CoverViewer Genes Track Import and parser
CoverViewer.prototype.ImportDataGenesParser = function(data)
{
  //Save the data
  this.data.genes.data = data;

  //Check parser
  if(this.data.genes.parser)
  {
    //Parse the data
    this.data.genes.data = this.data.genes.parser(data);
  }

  //Sort the genes data
  this.data.genes.data.genes = ObjectSort(this.data.genes.data.genes, 'start');

  //Filter the genes by region
  this.ImportDataGenesFilter();

  //Calculate the genes track height
  this.GenesTrackHeight();

  //Filter the strand
  this.GenesTrackStrandCheck();

  //Set genes busy as false
  this.data.genes.busy = false;

  //Check for get the exons
  if(this.data.exons.use === true)
  {
    //Import exons
    this.ImportDataExons();
  }

  //Continue
  this.DrawReady();
};

//CoverViewer filter the genes list to the region
CoverViewer.prototype.ImportDataGenesFilter = function()
{
  //New array
  var ngenes = [];

  //Read all selected genes
  for(var i = 0; i < this.data.genes.data.genes.length; i++)
  {
    //Get the gene
    var ge = this.data.genes.data.genes[i];

    //Check the start and end positions
    if(ge.start <= this.draw.end && this.draw.start <= ge.end)
    {
      //Add the gene
      ngenes.push(ge);
    }
  }

  //Save the genes list
  this.data.genes.data.genes = ngenes;
};

//Function for import the data with jquery
function CoverViewerImportDataGenesJson(_url, _main)
{
  //Create the conection
  var _import = $.ajax({url: _url, dataType: 'json'});

  //Done function
  _import.done(function(data){ _main.ImportDataGenesParser(data); });

  //Fail function
  _import.fail(function(){ _main.ImportDataGenesError(_url); });
}
