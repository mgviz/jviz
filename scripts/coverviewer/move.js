//CoverViewer Move tracks
CoverViewer.prototype.Move = function()
{
  //Check core
  if(this.core.running === false)
  {
    //Draw the window
    this.PreviewTrackDrawWindow();

    //Move the cover track
    this.CoverTrackDraw(this.preview.region.start);

    //Move the genes track
    this.GenesTrackDraw();
  }
  else
  {
    //Show in console
    console.log('CoverViewer: core is busy');
  }
};
