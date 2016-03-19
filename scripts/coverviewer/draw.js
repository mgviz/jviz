//Function for initialize the region draw
CoverViewer.prototype.DrawRegion = function(r)
{
  //Show loading
  //this.LoadingShow();

  //Set the time out
  CoverViewerDrawTimeOut(this, r);
};

//CoverViewer Draw
CoverViewer.prototype.Draw = function(region)
{
  //Check region for test mode
  if(this.default.test === false && this.default.region === region)
  {
    //Hide loading
    //this.LoadingHide();

    //Exit
    return;
  }

  //Show loading
  //this.LoadingShow();

  //Check if core is running
  if(this.core.running === false)
  {
    //Save the region
    var r = this.Region(region);

    //Set as true
    this.core.running = true;

    //Show in console
    console.log('CoverViewer: drawing region "' + region + '"');

    //Save
    this.draw.region = region;
    this.draw.chromosome = r.chromosome;
    this.draw.start = r.start;
    this.draw.end = r.end;

    //Reset the cover in cache
    this.cover.data = null;
    this.preview.data = null;

    //Start the cover track import data
    this.ImportDataCover(region);

    //Start the genes track import data
    this.ImportDataGenes(region);
  }
  else
  {
    //Show alert in console
    console.log('CoverViewer: system is busy drawing region "' + this.draw.region + '"');
  }
};

//CoverViewer draw karyotypes
CoverViewer.prototype.DrawKaryotypes = function()
{
  //Check for karyotypes
  if(this.data.karyotypes.busy === true){ return; }

  //Draw the karyotypes
  this.PreviewTrackKaryotypesDraw();
};

//CoverViewer draw cover
CoverViewer.prototype.DrawCover = function()
{
  //Show in console
  console.log('CoverViewer: check for draw...');

  //Show loading
  //this.LoadingShow();

  //Check if cover is ready
  if(this.data.cover.busy === true){ return; }

  //Check if genes is ready
  if(this.data.genes.busy === true){ return; }

  //Show in console
  console.log('CoverViewer: system ready for draw');

  //Draw cover track
  this.CoverTrackDraw(0);

  //Draw preview track
  this.PreviewTrackDraw();

  //Check for draw genes track
  if(this.genes.show === true) { this.GenesTrackDraw(); }

  //Set core running as false
  this.core.running = false;

  //Show in console
  console.log('CoverViewer: draw complete!');

  //Set resized as false
  this.core.resized = false;

  //Hide loading
  //this.LoadingHide();
};

//Time out for draw the region
function CoverViewerDrawTimeOut(_this, _region)
{
  //Set the time out
  setTimeout(function(){ _this.Draw(_region); }, _this.draw.delay);
}
