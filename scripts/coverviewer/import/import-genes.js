//CoverViewer Import genes for region
CoverViewer.prototype.ImportDataGenes = function(region)
{
  //Get the real url
  var url = this.data.genes.url;

  //Replace the region
  url = url.replace(/{region}/gi, region); //Replace for region without spaces
  url = url.replace(/{ region }/gi, region); //Replace for region with spaces

  //Show in console
  console.log('CoverViewer: reading genes from "' + url + '"');

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
  this.data.genes.list = data;

  //Check parser
  if(this.data.genes.parser)
  {
    //Parse the data
    this.data.genes.list = this.data.genes.parser(data);
  }

  //Sort the genes list
  this.data.genes.list = ObjectSort(this.data.genes.list, 'start');

  //Calculate the genes track height
  this.GenesTrackHeight();

  //Show the specie info
  this.GenesTrackBarSpecieInfo();

  //Set genes busy as false
  this.data.genes.busy = false;

  //Continue
  this.DrawReady();
};

//Function for import the data with jquery
function CoverViewerImportDataGenesJson(_url, _this)
{
  //Create the conection
  var _import = $.ajax({url: _url, dataType: 'json'});

  //Done function
  _import.done(function(data){ _this.ImportDataGenesParser(data); });

  //Fail function
  _import.fail(function(){ _this.ImportDataGenesError(_url); });
}
