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

//CoreTool Check for draw
CoverViewer.prototype.DrawReady = function()
{
  //Show in console
  console.log('CoverViewer: check for draw...');

  //Show loading
  //this.LoadingShow();

  //Check for error importing the cover data
  if(this.data.cover.error === true) { return false; }

  //Check for error importing the genes data
  if(this.data.genes.error === true) { return false; }

  //Check for error importing the exons data
  if(this.data.exons.error === true && this.data.exons.use === true) { return false; }

  //For check if all is ready
  var ready = true;

  //Check if cover is ready
  if(this.data.cover.busy === true) { ready = false; }

  //Check if genes is ready
  if(this.data.genes.busy === true) { ready = false; }

  //Check if exons is ready
  if(this.data.exons.busy === true && this.data.exons.use === true) { ready = false; }

  //Check
  if(ready === true)
  {
    //Show in console
    console.log('CoverViewer: system ready for draw');

    //Draw cover track
    this.CoverTrackDraw(this.draw.start);

    //Draw preview track
    this.PreviewTrackDraw();

    //Check for draw genes track
    if(this.genes.show === true) { this.GenesTrackDraw(); }

    //Check for show the labels track
    //if(this.labels.show === true) { this.LabelsTrackDraw(); }

    //Set core running as false
    this.core.running = false;

    //Show in console
    console.log('CoverViewer: draw complete!');

    //Set resized as false
    this.core.resized = false;

    //Hide loading
    //this.LoadingHide();
  }
};

//Time out for draw the region
function CoverViewerDrawTimeOut(_main, _region)
{
  //Set the time out
  setTimeout(function(){ _main.Draw(_region); }, _main.draw.delay);
}
