//CoverViewer Import coverage data
CoverViewer.prototype.ImportDataCover = function(region)
{
  //Get the real url
  var url = this.data.cover.url;

  //Replace the region
  url = url.replace(/{region}/gi, region); //Replace for region without spaces
  url = url.replace(/{ region }/gi, region); //Replace for region with spaces

  //Show in console
  console.log('CoverViewer: reading cover data from "' + url + '"');

  //Set cover as busy
  this.data.cover.busy = true;

  //Set error as false
  this.data.cover.error = false;

  //Import from url
  CoverViewerImportDataCoverJson(url, this);
};

//CoverViewer Track import error
CoverViewer.prototype.ImportDataCoverError = function(url)
{
  //Show error in console
  console.log('CoverViewer: Error reading coverage data from "' + url + '"');

  //Set true the errror
  this.data.cover.error = true;

  //Set cover busy as false
  this.data.cover.busy = false;

  //Continue
  this.DrawReady();
};

//CoverViewer Track Import and parser
CoverViewer.prototype.ImportDataCoverParser = function(data)
{
  //Save the data
  this.data.cover.data = data;

  //Check parser
  if(this.data.cover.parser)
  {
    //Parse the data
    this.data.cover.data = this.data.cover.parser(data);
  }

  //Check region length
  if(this.data.cover.data.length > 0)
  {
    //Fix data bugs
    if(this.data.cover.fixgaps === true){ this.DataFix(); }

    //Show in console
    console.log('CoverViewer: region length: ' + this.data.cover.data.length);

    //Find the min and max values
    this.ImportDataCoverFindMinMax();

    //Parse the bams
    this.BamsParser();
  }
  else
  {
    //Show error
    this.data.cover.error = true;

    //Show in console
    console.log('CoverViewer: No coverage data for this region');
  }

  //Set cover busy as false
  this.data.cover.busy = false;

  //Continue
  this.DrawReady();
};

//CoverViewer Find min and max values
CoverViewer.prototype.ImportDataCoverFindMinMax = function()
{
  //Find the max and min
  this.data.cover.min = this.data.cover.data[0].cover[0];
  this.data.cover.max = this.data.cover.data[0].cover[0];

  //Read the others
  for(var i = 0; i < this.data.cover.data.length; i++)
  {
    //Check each cover
    for(var j = 0; j < this.data.cover.data[i].cover.length; j++)
    {
      //Check the min
      if(this.data.cover.min > this.data.cover.data[i].cover[j])
      {
        //Save the new min
        this.data.cover.min = this.data.cover.data[i].cover[j];
      }

      //Check the max
      if(this.data.cover.max < this.data.cover.data[i].cover[j])
      {
        //Save the new max
        this.data.cover.max = this.data.cover.data[i].cover[j];
      }
    }
  }

  //Check for prevent 0 in max
  if(this.data.cover.max < 1) { this.data.cover.max = 1; }

  //Check for prevent 0 in min
  if(this.data.cover.min < 1) { this.data.cover.min = 1; }
};

//Function for import the data with jquery
function CoverViewerImportDataCoverJson(_url, _this)
{
  //Create the conection
  var _import = $.ajax({url: _url, dataType: 'json'});

  //Done function
  _import.done(function(data){ _this.ImportDataCoverParser(data); });

  //Fail function
  _import.fail(function(){ _this.ImportDataCoverError(_url); });
}
