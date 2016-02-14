//CoverViewer Resize function
CoverViewer.prototype.Resize = function()
{
  //Save the app div width and height
  this.app.width = $('#' + this.app.id).width();
  this.app.height = $('#' + this.app.id).height();

  //Resize the preview track
  this.preview.Resize();

  //Resize the cover track
  this.cover.Resize();

  ///Resize the genes track
  this.genes.Resize();

  //Save the loading screen width and height
  //this.LoadingResize();

  //Set resized as true
  this.core.resized = true;

  //Check for region to draw
  if(this.draw.region !== '')
  {
    //Draw the actual region
    this.DrawReady(this.draw.region);
  }
  else if(this.default.test === true)
  {
    //Draw the test region
    this.Draw(this.default.region);
  }
};

//Event Resize
CoverViewer.prototype.ResizeEvntInit = function()
{
  //Call the event
  CoverViewerResizeEvnt(this);
};

//Event for resize window
function CoverViewerResizeEvnt(_main)
{
  //Add the resize event
  $(window).resize(function(){ _main.Resize(); });
}
