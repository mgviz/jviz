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

  //Create the labels button
  div = div + this.NavbarBuildBtn(this.navbar.btn.labels);

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

//CoverViewer Settings button click
CoverViewer.prototype.NavbarBtnLabelsClick = function()
{
  //Open the labels dialog
  this.LabelsOpen();
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
function CoverViewerNavbarBtnEvents(_this)
{
  //Left button
  $('#' + _this.navbar.btn.left.id).click(function(e){ _this.NavbarBtnArrowClick('l'); });

  //Right button
  $('#' + _this.navbar.btn.right.id).click(function(e){ _this.NavbarBtnArrowClick('r'); });

  //Labels button
  $('#' + _this.navbar.btn.labels.id).click(function(e){ _this.NavbarBtnLabelsClick(); });
}
