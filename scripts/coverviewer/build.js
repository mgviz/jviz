//CoverViewer build function
CoverViewer.prototype.Build = function()
{
  //Add app div
  $('#' + this.parent).append(this.BuildApp());

  //Create the Navbar
  $('#' + this.app.id).append(this.NavbarBuild());

  //Create the settings panel
  //$('#' + this.app.id).append(this.SettingsBuild());

  //Create the preview panel
  this.panel.preview.Build(this.app.id);

  //Create the tracks panel
  this.panel.tracks.Build(this.app.id);

  //Create the Foot
  $('#' + this.app.id).append(this.FootBuild());

  //Create the preview track
  this.preview.Build(this.panel.preview.id);

  //Set the preview title
  this.preview.SetTitle(this.preview.title);

  //Create the Cover track
  this.cover.Build(this.panel.tracks.id);

  //Set the cover title
  this.cover.SetTitle(this.cover.title);

  //Create the genes track
  this.genes.Build(this.panel.tracks.id);

  //Add the genes title
  this.genes.SetTitle(this.genes.title);

  //Build the labels dialog
  this.labels.Build(this.app.id);

  //Set the labels dialog title
  this.labels.SetTitle(this.labels.title);

  //Build the genes box div
  $('#' + this.panel.tracks.id).append(this.GenesTrackInfoBuild());

  //Parse the bams
  this.BamsParser();

  //Initialize the resize event
  this.ResizeEvntInit();

  //Initialize the NAvbar events
  CoverViewerNavbarBtnEvents(this);

  //Initialize the mouse events for cover track
  CoverViewerCoverTrackEvents(this);

  //Initialize the mouse events for genes track
  CoverViewerGenesTrackEvents(this);

  //Initialize the mouse events for preview track
  CoverViewerPreviewTrackEvents(this);

  //Resize
  this.Resize();
};

//App div builder
CoverViewer.prototype.BuildApp = function()
{
  //Build the app content div
  return '<div id="' + this.app.id + '" class="' + this.app.class + '"></div>';
};

//Function for build
function CoverViewerBuildTimeOut(_this)
{
  //Set the build timeout
  setTimeout(function(){ _this.Build(); }, _this.default.buildtime);
}
