//CoverViewer Navbar Builder
CoverViewer.prototype.NavbarBuild = function()
{
  //Create the new navbar element
  var div = '<div id="' + this.navbar.id + '" class="' + this.navbar.class + '" ';

  //Check if navbar is visible
  if(this.navbar.show === false)
  {
    //Add the display as none
    div = div + 'style="display:none;"'
  }

  //End the div
  div = div + '>';

  //Create the left button
  div = div + this.NavbarBuildBtn(this.navbar.btn.left);

  //Create the right button
  div = div + this.NavbarBuildBtn(this.navbar.btn.right);

  //Create the setting button
  div = div + this.NavbarBuildBtn(this.navbar.btn.settings);

  //Close the navbar div
  div = div + '</div>';

  //Return the new element
  return div;
};

//CoverViewer navbar buttons build
CoverViewer.prototype.NavbarBuildBtn = function(obj)
{
  //Check for show
  if(obj.show === false){ return ''; }

  //Return the button
  return '<div id="' + obj.id + '" class="' + obj.class + '" title="' + obj.title + '"></div>';
};

//CoverViewer navbar event
CoverViewer.prototype.NavbarEvnt = function()
{
  //Start the navbar button event
  CoverViewerNavbarBtnEvnt(this);
};

//CoverViewer Settings button click
CoverViewer.prototype.NavbarBtnSettingsClick = function()
{
  //Check
  if(this.settings.show === true)
  {
    //Hide the settings track
    this.SettingsHide();
  }
  else
  {
    //Show the settings track
    this.SettingsShow();
  }
};

//CoverViewer Arrow events
CoverViewer.prototype.NavbarBtnArrowClick = function(btn)
{
  //Initialize the increment
  var inc = this.prevwindow.width;

  //Check if the button press is left
  if(btn === 'l')
  {
    //Move to left
    inc = -inc;
  }

  //Calculate the new start point
  this.prevwindow.start = this.prevwindow.start + inc;

  //Draw the region
  this.Move();
};

//Navbar Buttons event
function CoverViewerNavbarBtnEvnt(_main)
{
  //Left button
  $('#' + _main.navbar.btn.left.id).click(function(e){ _main.NavbarBtnArrowClick('l'); });

  //Right button
  $('#' + _main.navbar.btn.right.id).click(function(e){ _main.NavbarBtnArrowClick('r'); });

  //Settings button
  $('#' + _main.navbar.btn.settings.id).click(function(e){ _main.NavbarBtnSettingsClick(); });
}
