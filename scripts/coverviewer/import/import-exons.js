//CoverViewer Import Exons
CoverViewer.prototype.ImportDataExons = function()
{
  console.log('reading exons');
  //Set exons as busy
  this.data.exons.busy = true;

  //Set exons error as false
  this.data.exons.error = false;

  //Restart the data
  this.data.exons.data = [];

  //Restart the number
  this.data.exons.num = this.data.genes.data.genes.length;

  //Do a callback for all the genes
  for(var i = 0; i < this.data.genes.data.genes.length; i++)
  {
    //Get the gene
    var g = this.data.genes.data.genes[i];

    //Get the region
    var r = g.chromosome + ':' + g.start + '-' + g.end;

    //Get the real url
    var url = this.data.exons.url;

    //Replace the region
    url = url.replace(/{region}/gi, r); //Replace for region without spaces
    url = url.replace(/{ region }/gi, r); //Replace for region with spaces

    //Import from url
    CoverViewerImportDataExonsJson(url, this, i);
  }
};

//CoverViewer Genes Track import exons error
CoverViewer.prototype.ImportDataExonsError = function(url)
{
  //Show error in console
  console.log('CoverViewer: Error reading exons data from "' + url + '"');

  //Set true the error for exons
  this.data.exons.error = true;

  //Set exons busy as false
  this.data.exons.busy = false;

  //Continue
  this.DrawReady();
};

//CoverViewer Exons Track Import Filter data by Strand
CoverViewer.prototype.ImportDataExonsFilter = function(index)
{
  //Get the gene
  var g = this.data.genes.data.genes[index];

  //Get the exons
  var e = this.data.exons.data[index];

  //Crete the new object
  var obj = [];

  //Read all the exons
  for(var i = 0; i < e.length; i++)
  {
    //Check the strand
    if(e[i].strand !== g.strand) { continue; }

    //Check the chromosome
    if(e[i].chromosome !== g.chromosome) { continue; }

    //Check the start position
    if(e[i].start < g.start || e[i].start > g.end) { continue; }

    //Check the end position
    if(e[i].end < g.start || e[i].end > g.end) { continue; }

    //Add the exon
    obj.push(e[i]);
  }

  //Save the new data
  this.data.exons.data[index] = obj;
};

//CoverViewer Exons Track Import and parser
CoverViewer.prototype.ImportDataExonsParser = function(data, index)
{
  //Save the data
  this.data.exons.data[index] = data;

  //Check parser
  if(this.data.exons.parser)
  {
    //Parse the data
    this.data.exons.data[index] = this.data.exons.parser(data);
  }

  //Filter the exons data
  this.ImportDataExonsFilter(index);

  //Sort the exons data
  this.data.exons.data[index] = ObjectSort(this.data.exons.data[index], 'start');

  //Exons for this gene are ready
  this.data.exons.num = this.data.exons.num - 1;

  //Check if is the end
  if(this.data.exons.num <= 0)
  {
    //Set exons busy as false
    this.data.exons.busy = false;

    //Continue
    this.DrawReady();
  }
};

//Function for import the exons data with jquery
function CoverViewerImportDataExonsJson(_url, _main, _index)
{
  //Create the conection
  var _import = $.ajax({url: _url, dataType: 'json'});

  //Done function
  _import.done(function(data){ _main.ImportDataExonsParser(data, _index); });

  //Fail function
  _import.fail(function(){ _main.ImportDataExonsError(_url, _index); });
}
