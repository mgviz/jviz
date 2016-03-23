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

  //Draw
  this.Draw();
};

//Event Resize
CoverViewer.prototype.ResizeEvntInit = function()
{
  //Call the event
  CoverViewerResizeEvnt(this);
};

//Event for resize window
function CoverViewerResizeEvnt(_this)
{
  //Add the resize event
  $(window).resize(function(){ _this.Resize(); });
}
